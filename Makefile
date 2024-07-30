build:
	docker compose -f docker-compose.local.yml up --build -d --remove-orphans

up:
	docker compose -f docker-compose.local.yml up -d

down:
	docker compose -f docker-compose.local.yml down

down-v:
	docker compose -f docker-compose.local.yml down -v

show-logs:
	docker compose -f docker-compose.local.yml logs

show-logs-backend:
	docker compose -f docker-compose.local.yml logs backend

show-logs-frontend:
	docker compose -f docker-compose.local.yml logs frontend

user:
	docker run --rm mern-invoice-backend whoami

volume:
	docker volume inspect mern-invoice_mongodb-data