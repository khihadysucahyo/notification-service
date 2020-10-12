package routes

import (
	"net/http"

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
func WEBRoutes(e *echo.Echo) {
	e.GET("/", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, utils.GetEnv("APP_NAME"))
	})
}
