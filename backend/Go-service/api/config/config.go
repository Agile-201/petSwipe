package config

import (
	"log"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
)

type HTTPConfig struct {
	Address string        `yaml:"address" env:"API_ADDRESS" env-default:"localhost:80"`
	Timeout time.Duration `yaml:"timeout" env:"API_TIMEOUT" env-default:"5s"`
}

type Config struct {
	LogLevel    string        `yaml:"log_level" env:"LOG_LEVEL" env-default:"DEBUG"`
	HTTPConfig  HTTPConfig    `yaml:"api_server"`
	TokenTTL    time.Duration `yaml:"token_ttl" env:"TOKEN_TTL" env-default:"24h"`
	JWTSecret   string        `yaml:"jwt_secret" env:"JWT_SECRET" env-default:"super_secret_key"`
	DatabaseURL string        `yaml:"database_url" env:"DATABASE_URL" env-default:"postgres://user:password@100.121.171.79:5432/hackathon?sslmode=disable"`
}

func MustLoad(configPath string) Config {
	var cfg Config
	if configPath != "" {
		if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
			log.Fatalf("read config failed: %v", err)
		}
	} else {
		if err := cleanenv.ReadEnv(&cfg); err != nil {
			log.Fatalf("read env failed: %v", err)
		}
	}
	return cfg
}
