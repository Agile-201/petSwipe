#include "postgre.h"
#include "validator.h"
#include "pet_handler.h"

#include <json/json.h>
#include <stdexcept>

void PetController::getList(const HttpRequestPtr& req, 
	std::function<void(const HttpResponsePtr&)>&& callback)
{

	auto response = HttpResponse::newHttpResponse();

	try
	{
		Json::Value petJson;

		auto pets = Database::getAllPets();

		for (const auto& pet : pets) {
			Json::Value jsonValue;
			jsonValue["id"] = pet.id;
			jsonValue["name"] = pet.name;
			jsonValue["breed"] = pet.breed;
			petJson.append(petJson);
		}

		response->setStatusCode(k200OK);
		response->setContentTypeCode(CT_APPLICATION_JSON);
		response->setBody(petJson.toStyledString());
	}
	catch (const std::exception& e)
	{
		response->setStatusCode(k500InternalServerError);
		response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
	}
	
	callback(response);
}

void PetController::create(const HttpRequestPtr& req, 
	std::function<void(const HttpResponsePtr&)>&& callback) 
{
	auto response = HttpResponse::newHttpResponse();

	try {
		// Валидация JWT
		auto auth_header = req->getHeader("Authorization");
		if (auth_header.empty()) {
			response->setStatusCode(k401Unauthorized);
			response->setBody(R"({"error":"Authorization header missing"})");
			callback(response);
		}

		auto token = auth_header.substr(7); // Пропускаем "Bearer" чтоб получить сразу ключ
		JWTValidator validator(std::getenv("JWT_SECRET"));
		auto claims = validator.validate(token);

		auto json = req->getJsonObject();

		Pet newPet{
			.owner_id = (int)claims.user_id,
			.name = (*json)["name"].asString(),
			.breed = (*json)["breed"].asString()
		};

		auto pet_id = Database::createPet(newPet);

		Json::Value result;
		result["id"] = pet_id;
		result["message"] = "Pet created successfully";

		response->setStatusCode(k201Created);
		response->setContentTypeCode(CT_APPLICATION_JSON);
		response->setBody(result.toStyledString());
	}
	catch (const std::exception& e) {
		response->setStatusCode(k500InternalServerError);
		response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
	}

	callback(response);
}

void PetController::getByID(const HttpRequestPtr& req,
	std::function<void(const HttpResponsePtr&)>&& callback, const std::string& id)
{
	auto response = HttpResponse::newHttpResponse();

	try {
		int petId;
		try {
			petId = std::stoi(id);
		}
		catch (const std::exception& e) {
			response->setStatusCode(k400BadRequest);
			response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
			callback(response);
		}

		Pet pet = Database::getPetById(petId);

		Json::Value json;
		json["id"] = pet.id;
		json["owner_id"] = pet.owner_id;
		json["name"] = pet.name;
		json["breed"] = pet.breed;
		json["photo_url"] = pet.photo_url;

		response->setStatusCode(k200OK);
		response->setContentTypeCode(CT_APPLICATION_JSON);
		response->setBody(json.toStyledString());

	}
	catch (const std::runtime_error& e) {
		response->setStatusCode(k404NotFound);
		response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
	}
	catch (const std::exception& e) {
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



