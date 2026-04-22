# PetSwipe Backend 🐾

## Обзор

PetSwipe Backend представляет собой микросервисную архитектуру, состоящую из:

- **Go Service** - управление пользователями, аутентификацией и чатом
- **C++ Service** - управление питомцами и системой "свайпов"
- **PostgreSQL** - основная база данных
- **Nginx** - reverse proxy для маршрутизации запросов
- **PgAdmin** - Web UI для управления БД

### Ключевые характеристики

Масштабируемая микросервисная архитектура  
JWT-токены для аутентификации  
Полная интеграция с PostgreSQL  
CORS поддержка для фронтенда  
Health checks для всех сервисов  

## API Endpoints

### Go Service (управление пользователями, аутентификация, чат)

**Маршруты через Nginx: `/api/auth/*`, `/api/chat/*`, `/api/users/*`, `/api/ping`**

1. `POST` | `/api/auth/register` | Регистрация пользователя | no JWT|
2. `POST` | `/api/auth/login` | Вход пользователя | no JWT|
3. `GET` | `/api/auth/profile` | Получить профиль | Yes JWT |
4. `GET` | `/api/ping` | Проверка здоровья сервиса | no JWT|
5. `GET` | `/api/chat/messages` | Получить сообщения чата | Yes JWT |
6. `POST` | `/api/chat/send` | Отправить сообщение | Yes JWT |
7. `GET` | `/api/users/:id` | Получить данные пользователя | no JWT|

### C++ Service (управление питомцами и свайпами)

**Маршруты через Nginx: `/api/pets/*`, `/api/swipes/*`, `/api/feed`**

1. `GET` | `/api/pets/list` | Список всех питомцев | no JWT|
2. `POST` | `/api/pets/create` | Создать питомца | Yes JWT |
3. `GET` | `/api/pets/:id` | Получить питомца | no JWT|
4. `PUT` | `/api/pets/:id` | Обновить питомца | Yes JWT |
5. `DELETE` | `/api/pets/:id` | Удалить питомца | Yes JWT |
6. `POST` | `/api/swipes/like` | "Лайк" питомцу | Yes JWT |
7. `POST` | `/api/swipes/dislike` | Отклонить питомца | Yes JWT |
8. `GET` | `/api/feed` | Получить ленту питомцев | Yes JWT
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


