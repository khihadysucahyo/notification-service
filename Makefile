ENV_FILE_EXAMPLE=.env.example
DOCKER_COMPOSE=docker-compose
CONTAINER_NAME=api

copy-env:
	cp $(ENV_FILE_EXAMPLE) .env

run:
	[ -f .env ] || make copy-env
	$(DOCKER_COMPOSE) up --build

stop:
	$(DOCKER_COMPOSE) down

prune:
	$(DOCKER_COMPOSE) down --volumes

.PHONY: test
test:
	$(DOCKER_COMPOSE) run --rm api npm run test -- --silent
