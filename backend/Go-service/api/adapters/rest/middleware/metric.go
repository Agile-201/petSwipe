package middleware

import (
	"net/http"
)

type responseWriter struct {
}

func (rw *responseWriter) WriteHeader(statusCode int) {
}

func WithMetrics(next http.Handler) http.Handler {
	return nil
}