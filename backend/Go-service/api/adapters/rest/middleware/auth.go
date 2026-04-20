package middleware

import (
	"context"
	"encoding/json"
	"hackaton/api/core"
	"log"
	"net/http"
	"strings"
)

type contextKey string

const userIDKey contextKey = "userID"

type TokenVerifier interface {
	Verify(token string) (int64, error)
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

func writeJSONError(w http.ResponseWriter, err *core.APIError) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(err.StatusCode)
	if err := json.NewEncoder(w).Encode(ErrorResponse{
		Error: err.Message,
		Code:  err.Code,
	}); err != nil {
		log.Printf("failed to write json error response: %v", err)
	}
}

func Auth(verifier TokenVerifier) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if header == "" {
				writeJSONError(w, core.ErrMissingAuthorization)
				return
			}

			prefix := "Bearer "
			if !strings.HasPrefix(header, prefix) {
				writeJSONError(w, core.ErrInvalidAuthFormat)
				return
			}

			token := strings.TrimPrefix(header, prefix)

			userID, err := verifier.Verify(token)
			if err != nil {
				writeJSONError(w, core.ErrInvalidToken)
				return
			}

			ctx := context.WithValue(r.Context(), userIDKey, userID)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func UserIDFromContext(ctx context.Context) (int64, bool) {
	id, ok := ctx.Value(userIDKey).(int64)
	return id, ok
}
