package rest

import (
	"log/slog"
	"net/http"
	"hackaton/api/core"
)

type PingResponse struct {

}

type Person struct{

}

func NewMetricsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func NewPingHandler(log *slog.Logger, pingers map[string]core.Pinger) http.HandlerFunc {
	return nil
}

type Authenticator interface {
	Login(user, password string) (string, error)
}

func NewLoginHandler(log *slog.Logger, auth Authenticator) http.HandlerFunc {
	return nil
}
