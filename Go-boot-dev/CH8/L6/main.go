package main

func getMessageCosts(messages []string) []float64 {
	// ?
	costs := make([]float64, len(messages))
	for i, message := range messages {
		costs[i] = 0.01 * float64(len(message))
	}
	return costs
}
