package routes

import (
	"net/http"

	controller "github.com/khihadysucahyo/notification-service/controllers"
	"github.com/khihadysucahyo/notification-service/utils"
	"github.com/labstack/echo/v4"
)

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
|
*/

// WEBRoutes route
func WEBRoutes(e *echo.Echo, c *controller.Controller) {
	e.GET("/", func(ctx echo.Context) error {

		res := map[string]interface{}{
			"app":     utils.GetEnv("APP_NAME"),
			"verison": utils.GetEnv("APP_VERSION"),
		}

		if c.DB == nil {
			res["errors"] = map[string]string{
				"mongodb": "Database connection failed.",
			}
		}

		return ctx.JSON(http.StatusOK, res)
	})
}
