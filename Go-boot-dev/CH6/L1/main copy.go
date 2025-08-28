//go:build ignore
// +build ignore

package main

type divideError struct {
	dividend float64
}

// ?

func divide(dividend, divisor float64) (float64, error) {
	if divisor == 0 {
		return 0, divideError{dividend: dividend}
	}
	return dividend / divisor, nil
}
