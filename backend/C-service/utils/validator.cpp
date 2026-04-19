#include <jwt-cpp/jwt.h>

#include "validator.h"

JWTValidator::JWTValidator(const std::string& secret) : secret_(secret) {};

JWTClaims JWTValidator::validate(const std::string& token) const{
    try {
        auto decoded = jwt::decode(token);

        auto user_id_claim = decoded.get_payload_claim("user_id");
        auto email_claim = decoded.get_payload_claim("email");

        jwt::verify()
            .allow_algorithm(jwt::algorithm::hs256{ secret_ })
            .verify(decoded);
        return {
            .user_id = user_id_claim.as_integer(),
            .email = email_claim.as_string()
        };
    }
    catch (const std::exception& e) {
        throw std::runtime_error("Invalid JWT token: " + std::string(e.what()));
    }
}