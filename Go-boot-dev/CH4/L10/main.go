package main

type User struct {
	Name string
	Membership
}
type Membership struct {
	Type             string
	MessageCharLimit int
}

func newUser(name string, membershipType string) User {
	// ?
	messageCharLimit := 100
	if membershipType == "premium" {
		messageCharLimit = 1000
	}
	user := User{
		Name: name,
		Membership: Membership{
			Type:             membershipType,
			MessageCharLimit: messageCharLimit,
		},
	}
	return user
}
