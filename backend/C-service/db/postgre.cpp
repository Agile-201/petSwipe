#include <pqxx/pqxx>
#include <memory>
#include <vector>
#include <string>

#include "postgre.h"

std::shared_ptr<pqxx::connection> Database::connection_;

void Database::init(const std::string& connection_string) {
    connection_ = std::make_shared<pqxx::connection>(connection_string);
}

std::vector<Pet> Database::getAllPets() {
    pqxx::work txn(*connection_);

    // Используем типизированный запрос для безопасности
    auto result = txn.query<int, int, std::string, std::string, std::string>(
        "SELECT id, owner_id, name, breed, photo_url FROM pets LIMIT 50"
    );

    std::vector<Pet> pets;
    for (auto row : result) {
        pets.push_back({
        .id = std::get<0>(row),
        .owner_id = std::get<1>(row),
        .name = std::get<2>(row),
        .breed = std::get<3>(row),
        .photo_url = std::get<4>(row)
        });        
    }
    return pets;
}

int Database::createPet(const Pet& pet) {
    pqxx::work txn(*connection_);
    auto newPet = txn.exec_params(
        R"(INSERT INTO pets (owner_id, name, breed, photo_url) "
        "VALUES ($1, $2, $3, $4) "
        "RETURNING id")",
        pet.owner_id,
        pet.name,
        pet.breed,
        pet.photo_url
    );

    txn.commit();

    return newPet[0][0].as<int>();
}

void Database::likePet(int user_id, int pet_id) {
    pqxx::work txn(*connection_);

    txn.exec_params(
        R"(INSERT INTO swipes (user_id, pet_id, is_like) "
        "VALUES ($1, $2, TRUE) "
        "ON CONFLICT (user_id, pet_id) "
        "DO UPDATE SET is_like = TRUE")",
        user_id,
        pet_id
    );

    txn.commit();
}

void Database::dislikePet(int user_id, int pet_id) {
    pqxx::work txn(*connection_);

    txn.exec_params(
        R"(DROP swipes (user_id, pet_id, is_like) "
        "VALUES ($1, $2, FALSE) "
        "ON CONFLICT (user_id, pet_id) "
        "DO UPDATE SET is_like = TRUE")",
        user_id,
        pet_id
    );

    txn.commit();
}

std::vector<Pet> Database::getFeed(int user_id, int limit) {
    pqxx::work txn(*connection_);

    auto result = txn.exec_params(
        R"(
        SELECT p.id, p.owner_id, p.name, p.breed, p.photo_url
        FROM pets p
        WHERE NOT EXISTS (
            SELECT 1 FROM swipes s
            WHERE s.user_id = $1
              AND s.pet_id = p.id
        )
        ORDER BY p.id
        LIMIT $2
        )",
        user_id,
        limit
    );

    std::vector<Pet> pets;
    pets.reserve(result.size());

    for (const auto& row : result) {
        pets.push_back({
            .id = row[0].as<int>(),
            .owner_id = row[1].as<int>(),
            .name = row[2].as<std::string>(),
            .breed = row[3].as<std::string>(),
            .photo_url = row[4].as<std::string>()
         });
       
    }
    return pets;
}

Pet Database::getPetById(int id) {
    pqxx::work txn(*connection_);

    auto result = txn.exec_params(
        "SELECT id, owner_id, name, breed, photo_url FROM pets WHERE id = $1",
        id
    );

    if (result.empty()) {
        throw std::runtime_error("Pet not found");
    }

    auto row = result[0];
    return {
        .id = row[0].as<int>(),
        .owner_id = row[1].as<int>(),
        .name = row[2].as<std::string>(),
        .breed = row[3].as<std::string>(),
        .photo_url = row[4].as<std::string>()
    };
}