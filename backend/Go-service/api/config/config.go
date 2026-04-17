package config

import (
	"log/slog"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
)

type HTTPConfig struct {
	Address string        `yaml:"address" env:"API_ADDRESS" env-default:"localhost:80"`
	Timeout time.Duration `yaml:"timeout" env:"API_TIMEOUT" env-default:"5s"`
}

type Config struct {
	LogLevel          string        `yaml:"log_level" env:"LOG_LEVEL" env-default:"DEBUG"`
	SearchConcurrency int           `yaml:"search_concurrency" env:"SEARCH_CONCURRENCY" env-default:"1"`
	SearchRate        int           `yaml:"search_rate" env:"SEARCH_RATE" env-default:"1"`
	HTTPConfig        HTTPConfig    `yaml:"api_server"`
	TokenTTL          time.Duration `yaml:"token_ttl" env:"TOKEN_TTL" env-default:"24h"`
}

func MustLoad(configPath string) Config {
	var cfg Config
	if configPath != "" {
		if err := cleanenv.ReadConfig(configPath, &cfg); err != nil {
			slog.Error("cannot read config", "err", err)
		}
	} else {
		if err := cleanenv.ReadEnv(&cfg); err != nil {
			slog.Error("read env failed", "err", err)
		}
	}
	return cfg
}
