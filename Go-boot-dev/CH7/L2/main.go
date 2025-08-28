package main

func maxMessages(thresh int) int {
	// ?

	// totalCost := 0
	// i := -1
	// for ; totalCost <= thresh; i++ {
	// 	totalCost += (i + 100)
	// }
	// return i
	totalCost := 0
	for i := 0; ; i++ {
		totalCost += (i + 100)
		if totalCost > thresh {
			return i
		}
	}
}
