package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// MessageNotification schema
type MessageNotification struct {
	ID        bson.ObjectId          `json:"_id,omitempty" bson:"_id,omitempty"`
	Tag       string                 `json:"tag,omitempty" bson:"tag,omitempty" binding:"required"`
	Message   string                 `json:"message,omitempty" bson:"message,omitempty" binding:"required"`
	CreatedBy map[string]interface{} `json:"createdBy,omitempty" bson:"createdBy,omitempty" binding:"required"`
	CreatedAt time.Time              `json:"createdAt,omitempty" bson:"createdAt,omitempty" binding:"required"`
}
