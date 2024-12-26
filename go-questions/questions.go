package main

import (
    "fmt"
    "sort"
    "strings"
)

// countA returns the number of 'a' characters in a word
func countA(word string) int {
    return strings.Count(word, "a")
}

// sortWords sorts words by the number of 'a' characters (decreasing order)
// by length if the number of 'a' characters is the same, and lexicographically if lengths are the same
func sortWords(words []string) []string {
    sort.Slice(words, func(i, j int) bool {
        countA_i := countA(words[i])
        countA_j := countA(words[j])
        if countA_i == countA_j {
            if len(words[i]) == len(words[j]) {
                return words[i] < words[j]
            }
            return len(words[i]) > len(words[j])
        }
        return countA_i > countA_j
    })
    return words
}

// generateSequence is a recursive function that generates the specified output
func generateSequence(n int) []int {
    // Base case: if n is less than or equal to 1, return an empty slice
    if n < 2 {
        return []int{}
    }

    // Recursive case: generate the sequence for n/2
    seq := generateSequence(n / 2)

    // Append the current number if it's even or if it's the original number
    if n%2 == 0 {
        seq = append(seq, n)
    } else {
        seq = append(seq, n)
    }

    return seq
}

// mostRepeated finds the most repeated string in the given slice
func mostRepeated(words []string) string {
    wordCount := make(map[string]int)
    maxCount := 0
    var mostRepeatedWord string

    for _, word := range words {
        wordCount[word]++
        if wordCount[word] > maxCount {
            maxCount = wordCount[word]
            mostRepeatedWord = word
        }
    }

    return mostRepeatedWord
}

func main() {
    words := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}
    sortedWords := sortWords(words)
    fmt.Println("Sorted words:", sortedWords)

    // Call the function for Q2
    number := 9
    result := generateSequence(number)
    fmt.Println("Generated sequence:")
    for _, num := range result {
        fmt.Println(num)
    }

    // Call the function for Q3
    wordsForQ3 := []string{"apple", "pie", "apple", "red", "red", "red","apple","apple","apple"}
    mostRepeatedWord := mostRepeated(wordsForQ3)
    fmt.Println("Most repeated word:", mostRepeatedWord)
}