package test

import (
	"testing"

	"github.com/joho/godotenv"
)

// TestEnv test
func TestEnv(t *testing.T) {
	err := godotenv.Load("../.env")
	if err != nil {
		t.Error("Error loading env file: ", err)
	}
}
