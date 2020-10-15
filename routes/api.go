package routes

import (
	controller "github.com/khihadysucahyo/notification-service/controllers"
	"github.com/labstack/echo/v4"
)

// APIRoutes route
func APIRoutes(e *echo.Group, c *controller.Controller) {
	// API Devices
	e.GET("/devices", c.DevicesList)
	e.POST("/devices", c.DevicesStore)
	e.PUT("/devices/:id", c.DevicesUpdate)
	e.GET("/devices/:id", c.DevicesDetail)
	e.DELETE("/devices/:id", c.DevicesDelete)

	// API Notifications
	e.POST("/notifications", c.Send)
}
