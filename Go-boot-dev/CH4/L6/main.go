package main

type authenticationInfo struct {
	username string
	password string
}

// create the method below
func (i authenticationInfo) getBasicAuth() string {
	return "Authorization: Basic " +  i.username + ":" + i.password
}