package aaa

import (
	"log/slog"
	"time"
)       

type AAA struct {
}

func New(tokenTTL time.Duration, log *slog.Logger) (AAA, error) {
	return AAA{}, nil
}

func (a *AAA) Login(name, password string) (string, error) {

	return "", nil
}

func (a *AAA) Verify(tokenString string) error {

	return nil
}
