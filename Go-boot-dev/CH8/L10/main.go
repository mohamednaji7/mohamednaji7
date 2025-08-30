package main

func sum(nums ...int) int {
	// ?
	total := 0
	for _, num := range nums {
		total += num
	}
	return total
}
