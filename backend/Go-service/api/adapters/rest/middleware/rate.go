package middleware

import (
	"net/http"
)

func Rate(next http.HandlerFunc, rps int) http.HandlerFunc {
	return nil
}
