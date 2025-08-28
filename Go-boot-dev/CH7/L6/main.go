package main

func countConnections(groupSize int) int {
	// ?
	num := 0
	for ; groupSize > 1; groupSize-- {
		num += groupSize - 1
	}
	return num
}
