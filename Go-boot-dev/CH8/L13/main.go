package main

func createMatrix(rows, cols int) [][]int {
	// ?
	output := make([][]int, rows)
	for i := range rows {
		// row := [cols]int{}
		row := make([]int, cols)
		for j := range cols {
			row[j] = i * j
		}
		output[i] = row
	}
	return output
}
