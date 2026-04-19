#include <pqxx/pqxx>
#include <memory>
#include <vector>
#include <string>

#include "postgres.h"

// src/db/postgres.cpp
#include <mutex>

std::shared_ptr<pqxx::connection> Database::connection_;
static std::mutex db_mutex;

void Database::init(const std::string& connection_string) {
    connection_ = std::make_shared<pqxx::connection>(connection_string);
}

std::vector<Pet> Database::getAllPets() {
    std::lock_guard<std::mutex> lock(db_mutex);
    pqxx::work txn(*connection_);
    pqxx::result result = txn.exec(
        "SELECT id, owner_id, name, breed, photo_url, description, age FROM pets LIMIT 50"
    );
    std::vector<Pet> pets;
    for (auto row : result) {
        std::optional<int> age;
        if (!row[6].is_null()) {
            age = row[6].as<int>();
        }
        pets.push_back({
            row[0].as<int>(),
            row[1].as<int>(),
            row[2].as<std::string>(),
            row[3].as<std::string>(),
            row[4].is_null() ? "" : row[4].as<std::string>(),
            row[5].is_null() ? "" : row[5].as<std::string>(),
            age
        });
    }
    return pets;
}
int Database::createPet(const Pet& pet) {
    pqxx::work txn(*connection_);
    
    if (pet.age.has_value()) {
        auto newPet = txn.exec_params(
            R"(INSERT INTO pets (owner_id, name, breed, photo_url, description, age) 
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING id)",
            pet.owner_id,
            pet.name,
            pet.breed,
            pet.photo_url,
            pet.description,
            pet.age.value()
        );
        txn.commit();
        return newPet[0][0].as<int>();
    } else {
        auto newPet = txn.exec_params(
            R"(INSERT INTO pets (owner_id, name, breed, photo_url, description, age) 
               VALUES ($1, $2, $3, $4, $5, NULL) RETURNING id)",
            pet.owner_id,
            pet.name,
            pet.breed,
            pet.photo_url,
            pet.description
        );
        txn.commit();
        return newPet[0][0].as<int>();
    }
}
void Database::likePet(int user_id, int pet_id) {
    pqxx::work txn(*connection_);
    txn.exec_params(
        R"(INSERT INTO swipes (user_id, pet_id, is_like) VALUES ($1, $2, TRUE) ON CONFLICT (user_id, pet_id) DO UPDATE SET is_like = TRUE)",
        user_id,
        pet_id
    );
    txn.commit();
}

void Database::dislikePet(int user_id, int pet_id) {
    pqxx::work txn(*connection_);
    txn.exec_params(
        R"(INSERT INTO swipes (user_id, pet_id, is_like) VALUES ($1, $2, FALSE) ON CONFLICT (user_id, pet_id) DO UPDATE SET is_like = FALSE)",
        user_id,
        pet_id
    );
    txn.commit();
}

std::vector<Pet> Database::getFeed(int user_id, int limit) {
    pqxx::work txn(*connection_);
    pqxx::result result = txn.exec_params(
        R"(
        SELECT p.id, p.owner_id, p.name, p.breed, p.photo_url, p.description, p.age
        FROM pets p
        WHERE NOT EXISTS (
            SELECT 1 FROM swipes s
            WHERE s.user_id = $1 AND s.pet_id = p.id
        )
        ORDER BY p.id
        LIMIT $2
        )",
        user_id, limit
    );
    std::vector<Pet> pets;
    for (auto row : result) {
        std::optional<int> age;
        if (!row[6].is_null()) {
            age = row[6].as<int>();
        }
        pets.push_back({
            row[0].as<int>(),
            row[1].as<int>(),
            row[2].as<std::string>(),
            row[3].as<std::string>(),
            row[4].is_null() ? "" : row[4].as<std::string>(),
            row[5].is_null() ? "" : row[5].as<std::string>(),
            age
        });
    }
    return pets;
}

Pet Database::getPetById(int id) {
    pqxx::work txn(*connection_);
    pqxx::result result = txn.exec_params(
        "SELECT id, owner_id, name, breed, photo_url, description, age FROM pets WHERE id = $1",
        id
    );
    if (result.empty()) {
        throw std::runtime_error("Pet not found");
    }
    auto row = result[0];
    std::optional<int> age;
    if (!row[6].is_null()) {
        age = row[6].as<int>();
    }
    return {
        row[0].as<int>(),
        row[1].as<int>(),
        row[2].as<std::string>(),
        row[3].as<std::string>(),
        row[4].is_null() ? "" : row[4].as<std::string>(),
        row[5].is_null() ? "" : row[5].as<std::string>(),
        age
    };
}