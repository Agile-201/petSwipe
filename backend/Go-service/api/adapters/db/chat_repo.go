package db

import (
	"context"
	"database/sql"
	"fmt"
	"sync"
	"time"

	"hackaton/api/core"
)

type ChatRepository struct {
	db       *sql.DB
	messages map[string][]*core.ChatMessage
	mu       sync.RWMutex
}

func NewChatRepository(db *sql.DB) *ChatRepository {
	return &ChatRepository{
		db:       db,
		messages: make(map[string][]*core.ChatMessage),
	}
}

func (r *ChatRepository) GetMessages(ctx context.Context, senderID, receiverID int64, limit int) ([]*core.ChatMessage, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if limit == 0 {
		limit = 50 
	}
	if limit > 100 {
		limit = 100 
	}

	key1 := fmt.Sprintf("%d_%d", senderID, receiverID)
	key2 := fmt.Sprintf("%d_%d", receiverID, senderID)

	var messages []*core.ChatMessage
	messages = append(messages, r.messages[key1]...)
	messages = append(messages, r.messages[key2]...)

	if len(messages) > limit {
		messages = messages[len(messages)-limit:]
	}

	return messages, nil
}

func (r *ChatRepository) SendMessage(ctx context.Context, senderID, receiverID int64, message string) (*core.ChatMessage, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	msg := &core.ChatMessage{
		ID:         int64(time.Now().UnixNano()),
		SenderID:   senderID,
		ReceiverID: receiverID,
		Message:    message,
		IsRead:     false,
		SentAt:     time.Now(),
	}

	key := fmt.Sprintf("%d_%d", senderID, receiverID)
	r.messages[key] = append(r.messages[key], msg)

	return msg, nil
}


