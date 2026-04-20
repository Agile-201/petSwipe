#pragma once
#include <drogon/HttpController.h>

using namespace drogon;

class SwipeController : public HttpController<SwipeController> {
public:
    METHOD_LIST_BEGIN
        ADD_METHOD_TO(SwipeController::like, "/api/swipes/like", Post);
        ADD_METHOD_TO(SwipeController::dislike, "/api/swipes/dislike", Post);
    METHOD_LIST_END

    void like(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback);
    void dislike(const HttpRequestPtr& req, std::function<void(const HttpResponsePtr&)>&& callback);
};