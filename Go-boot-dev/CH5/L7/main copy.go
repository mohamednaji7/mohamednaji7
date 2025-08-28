//go:build ignore
// +build ignore

package main

func (e email) cost() int {
	// ?
}

func (e email) format() string {
	// ?
}

type expense interface {
	cost() int
}

type formatter interface {
	format() string
}

type email struct {
	isSubscribed bool
	body         string
}
