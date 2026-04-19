package core

import (
	"errors"
	"net/http"
)

var ErrBadArguments = errors.New("arguments are not acceptable")
var ErrAlreadyExists = errors.New("resource or task already exists")
var ErrNotFound = errors.New("resource is not found")

type APIError struct {
	Message    string
	Code       string
	StatusCode int
}

func (e *APIError) Error() string {
	return e.Message
}

var (
	ErrMethodNotAllowed     = &APIError{"method not allowed", "METHOD_NOT_ALLOWED", http.StatusMethodNotAllowed}
	ErrInvalidRequest       = &APIError{"invalid request body", "INVALID_REQUEST", http.StatusBadRequest}
	ErrMissingFields        = &APIError{"email and password required", "MISSING_FIELDS", http.StatusBadRequest}
	ErrMissingAuthorization = &APIError{"missing Authorization header", "UNAUTHORIZED", http.StatusUnauthorized}
	ErrInvalidAuthFormat    = &APIError{"invalid Authorization header format", "UNAUTHORIZED", http.StatusUnauthorized}
	ErrInvalidToken         = &APIError{"invalid token", "UNAUTHORIZED", http.StatusUnauthorized}
	ErrUnauthorized         = &APIError{"unauthorized", "UNAUTHORIZED", http.StatusUnauthorized}
	ErrInvalidCredentials   = &APIError{"invalid credentials", "UNAUTHORIZED", http.StatusUnauthorized}
	ErrUserNotFound         = &APIError{"user not found", "USER_NOT_FOUND", http.StatusNotFound}
	ErrInternalError        = &APIError{"internal server error", "INTERNAL_ERROR", http.StatusInternalServerError}
	ErrMissingField         = &APIError{"required field is missing", "MISSING_FIELD", http.StatusBadRequest}
	ErrInvalidField         = &APIError{"field is invalid", "INVALID_FIELD", http.StatusBadRequest}
	ErrInvalidMessage       = &APIError{"message cannot be empty", "INVALID_MESSAGE", http.StatusBadRequest}
	ErrMessageTooLong       = &APIError{"message too long (max 10000 chars)", "MESSAGE_TOO_LONG", http.StatusBadRequest}
	ErrInvalidOperation     = &APIError{"operation is not allowed", "INVALID_OPERATION", http.StatusBadRequest}
	ErrNicknameTooLong      = &APIError{"nickname too long (max 100)", "INVALID_FIELD", http.StatusBadRequest}
	ErrBioTooLong           = &APIError{"bio too long (max 5000)", "INVALID_FIELD", http.StatusBadRequest}
	ErrAvatarURLTooLong     = &APIError{"avatar_url too long (max 500)", "INVALID_FIELD", http.StatusBadRequest}
	ErrRegistrationFailed   = &APIError{"registration failed", "REGISTRATION_FAILED", http.StatusBadRequest}
)
