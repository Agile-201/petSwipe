package core

import "context"

type Pinger interface {
	Ping(context.Context) error
}

type Authenticator interface {
	Login(ctx context.Context, email, password string) (string, error)
	CreateUser(ctx context.Context, email, passwordHash, role string) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	Verify(tokenString string) (int64, error)
}

type UserRepository interface {
	GetByID(ctx context.Context, id int64) (*User, error)
	GetByEmail(ctx context.Context, email string) (*User, error)
	Create(ctx context.Context, email, passwordHash, role string) (*User, error)
	Update(ctx context.Context, id int64, nickname, bio, avatarURL *string) (*User, error)
}

type ChatRepository interface {
	GetMessages(ctx context.Context, senderID, receiverID int64, limit int) ([]*ChatMessage, error)
	SendMessage(ctx context.Context, senderID, receiverID int64, message string) (*ChatMessage, error)
}
