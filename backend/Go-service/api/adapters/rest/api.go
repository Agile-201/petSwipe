package rest

import (
	"context"
	"encoding/json"
	"fmt"
	"hackaton/api/core"
	"log/slog"
	"net/http"

	"github.com/VictoriaMetrics/metrics"
	"golang.org/x/crypto/bcrypt"
)

type PingResponse struct {
	Replies map[string]string `json:"replies"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token  string `json:"token"`
	UserID int64  `json:"user_id"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role,omitempty"`
}

type RegisterResponse struct {
	UserID    int64  `json:"user_id"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
}

type ProfileResponse struct {
	ID        int64  `json:"id"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

func NewHealthcheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("OK"))
	}
}

func NewMetricsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		metrics.WritePrometheus(w, true)
	}
}

func NewPingHandler(log *slog.Logger, pingers map[string]interface{}) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res := PingResponse{
			Replies: make(map[string]string),
		}
		for service := range pingers {
			res.Replies[service] = "ok"
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(res); err != nil {
			log.Error("encode ping response failed", "error", err)
		}
	}
}

func NewLoginHandler(log *slog.Logger, auth core.Authenticator) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}

		if req.Email == "" || req.Password == "" {
			http.Error(w, "email and password required", http.StatusBadRequest)
			return
		}

		token, err := auth.Login(r.Context(), req.Email, req.Password)
		if err != nil {
			log.WarnContext(r.Context(), "login failed", "email", req.Email, "error", err)
			http.Error(w, "invalid credentials", http.StatusUnauthorized)
			return
		}

		user, err := auth.GetUserByEmail(r.Context(), req.Email)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to get user", "error", err)
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		resp := LoginResponse{
			Token:  token,
			UserID: user.ID,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}
	}
}

func NewRegisterHandler(log *slog.Logger, auth core.Authenticator) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request){
		if r.Method != http.MethodPost{
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		var req RegisterRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil{
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}
		if req.Email == "" || req.Password == "" {
			http.Error(w, "email and password required", http.StatusBadRequest)
			return
		}

		if req.Role == "" {
			req.Role = "user"
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to hash password", "error", err)
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		user, err := auth.CreateUser(r.Context(), req.Email, string(hashedPassword), req.Role)
		if err != nil {
			log.WarnContext(r.Context(), "registration failed", "email", req.Email, "error", err)
			http.Error(w, fmt.Sprintf("registration failed: %v", err), http.StatusBadRequest)
			return
		}

		resp := RegisterResponse{
			UserID:    user.ID,
			Email:     user.Email,
			Role:      user.Role,
			CreatedAt: user.CreatedAt.Format("2006-01-02T15:04:05Z"),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}
	}
}
func NewProfileHandler(log *slog.Logger, userRepo core.UserRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID, ok := userIDFromContext(r.Context())
		if !ok {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		user, err := userRepo.GetByID(r.Context(), userID)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to get user", "user_id", userID, "error", err)
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}

		resp := ProfileResponse{
			ID:        user.ID,
			Email:     user.Email,
			Role:      user.Role,
			CreatedAt: user.CreatedAt.Format("2006-01-02T15:04:05Z"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02T15:04:05Z"),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}
	}
}

type contextKey string
const userIDKey contextKey = "userID"

func userIDFromContext(ctx context.Context) (int64, bool) {
	id, ok := ctx.Value(userIDKey).(int64)
	return id, ok
}
