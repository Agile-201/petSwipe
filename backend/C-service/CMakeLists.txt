cmake_minimum_required(VERSION 3.20)
project(C-service LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(Drogon REQUIRED)
find_package(PostgreSQL REQUIRED)
find_package(jsoncpp REQUIRED)
find_library(PQXX_LIB pqxx)

file(GLOB_RECURSE MAIN_SOURCES CONFIGURE_DEPENDS
    "utils/*.cpp"
    "handlers/*.cpp"
    "db/*.cpp"
)

file(GLOB PROJECT_HEADERS CONFIGURE_DEPENDS
    "utils/*.h"
    "handlers/*.h"
    "db/*.h"
)

add_executable(C-service
    "C-service.cpp"
    ${MAIN_SOURCES}
    ${PROJECT_HEADERS}
)

target_include_directories(C-service PRIVATE
    "${CMAKE_CURRENT_SOURCE_DIR}/utils"
    "${CMAKE_CURRENT_SOURCE_DIR}/handlers"
    "${CMAKE_CURRENT_SOURCE_DIR}/db"
)

target_link_libraries(C-service PRIVATE
    Drogon::Drogon
    PostgreSQL::PostgreSQL
    ${PQXX_LIB}
    jsoncpp_lib
    OpenSSL::SSL
    OpenSSL::Crypto
    ZLIB::ZLIB
)