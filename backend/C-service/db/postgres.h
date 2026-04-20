#pragma once 
#include "pet_handler.h"
#include <pqxx/pqxx>

class Database {
public:
    static void init(const std::string& connection_string);

    static std::vector<Pet> getAllPets();
    static std::vector<Pet> getFeed(int user_id, int limit);
    static Pet getPetById(int id);

    static int createPet(const Pet& pet);

    static bool likePet(int user_id, int pet_id);
    static void dislikePet(int user_id, int pet_id);
    static std::vector<Match> getMatches(int user_id);

private:
    static std::shared_ptr<pqxx::connection> connection_;
};

