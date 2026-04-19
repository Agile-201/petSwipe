#pragma once 
#include <drogon/HttpController.h>
#include <optional>

using namespace drogon;

struct Pet {
	int id;
	int owner_id;
	std::string name;
	std::string breed;
	std::string photo_url;
	std::string description;
    std::optional<int> age;
};

class PetController : public HttpController<PetController> {
public:
	METHOD_LIST_BEGIN
		// Методы доступны без авторизации
		ADD_METHOD_TO(PetController::getFeed, "/api/feed", Get);
		ADD_METHOD_TO(PetController::getList, "/api/pets/list", Get);
		ADD_METHOD_TO(PetController::getByID, "/api/pets/{id}", Get);

		// Методы требуют авторизации (проверяем в коде)
		ADD_METHOD_TO(PetController::create, "/api/pets/create", Post);
	METHOD_LIST_END

	void getList(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback);
	void getByID(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback, const std::string& id);
	void create(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback);
	void getFeed(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback);

};