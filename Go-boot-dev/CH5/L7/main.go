package main

import "fmt"

func (e email) cost() int {
	// ?
	if !e.isSubscribed {
		return len(e.body) * 5
	} else {
		return len(e.body) * 2
	}
}

func (e email) format() string {
	// ?
	subscribedStr := ""
	if e.isSubscribed {
		subscribedStr = "Subscribed"
	} else {
		subscribedStr = "Not Subscribed"
	}
	return fmt.Sprintf("'%s' | %s", e.body, subscribedStr)
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
