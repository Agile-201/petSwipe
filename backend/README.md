# PetSwipe Backend 🐾

Микросервисная архитектура приложения для поиска, управления и общения о домашних животных.

## Обзор

PetSwipe Backend представляет собой микросервисную архитектуру, состоящую из:

- **Go Service** - управление пользователями, аутентификацией и чатом
- **C++ Service** - управление питомцами и системой "свайпов"
- **PostgreSQL** - основная база данных
- **Nginx** - reverse proxy для маршрутизации запросов
- **PgAdmin** - Web UI для управления БД

### Ключевые характеристики

Масштабируемая микросервисная архитектура  
Docker Compose для локальной разработки  
JWT-токены для аутентификации  
Полная интеграция с PostgreSQL  
CORS поддержка для фронтенда  
Health checks для всех сервисов  

## API Endpoints

### Go Service (управление пользователями, аутентификация, чат)

**Маршруты через Nginx: `/api/auth/*`, `/api/chat/*`, `/api/users/*`, `/api/ping`**

| `POST` | `/api/auth/register` | Регистрация пользователя | no |
| `POST` | `/api/auth/login` | Вход пользователя | no |
| `GET` | `/api/auth/profile` | Получить профиль | Yes JWT |
| `GET` | `/api/ping` | Проверка здоровья сервиса | no|
| `GET` | `/api/chat/messages` | Получить сообщения чата | Yes JWT |
| `POST` | `/api/chat/send` | Отправить сообщение | Yes JWT |
| `GET` | `/api/users/:id` | Получить данные пользователя | no |

### C++ Service (управление питомцами и свайпами)

**Маршруты через Nginx: `/api/pets/*`, `/api/swipes/*`, `/api/feed`**

| `GET` | `/api/pets/list` | Список всех питомцев | no |
| `POST` | `/api/pets/create` | Создать питомца | Yes JWT |
| `GET` | `/api/pets/:id` | Получить питомца | no |
| `PUT` | `/api/pets/:id` | Обновить питомца | Yes JWT |
| `DELETE` | `/api/pets/:id` | Удалить питомца | Yes JWT |
| `POST` | `/api/swipes/like` | "Лайк" питомцу | Yes JWT |
| `POST` | `/api/swipes/dislike` | Отклонить питомца | Yes JWT |
| `GET` | `/api/feed` | Получить ленту питомцев | Yes
### Shared Endpoints

`GET`  `/health` | Проверка Gateway 


### Файл compose.yaml

Основной файл конфигурации Docker Compose с определением всех сервисов:

- **Сервисы**: postgres, go_service, cpp_service, nginx, pgadmin
- **Сетевые политики**: Все сервисы на одной сети `petswipe`
- **Health checks**: Для postgres и go_service
- **Порты**: Локально доступны 8000 (Nginx), 8080 (Go), 5432 (БД), 5050 (PgAdmin)

### Файл nginx.conf

Конфигурация reverse proxy:

```nginx
# Go Service routes
/api/auth/    → go_service:8080
/api/chat/    → go_service:8080
/api/users/   → go_service:8080
/api/ping     → go_service:8080

# C++ Service routes
/api/pets/    → cpp_service:8081
/api/swipes/  → cpp_service:8081
/api/feed     → cpp_service:8081

# Gateway health
/health       → "Gateway OK"
```


