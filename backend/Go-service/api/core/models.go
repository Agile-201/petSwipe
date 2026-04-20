package core

import "time"

type UpdateStatus string

const (
	StatusUpdateUnknown UpdateStatus = "unknown"
	StatusUpdateIdle    UpdateStatus = "idle"
	StatusUpdateRunning UpdateStatus = "running"
)

type User struct {
	ID           int64
	Email        string
	PasswordHash string
	Role         string
	Nickname     *string
	Bio          *string
	AvatarURL    *string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type ChatMessage struct {
	ID         int64
	SenderID   int64
	ReceiverID int64
	Message    string
	IsRead     bool
	SentAt     time.Time
}
