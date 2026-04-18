package middleware

import (
	"context"
	"net/http"
	"strings"
)

type contextKey string

const userIDKey contextKey = "userID"

type TokenVerifier interface {
	Verify(token string) (int64, error)
}

func Auth(verifier TokenVerifier) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if header == "" {
				http.Error(w, "missing Authorization header", http.StatusUnauthorized)
				return
			}

			prefix := "Bearer "
			if !strings.HasPrefix(header, prefix) {
				http.Error(w, "invalid Authorization header format", http.StatusUnauthorized)
				return
			}

			token := strings.TrimPrefix(header, prefix)

			userID, err := verifier.Verify(token)
			if err != nil {
				http.Error(w, "invalid token", http.StatusUnauthorized)
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
