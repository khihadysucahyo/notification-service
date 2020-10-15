package controller

import (
	"net/http"

	model "github.com/khihadysucahyo/notification-service/models"
	"github.com/labstack/echo/v4"
	"gopkg.in/mgo.v2/bson"
)

// Send push notif based on ids token
func (c *Controller) Send(ctx echo.Context) (err error) {
	// Bind message notification payload
	m := &model.MessageNotification{ID: bson.NewObjectId()}
	if err = ctx.Bind(m); err != nil {
		return
	}

	// validate
	if m.Tag == "" || m.Message == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest}
	}

	return ctx.JSON(http.StatusCreated, m)
}
