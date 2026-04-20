package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"hackaton/api/adapters/aaa"
	"hackaton/api/adapters/db"
	"hackaton/api/adapters/rest"
	"hackaton/api/adapters/rest/middleware"
	"hackaton/api/config"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	var configPath string
	flag.StringVar(&configPath, "config", "config.yaml", "server configuration file")
	flag.Parse()

	cfg := config.MustLoad(configPath)

	log := mustMakeLogger(cfg.LogLevel)

	log.Info("starting server")
	log.Debug("debug messages are enabled")

	dbConn, err := initDatabase(log, cfg.DatabaseURL)
	if err != nil {
		log.Error("failed to initialize database", "error", err)
		os.Exit(1)
	}
	defer dbConn.Close()

	userRepo := db.NewUserRepository(dbConn)
	chatRepo := db.NewChatRepository(dbConn)

	authenticator, err := aaa.New(cfg.JWTSecret, cfg.TokenTTL, log, userRepo)
	if err != nil {
		log.Error("failed to create authenticator", "error", err)
		os.Exit(1)
	}

	authMiddleware := middleware.Auth(authenticator)
	profileHandler := authMiddleware(rest.NewProfileHandler(log, userRepo))
	updateProfileHandler := authMiddleware(rest.NewUpdateProfileHandler(log, userRepo))
	chatHandler := authMiddleware(rest.NewChatHandler(log, chatRepo))
	sendMessageHandler := authMiddleware(rest.NewSendMessageHandler(log, chatRepo))

	mux := http.NewServeMux()

	mux.Handle("GET /health", rest.NewHealthcheck())
	mux.Handle("GET /metrics", rest.NewMetricsHandler())
	mux.Handle("GET /api/ping", rest.NewPingHandler(log, make(map[string]interface{})))

	mux.Handle("POST /api/auth/login", rest.NewLoginHandler(log, authenticator))
	mux.Handle("POST /api/auth/register", rest.NewRegisterHandler(log, authenticator))

	mux.Handle("GET /api/auth/profile", profileHandler)
	mux.Handle("PUT /api/auth/profile", updateProfileHandler)
	mux.Handle("GET /api/chat/messages", chatHandler)
	mux.Handle("POST /api/chat/send", sendMessageHandler)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	handler := middleware.WithMetrics(mux)
	handler = middleware.CORS(handler)

	server := http.Server{
		Addr:        cfg.HTTPConfig.Address,
		ReadTimeout: cfg.HTTPConfig.Timeout,
		Handler:     handler,
		BaseContext: func(_ net.Listener) context.Context { return ctx },
	}

	go func() {
		<-ctx.Done()
		log.Debug("shutting down server")
		ctxShutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := server.Shutdown(ctxShutdown); err != nil {
			log.Error("erroneous shutdown", "error", err)
		}
	}()

	log.Info("Running HTTP server", "address", cfg.HTTPConfig.Address)
	if err := server.ListenAndServe(); err != nil {
		if !errors.Is(err, http.ErrServerClosed) {
			log.Error("server closed unexpectedly", "error", err)
			os.Exit(1)
		}
	}
}

func initDatabase(log *slog.Logger, dbURL string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}

	log.Info("database connected")
	return db, nil
}

func mustMakeLogger(logLevel string) *slog.Logger {
	var level slog.Level
	switch logLevel {
	case "DEBUG":
		level = slog.LevelDebug
	case "INFO":
		level = slog.LevelInfo
	case "ERROR":
		level = slog.LevelError
	default:
		panic("unknown log level: " + logLevel)
	}
	handler := slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: level, AddSource: true})
	return slog.New(handler)
}
