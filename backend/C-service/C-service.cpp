#include <drogon/drogon.h>
#include "db/postgres.h"
#include "handlers/pet_handler.h"
#include "handlers/swipe_handler.h"

int main() {
    const char* db_url = std::getenv("DATABASE_URL");
    if (!db_url) {
        std::cerr << "DATABASE_URL not set" << std::endl;
        return 1;
    }
    Database::init(db_url);

    drogon::app()
        .addListener("0.0.0.0", 8081)
        .setThreadNum(4)
        .run();
    return 0;
}