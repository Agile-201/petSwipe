cmake_minimum_required(VERSION 3.20)

project(C-service LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(ZLIB REQUIRED)
find_package(Drogon REQUIRED)
find_package(libpqxx REQUIRED)

file(GLOB_RECURSE MAIN_SOURCES CONFIGURE_DEPENDS
    "${CMAKE_CURRENT_SOURCE_DIR}/utils/*.cpp"
    "${CMAKE_CURRENT_SOURCE_DIR}/handlers/*.cpp"
    "${CMAKE_CURRENT_SOURCE_DIR}/db/*.cpp"
)

file(GLOB PROJECT_HEADERS CONFIGURE_DEPENDS
    "${CMAKE_CURRENT_SOURCE_DIR}/utils/*.h"
    "${CMAKE_CURRENT_SOURCE_DIR}/handlers/*.h"
    "${CMAKE_CURRENT_SOURCE_DIR}/db/*.h"
)

add_executable(C-service
    "C-service.cpp"
    "C-service.h"
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
    ZLIB::ZLIB
    libpqxx::pqxx
    OpenSSL::SSL       
    OpenSSL::Crypto
)