#pragma once

struct JWTClaims {
    long long user_id;
    std::string email;
};

class JWTValidator {
public:
    JWTValidator(const std::string& secret);
    
    JWTClaims validate(const std::string& token) const;

private:
    std::string secret_;
};

