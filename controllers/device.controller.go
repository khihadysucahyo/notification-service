package controller

import (
	"fmt"
	"net/http"
	"strconv"

	model "github.com/khihadysucahyo/notification-service/models"
	"github.com/labstack/echo/v4"
	"gopkg.in/mgo.v2/bson"
)

// DevicesList GET
func (c *Controller) DevicesList(ctx echo.Context) (err error) {
	page, _ := strconv.Atoi(ctx.QueryParam("page"))
	limit, _ := strconv.Atoi(ctx.QueryParam("limit"))

	// Defaults
	if page == 0 {
		page = 1
	}
	if limit == 0 {
		limit = 100
	}

	// Retrieve posts from database
	devices := []*model.Device{}
	db := c.DB.Clone()
	if err = db.DB("notificationservice").C("devices").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		All(&devices); err != nil {
		return
	}
	defer db.Close()

	return ctx.JSON(http.StatusOK, devices)
}

// DevicesStore POST
func (c *Controller) DevicesStore(ctx echo.Context) (err error) {
	// Bind
	d := &model.Device{ID: bson.NewObjectId()}
	if err = ctx.Bind(d); err != nil {
		return
	}

	// Validate
	if d.UserID == "" || d.Token == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid UserID or DeviceToken"}
	}

	// Save user
	db := c.DB.Clone()
	defer db.Close()
	if err = db.DB("notificationservice").C("devices").Insert(d); err != nil {
		return
	}

	return ctx.JSON(http.StatusCreated, d)
}

// DevicesUpdate PUT
func (c *Controller) DevicesUpdate(ctx echo.Context) error {
	id := ctx.Param("id")
	data := fmt.Sprintf("devicesUpdate: %s", id)
	return ctx.String(http.StatusOK, data)
}

// DevicesDetail GET
func (c *Controller) DevicesDetail(ctx echo.Context) error {
	id := ctx.Param("id")
	data := fmt.Sprintf("DevicesDetail: %s", id)
	return ctx.String(http.StatusOK, data)
}

// DevicesDelete DELETE
func (c *Controller) DevicesDelete(ctx echo.Context) error {
	id := ctx.Param("id")
	data := fmt.Sprintf("DevicesDelete: %s", id)
	return ctx.String(http.StatusOK, data)
}
