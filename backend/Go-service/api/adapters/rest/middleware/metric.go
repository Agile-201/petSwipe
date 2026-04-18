package middleware

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/VictoriaMetrics/metrics"
)

type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(statusCode int) {
	rw.statusCode = statusCode
	rw.ResponseWriter.WriteHeader(statusCode)
}

func WithMetrics(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		rw := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		next.ServeHTTP(rw, r)

		duration := time.Since(start).Seconds()
		status := strconv.Itoa(rw.statusCode)
		url := r.URL.Path

		metrics.GetOrCreateCounter(
			fmt.Sprintf(`http_requests_total{status="%s",url="%s"}`, status, url),
		).Inc()

		metrics.GetOrCreateSummary(
			fmt.Sprintf(`http_request_duration_seconds{status="%s",url="%s"}`, status, url),
		).Update(duration)
	})
}