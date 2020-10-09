package controller

import (
	"gopkg.in/mgo.v2"
)

type (
	// Controller config
	Controller struct {
		DB *mgo.Session
	}
)

const (
	// Key (Should come from somewhere else).
	Key = "secret"
)
