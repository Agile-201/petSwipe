package aaa

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"time"

	"hackaton/api/core"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type CustomClaims struct {
	UserID int64  `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type AAA struct {
	secretKey []byte
	tokenTTL  time.Duration
	log       *slog.Logger
	userRepo  core.UserRepository
}

func New(secretKey string, tokenTTL time.Duration, log *slog.Logger, userRepo core.UserRepository) (AAA, error) {
	if secretKey == "" {
		return AAA{}, errors.New("secret key cannot be empty")
	}
	if userRepo == nil {
		return AAA{}, errors.New("user repository cannot be nil")
	}
	return AAA{
		secretKey: []byte(secretKey),
		tokenTTL:  tokenTTL,
		log:       log,
		userRepo:  userRepo,
	}, nil
}

func (a AAA) Login(ctx context.Context, email, password string) (string, error) {
	user, err := a.userRepo.GetByEmail(ctx, email)
	if err != nil {
		a.log.WarnContext(ctx, "user not found", "email", email)
		return "", fmt.Errorf("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		a.log.WarnContext(ctx, "invalid password", "email", email)
		return "", fmt.Errorf("invalid credentials")
	}

	now := time.Now()
	claims := CustomClaims{
		UserID: user.ID,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(a.tokenTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(a.secretKey)
	if err != nil {
		a.log.ErrorContext(ctx, "failed to sign token", "error", err)
		return "", err
	}

	a.log.InfoContext(ctx, "user logged in successfully", "user_id", user.ID)
	return tokenString, nil
}

func (a AAA) Verify(tokenString string) (int64, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return a.secretKey, nil
	})

	if err != nil {
		return 0, fmt.Errorf("token parsing failed: %w", err)
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return 0, errors.New("invalid token")
	}

	return claims.UserID, nil
}

func (a AAA) GetUserByEmail(ctx context.Context, email string) (*core.User, error) {
	return a.userRepo.GetByEmail(ctx, email)
}

func (a AAA) CreateUser(ctx context.Context, email, passwordHash, role string) (*core.User, error) {
	user, err := a.userRepo.Create(ctx, email, passwordHash, role)
	if err != nil {
		a.log.ErrorContext(ctx, "failed to create user", "error", err)
		return nil, err
	}

	a.log.InfoContext(ctx, "user created successfully", "user_id", user.ID)
	return user, nil
}
