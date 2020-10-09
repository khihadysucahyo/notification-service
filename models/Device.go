package model

import (
	"gopkg.in/mgo.v2/bson"
)

// Device schema
type Device struct {
	ID          bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID      string        `json:"userId,omitempty" bson:"userId,omitempty" binding:"required"`
	AppID       string        `json:"appId,omitempty" bson:"appId,omitempty" binding:"required"`
	DeviceToken string        `json:"deviceToken,omitempty" bson:"deviceToken,omitempty" binding:"required"`
}
