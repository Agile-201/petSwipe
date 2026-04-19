#include "postgres.h"
#include "validator.h"
#include "pet_handler.h"

#include <json/json.h>
#include <stdexcept>
#include "../utils/validator.h"
#include "../db/postgres.h"

void PetController::getList(const HttpRequestPtr& req,
    std::function<void(const HttpResponsePtr&)>&& callback)
{
    auto response = HttpResponse::newHttpResponse();
    try {
        auto pets = Database::getAllPets();
        Json::Value root(Json::arrayValue);
        for (const auto& pet : pets) {
            Json::Value jsonValue;
            jsonValue["id"] = pet.id;
            jsonValue["name"] = pet.name;
            jsonValue["breed"] = pet.breed;
			jsonValue["description"] = pet.description;
			jsonValue["age"] = pet.age.value_or(-1);
            root.append(jsonValue);
        }
        response->setStatusCode(k200OK);
        response->setContentTypeCode(CT_APPLICATION_JSON);
        response->setBody(root.toStyledString());
    } catch (const std::exception& e) {
        response->setStatusCode(k500InternalServerError);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    }
    callback(response);
}

void PetController::create(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback) {
    auto response = HttpResponse::newHttpResponse();
    
    try {
        auto auth_header = req->getHeader("Authorization");
        if (auth_header.length() <= 7 || auth_header.substr(0, 7) != "Bearer ") {
            response->setStatusCode(k401Unauthorized);
            response->setBody(R"({"error":"Invalid Authorization header"})");
            callback(response);
            return; 
        }
        
        const char* secret = std::getenv("JWT_SECRET");
        if (!secret) throw std::runtime_error("JWT_SECRET is not configured");

        auto token = auth_header.substr(7);
        JWTValidator validator(secret);
        auto claims = validator.validate(token);
        
        auto json = req->getJsonObject();
        if (!json || !json->isMember("name") || !json->isMember("breed")) {
            response->setStatusCode(k400BadRequest);
            response->setBody(R"({"error":"Missing required fields in JSON"})");
            callback(response);
            return;
        }
        std::optional<int> age;
		if (json->isMember("age") && !(*json)["age"].isNull()) {
			age = (*json)["age"].asInt();
		}

		Pet newPet{
			.owner_id = (int)claims.user_id,
			.name = (*json)["name"].asString(),
			.breed = (*json)["breed"].asString(),
			.photo_url = json->get("photo_url", "").asString(),
			.description = json->get("description", "").asString(),
			.age = age
		};
        
        auto pet_id = Database::createPet(newPet);
        
        Json::Value result;
        result["id"] = pet_id;
        result["message"] = "Pet created successfully";
        
        response->setStatusCode(k201Created);
        response->setContentTypeCode(CT_APPLICATION_JSON);
        response->setBody(result.toStyledString());
        
    } catch (const std::exception& e) {
        response->setStatusCode(k500InternalServerError);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    }
    
    callback(response);
}

void PetController::getByID(const HttpRequestPtr& req,
    std::function<void(const HttpResponsePtr&)>&& callback,
    const std::string& id)
{
    auto response = HttpResponse::newHttpResponse();
    try {
        int petId = std::stoi(id);
        Pet pet = Database::getPetById(petId);
        Json::Value json;
        json["id"] = pet.id;
        json["owner_id"] = pet.owner_id;
        json["name"] = pet.name;
        json["breed"] = pet.breed;
        json["photo_url"] = pet.photo_url;
        json["description"] = pet.description;
        json["age"] = pet.age.value_or(-1); 
        response->setStatusCode(k200OK);
        response->setContentTypeCode(CT_APPLICATION_JSON);
        response->setBody(json.toStyledString());
    } catch (const std::invalid_argument& e) {
        response->setStatusCode(k400BadRequest);
        response->setBody(R"({"error":"Invalid pet ID"})");
    } catch (const std::runtime_error& e) {
        response->setStatusCode(k404NotFound);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    } catch (const std::exception& e) {
        response->setStatusCode(k500InternalServerError);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    }
    callback(response);
}

void PetController::getFeed(const HttpRequestPtr& req, 
	std::function<void(const HttpResponsePtr&)>&& callback) 
{
	auto response = HttpResponse::newHttpResponse();
	try {
		auto auth_header = req->getHeader("Authorization");
		if (auth_header.empty()) {
			response->setStatusCode(k401Unauthorized);
			response->setBody(R"({"error":"Authorization header missing"})");
			callback(response);
			return;
		}

		auto token = auth_header.substr(7);
		JWTValidator validator(std::getenv("JWT_SECRET"));
		auto claims = validator.validate(token);

		auto pets = Database::getFeed(claims.user_id, 20);

		Json::Value rootJson(Json::arrayValue);
		for (const auto& pet : pets) {
			Json::Value jsonValue;
			jsonValue["id"] = pet.id;
			jsonValue["name"] = pet.name;
			jsonValue["breed"] = pet.breed;
			jsonValue["photo_url"] = pet.photo_url;
			jsonValue["description"] = pet.description;
			jsonValue["age"] = pet.age.value_or(-1);
			rootJson.append(jsonValue);
		}

		response->setStatusCode(k200OK);
		response->setContentTypeCode(CT_APPLICATION_JSON);
		response->setBody(rootJson.toStyledString());
	}
	catch (const std::exception& e) {
		response->setStatusCode(k500InternalServerError);
		response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
	}

	callback(response);
}



