package main

import (
	"fmt"

	controller "github.com/khihadysucahyo/notification-service/controllers"
	"github.com/khihadysucahyo/notification-service/routes"
	"github.com/khihadysucahyo/notification-service/utils"
	"github.com/labstack/echo/v4"
	"gopkg.in/mgo.v2"
)

func main() {
	e := echo.New()

	// Database connection
	uri := "mongodb://" + utils.GetEnv("DB_MONGO_HOST") + ":" + utils.GetEnv("DB_MONGO_PORT")
	fmt.Println(uri)
	db, err := mgo.Dial(uri)
	if err != nil {
		e.Logger.Fatal(err)
	}

	// Initializedbconfig
	c := &controller.Controller{DB: db}

	// routing
	apiGroup := e.Group("/api")
	routes.APIRoutes(apiGroup, c)
	routes.WEBRoutes(e)

	// listen port
	e.Logger.Fatal(e.Start(":1213"))
}
