package rest

import (
	"encoding/json"
	"fmt"
	"hackaton/api/adapters/rest/middleware"
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
	Nickname  *string `json:"nickname,omitempty"`
	Bio       *string `json:"bio,omitempty"`
	AvatarURL *string `json:"avatar_url,omitempty"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

func NewHealthcheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
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

		if req.Role != "user" && req.Role != "admin" { req.Role = "user" }
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

		userID, ok := middleware.UserIDFromContext(r.Context())
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
			Nickname:  user.Nickname,
			Bio:       user.Bio,
			AvatarURL: user.AvatarURL,
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

func NewChatHandler(log *slog.Logger, chatRepo core.ChatRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized chat access", "path", r.URL.Path)
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		receiverIDStr := r.URL.Query().Get("receiver_id")
		limitStr := r.URL.Query().Get("limit")

		if receiverIDStr == "" {
			log.WarnContext(r.Context(), "missing receiver_id", "user_id", userID)
			http.Error(w, "receiver_id is required", http.StatusBadRequest)
			return
		}

		receiverID, err := parseint64(receiverIDStr)
		if err != nil {
			log.WarnContext(r.Context(), "invalid receiver_id", "receiver_id", receiverIDStr, "error", err)
			http.Error(w, "invalid receiver_id", http.StatusBadRequest)
			return
		}

		if userID == receiverID {
			log.WarnContext(r.Context(), "cannot chat with self", "user_id", userID)
			http.Error(w, "cannot chat with yourself", http.StatusBadRequest)
			return
		}

		limit := 50
		if limitStr != "" {
			if l, err := parseint(limitStr); err == nil && l > 0 && l <= 100 {
				limit = l
			}
		}

		messages, err := chatRepo.GetMessages(r.Context(), userID, receiverID, limit)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to get messages", "user_id", userID, "receiver_id", receiverID, "error", err)
			http.Error(w, "failed to get messages", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"messages":    messages,
			"count":       len(messages),
			"user_id":     userID,
			"receiver_id": receiverID,
		}); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}

		log.InfoContext(r.Context(), "messages retrieved", "user_id", userID, "receiver_id", receiverID, "count", len(messages))
	}
}

func NewSendMessageHandler(log *slog.Logger, chatRepo core.ChatRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized send message", "path", r.URL.Path)
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		var req struct {
			ReceiverID int64  `json:"receiver_id"`
			Message    string `json:"message"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.WarnContext(r.Context(), "invalid request body", "error", err, "user_id", userID)
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}

		if req.ReceiverID == 0 {
			log.WarnContext(r.Context(), "missing receiver_id", "user_id", userID)
			http.Error(w, "receiver_id is required", http.StatusBadRequest)
			return
		}

		if req.Message == "" {
			log.WarnContext(r.Context(), "empty message", "user_id", userID, "receiver_id", req.ReceiverID)
			http.Error(w, "message cannot be empty", http.StatusBadRequest)
			return
		}

		if len(req.Message) > 10000 {
			log.WarnContext(r.Context(), "message too long", "user_id", userID, "length", len(req.Message))
			http.Error(w, "message too long (max 10000 chars)", http.StatusBadRequest)
			return
		}

		if userID == req.ReceiverID {
			log.WarnContext(r.Context(), "cannot send message to self", "user_id", userID)
			http.Error(w, "cannot send message to yourself", http.StatusBadRequest)
			return
		}

		message, err := chatRepo.SendMessage(r.Context(), userID, req.ReceiverID, req.Message)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to send message", "user_id", userID, "receiver_id", req.ReceiverID, "error", err)
			http.Error(w, "failed to send message", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)

		if err := json.NewEncoder(w).Encode(message); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}

		log.InfoContext(r.Context(), "message sent", "user_id", userID, "receiver_id", req.ReceiverID, "message_length", len(req.Message))
	}
}

func NewUpdateProfileHandler(log *slog.Logger, userRepo core.UserRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized profile update", "path", r.URL.Path)
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		var req struct {
			Nickname  string `json:"nickname,omitempty"`
			Bio       string `json:"bio,omitempty"`
			AvatarURL string `json:"avatar_url,omitempty"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.WarnContext(r.Context(), "invalid request body", "error", err, "user_id", userID)
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}

		if len(req.Nickname) > 100 {
			log.WarnContext(r.Context(), "nickname too long", "user_id", userID, "length", len(req.Nickname))
			http.Error(w, "nickname too long (max 100)", http.StatusBadRequest)
			return
		}
		if len(req.Bio) > 5000 {
			log.WarnContext(r.Context(), "bio too long", "user_id", userID, "length", len(req.Bio))
			http.Error(w, "bio too long (max 5000)", http.StatusBadRequest)
			return
		}
		if len(req.AvatarURL) > 500 {
			log.WarnContext(r.Context(), "avatar_url too long", "user_id", userID, "length", len(req.AvatarURL))
			http.Error(w, "avatar_url too long (max 500)", http.StatusBadRequest)
			return
		}

		user, err := userRepo.Update(r.Context(), userID, &req.Nickname, &req.Bio, &req.AvatarURL)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to update profile", "user_id", userID, "error", err)
			http.Error(w, "failed to update profile", http.StatusInternalServerError)
			return
		}

		resp := ProfileResponse{
			ID:        user.ID,
			Email:     user.Email,
			Role:      user.Role,
			Nickname:  user.Nickname,
			Bio:       user.Bio,
			AvatarURL: user.AvatarURL,
			CreatedAt: user.CreatedAt.Format("2006-01-02T15:04:05Z"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02T15:04:05Z"),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			log.ErrorContext(r.Context(), "failed to encode response", "error", err)
		}

		log.InfoContext(r.Context(), "profile updated", "user_id", userID, "nickname", req.Nickname, "bio_len", len(req.Bio))
	}
}

func parseint(s string) (int, error) {
	var i int
	_, err := fmt.Sscanf(s, "%d", &i)
	return i, err
}

func parseint64(s string) (int64, error) {
	var i int64
	_, err := fmt.Sscanf(s, "%d", &i)
	return i, err
}