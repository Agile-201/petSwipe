#include "swipe_handler.h"
#include "postgre.h"
#include "validator.h"

#include <json/json.h>

void SwipeController::like(const HttpRequestPtr& req, 
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

        auto json = req->getJsonObject();
        if (!json || !json->isMember("pet_id")) {
            response->setStatusCode(k400BadRequest);
            response->setBody(R"({"error":"Missing pet_id in request body"})");
            callback(response);
        }

        int pet_id = (*json)["pet_id"].asInt();
        Database::likePet(claims.user_id, pet_id);

        Json::Value result;
        result["status"] = "success";
        result["message"] = "Pet liked";

        response->setStatusCode(k200OK);
        response->setContentTypeCode(CT_APPLICATION_JSON);
        response->setBody(result.toStyledString());
    }
    catch (const std::exception& e) {
        response->setStatusCode(k500InternalServerError);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    }

    callback(response);
}

void SwipeController::dislike(const HttpRequestPtr& req, 
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

        auto json = req->getJsonObject();
        if (!json || !json->isMember("pet_id")) {
            response->setStatusCode(k400BadRequest);
            response->setBody(R"({"error":"Missing pet_id in request body"})");
            callback(response);
        }

        int pet_id = (*json)["pet_id"].asInt();
        Database::dislikePet(claims.user_id, pet_id);

        Json::Value result;
        result["status"] = "success";
        result["message"] = "Pet disliked";

        response->setStatusCode(k200OK);
        response->setContentTypeCode(CT_APPLICATION_JSON);
        response->setBody(result.toStyledString());
    }
    catch (const std::exception& e) {
        response->setStatusCode(k500InternalServerError);
        response->setBody(R"({"error":")" + std::string(e.what()) + R"("})");
    }

    callback(response);
}