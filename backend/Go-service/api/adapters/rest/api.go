package rest

import (
	"encoding/json"
	"hackaton/api/adapters/rest/middleware"
	"hackaton/api/core"
	"log"
	"log/slog"
	"net/http"
	"strconv"

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
	ID        int64   `json:"id"`
	Email     string  `json:"email"`
	Role      string  `json:"role"`
	Nickname  *string `json:"nickname,omitempty"`
	Bio       *string `json:"bio,omitempty"`
	AvatarURL *string `json:"avatar_url,omitempty"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

func writeAPIError(w http.ResponseWriter, err *core.APIError) {
	if err == nil {
		err = core.ErrInternalError
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(err.StatusCode)
	resp := ErrorResponse{
		Error: err.Message,
		Code:  err.Code,
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("failed to write json error response: %v", err)
	}
}

func fieldError(field, reason string) *core.APIError {
	return &core.APIError{
		Message:    field + ": " + reason,
		Code:       "INVALID_FIELD",
		StatusCode: http.StatusBadRequest,
	}
}

func NewHealthcheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
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
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}

		var req LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeAPIError(w, core.ErrInvalidRequest)
			return
		}

		if req.Email == "" || req.Password == "" {
			writeAPIError(w, core.ErrMissingFields)
			return
		}

		token, err := auth.Login(r.Context(), req.Email, req.Password)
		if err != nil {
			log.WarnContext(r.Context(), "login failed", "email", req.Email, "error", err)
			writeAPIError(w, core.ErrInvalidCredentials)
			return
		}

		user, err := auth.GetUserByEmail(r.Context(), req.Email)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to get user", "error", err)
			writeAPIError(w, core.ErrInternalError)
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
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}
		var req RegisterRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeAPIError(w, core.ErrInvalidRequest)
			return
		}
		if req.Email == "" || req.Password == "" {
			writeAPIError(w, core.ErrMissingFields)
			return
		}

		if req.Role != "user" && req.Role != "admin" {
			req.Role = "user"
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to hash password", "error", err)
			writeAPIError(w, core.ErrInternalError)
			return
		}

		user, err := auth.CreateUser(r.Context(), req.Email, string(hashedPassword), req.Role)
		if err != nil {
			log.WarnContext(r.Context(), "registration failed", "email", req.Email, "error", err)
			writeAPIError(w, core.ErrRegistrationFailed)
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
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			writeAPIError(w, core.ErrUnauthorized)
			return
		}

		user, err := userRepo.GetByID(r.Context(), userID)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to get user", "user_id", userID, "error", err)
			writeAPIError(w, core.ErrUserNotFound)
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
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized chat access", "path", r.URL.Path)
			writeAPIError(w, core.ErrUnauthorized)
			return
		}

		receiverIDStr := r.URL.Query().Get("receiver_id")
		limitStr := r.URL.Query().Get("limit")

		if receiverIDStr == "" {
			log.WarnContext(r.Context(), "missing receiver_id", "user_id", userID)
			writeAPIError(w, core.ErrMissingField)
			return
		}

		receiverID, err := parseint64(receiverIDStr)
		if err != nil {
			log.WarnContext(r.Context(), "invalid receiver_id", "receiver_id", receiverIDStr, "error", err)
			writeAPIError(w, core.ErrInvalidField)
			return
		}

		if userID == receiverID {
			log.WarnContext(r.Context(), "cannot chat with self", "user_id", userID)
			writeAPIError(w, core.ErrInvalidOperation)
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
			writeAPIError(w, core.ErrInternalError)
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
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized send message", "path", r.URL.Path)
			writeAPIError(w, core.ErrUnauthorized)
			return
		}

		var req struct {
			ReceiverID int64  `json:"receiver_id"`
			Message    string `json:"message"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.WarnContext(r.Context(), "invalid request body", "error", err, "user_id", userID)
			writeAPIError(w, core.ErrInvalidRequest)
			return
		}

		if req.ReceiverID == 0 {
			log.WarnContext(r.Context(), "missing receiver_id", "user_id", userID)
			writeAPIError(w, core.ErrMissingField)
			return
		}

		if req.Message == "" {
			log.WarnContext(r.Context(), "empty message", "user_id", userID, "receiver_id", req.ReceiverID)
			writeAPIError(w, core.ErrInvalidMessage)
			return
		}

		if len(req.Message) > 10000 {
			log.WarnContext(r.Context(), "message too long", "user_id", userID, "length", len(req.Message))
			writeAPIError(w, core.ErrMessageTooLong)
			return
		}

		if userID == req.ReceiverID {
			log.WarnContext(r.Context(), "cannot send message to self", "user_id", userID)
			writeAPIError(w, core.ErrInvalidOperation)
			return
		}

		message, err := chatRepo.SendMessage(r.Context(), userID, req.ReceiverID, req.Message)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to send message", "user_id", userID, "receiver_id", req.ReceiverID, "error", err)
			writeAPIError(w, core.ErrInternalError)
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
			writeAPIError(w, core.ErrMethodNotAllowed)
			return
		}

		userID, ok := middleware.UserIDFromContext(r.Context())
		if !ok {
			log.WarnContext(r.Context(), "unauthorized profile update", "path", r.URL.Path)
			writeAPIError(w, core.ErrUnauthorized)
			return
		}

		var req struct {
			Nickname  string `json:"nickname,omitempty"`
			Bio       string `json:"bio,omitempty"`
			AvatarURL string `json:"avatar_url,omitempty"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.WarnContext(r.Context(), "invalid request body", "error", err, "user_id", userID)
			writeAPIError(w, core.ErrInvalidRequest)
			return
		}

		if len(req.Nickname) > 100 {
			log.WarnContext(r.Context(), "nickname too long", "user_id", userID, "length", len(req.Nickname))
			writeAPIError(w, core.ErrNicknameTooLong)
			return
		}
		if len(req.Bio) > 5000 {
			log.WarnContext(r.Context(), "bio too long", "user_id", userID, "length", len(req.Bio))
			writeAPIError(w, core.ErrBioTooLong)
			return
		}
		if len(req.AvatarURL) > 500 {
			log.WarnContext(r.Context(), "avatar_url too long", "user_id", userID, "length", len(req.AvatarURL))
			writeAPIError(w, core.ErrAvatarURLTooLong)
			return
		}

		user, err := userRepo.Update(r.Context(), userID, &req.Nickname, &req.Bio, &req.AvatarURL)
		if err != nil {
			log.ErrorContext(r.Context(), "failed to update profile", "user_id", userID, "error", err)
			writeAPIError(w, core.ErrInternalError)
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
	return strconv.Atoi(s)
}

func parseint64(s string) (int64, error) {
	return strconv.ParseInt(s, 10, 64)
}
