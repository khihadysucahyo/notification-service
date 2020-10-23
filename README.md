# Notification Service
Notification-service using GO, mongoDB, firebase.

[![Build Status](https://travis-ci.org/khihadysucahyo/notification-service.svg?branch=master)](https://travis-ci.org/khihadysucahyo/notification-service)
<a href="https://codeclimate.com/github/khihadysucahyo/notification-service/maintainability"><img src="https://api.codeclimate.com/v1/badges/8029a1447d94a6400680/maintainability" /></a>
<a href="https://codeclimate.com/github/khihadysucahyo/notification-service/test_coverage"><img src="https://api.codeclimate.com/v1/badges/8029a1447d94a6400680/test_coverage" /></a>

## Features
- GO
- MongoDB
- Firebase (Todo)

## Build
Build docker image
```
docker build -t khihadysucahyo/notification-service:latest . 
``` 
Run
```
docker run -p 7070:1213 -e DB_MONGO_HOST="mongo" -e APP_NAME="notification-service" --network=gateway khihadysucahyo/notification-service:latest
```

