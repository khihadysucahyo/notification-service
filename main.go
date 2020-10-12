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
	db, err := mgo.Dial(utils.GetEnv("DB_MONGO_HOST"))
	if err != nil {
		e.Logger.Fatal(err)
	}

	fmt.Println("HAHA", utils.GetEnv("DB_MONGO_HOST"))

	// Initializedbconfig
	c := &controller.Controller{DB: db}
	fmt.Println(c)

	// routing
	apiGroup := e.Group("/api")
	routes.APIRoutes(apiGroup, c)
	routes.WEBRoutes(e)

	// listen port
	e.Logger.Fatal(e.Start(":1213"))
}
