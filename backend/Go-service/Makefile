.PHONY: help build run test lint clean up down logs

help:
	@echo "Available commands:"
	@echo "  make build          - Build Go service"
	@echo "  make run            - Run service locally"
	@echo "  make test           - Run tests"
	@echo "  make lint           - Run linter"
	@echo "  make fmt            - Format code"
	@echo "  make up             - Start all services with docker-compose"
	@echo "  make down           - Stop all services"
	@echo "  make logs           - View service logs"
	@echo "  make clean          - Clean build artifacts"

build:
	go build -o bin/api ./api/main.go

run:
	go run ./api/main.go -config api/config.yaml

test:
	go test -v -cover ./...

lint:
	golangci-lint run -E gocritic -v ./...

fmt:
	go fmt ./...
	vcs goimports -w .

up:
	docker-compose up --build -d

down:
	docker-compose down

logs:
	docker-compose logs -f go_service

clean:
	rm -rf bin/
	go clean

docker-clean:
	docker-compose down -v
