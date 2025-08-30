package main

func isValidPassword(password string) bool {
	// ?
	if len(password) < 4 || 12 < len(password) {
		return false
	}
	hasDigit := false
	hasUpperCase := false
	for _, ch := range password {
		if '0' <= ch && ch <= '9' {
			hasDigit = true
		}
		if 'A' <= ch && ch <= 'Z' {
			hasUpperCase = true
		}

		if hasDigit && hasUpperCase {
			return true
		}
	}
	return false
}
