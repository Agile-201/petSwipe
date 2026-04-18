package db

import (
	"context"
	"database/sql"
	"fmt"
	"hackaton/api/core"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetByID(ctx context.Context, id int64) (*core.User, error) {
	var user core.User
	var (
		nickname  sql.NullString
		bio       sql.NullString
		avatarURL sql.NullString
	)
	query := `SELECT id, email, password_hash, role, nickname, bio, avatar_url, created_at, updated_at FROM users WHERE id = $1`
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&nickname,
		&bio,
		&avatarURL,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if nickname.Valid {
		user.Nickname = &nickname.String
	}
	if bio.Valid {
		user.Bio = &bio.String
	}
	if avatarURL.Valid {
		user.AvatarURL = &avatarURL.String
	}
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*core.User, error) {
	var user core.User
	var (
		nickname  sql.NullString
		bio       sql.NullString
		avatarURL sql.NullString
	)
	query := `SELECT id, email, password_hash, role, nickname, bio, avatar_url, created_at, updated_at FROM users WHERE email = $1`
	err := r.db.QueryRowContext(ctx, query, email).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&nickname,
		&bio,
		&avatarURL,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if nickname.Valid {
		user.Nickname = &nickname.String
	}
	if bio.Valid {
		user.Bio = &bio.String
	}
	if avatarURL.Valid {
		user.AvatarURL = &avatarURL.String
	}
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) Create(ctx context.Context, email, passwordHash, role string) (*core.User, error) {
	var user core.User
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	query := `INSERT INTO users (email, password_hash, role, created_at, updated_at)
			VALUES ($1, $2, $3, NOW(), NOW())
			RETURNING id, email, password_hash, role, created_at, updated_at`

	err = tx.QueryRowContext(ctx, query, email, passwordHash, role).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) Update(ctx context.Context,id int64,nickname, bio, avatarURL *string) (*core.User, error){
	query := `UPDATE users SET nickname = $1, bio = $2, avatar_url = $3, updated_at = NOW() 
	          WHERE id = $4 
	          RETURNING id, email, password_hash, role, nickname, bio, avatar_url, created_at, updated_at`

	var user core.User
	err := r.db.QueryRowContext(ctx, query, nickname, bio, avatarURL, id).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.Nickname,
		&user.Bio,
		&user.AvatarURL,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}
