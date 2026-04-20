#include <jwt-cpp/jwt.h>
#include "validator.h"

JWTValidator::JWTValidator(const std::string& secret) : secret_(secret) {}

JWTClaims JWTValidator::validate(const std::string& token) const {
    try {
        auto decoded = jwt::decode(token);
        jwt::verify()
            .allow_algorithm(jwt::algorithm::hs256{secret_})
            .verify(decoded);
        
        auto user_id_claim = decoded.get_payload_claim("user_id");
        std::string email;
        if (decoded.has_payload_claim("email")) {
            email = decoded.get_payload_claim("email").as_string();
        }
        
        return {
            .user_id = user_id_claim.as_integer(),
            .email   = email
        };
    } catch (const std::exception& e) {
        throw std::runtime_error("Invalid JWT token: " + std::string(e.what()));
    }
}