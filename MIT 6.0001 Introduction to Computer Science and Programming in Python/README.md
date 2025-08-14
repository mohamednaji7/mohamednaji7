# LeetCode Problem Mappings for MIT 6.0001 Problem Sets

**Introduction to Computer Science and Programming in Python**  
This is the [first course](https://github.com/ossu/computer-science/blob/master/coursepages/intro-cs/README.md) in the [OSSU Computer Science Curriculum](https://github.com/ossu/computer-science).  

- **Fall 2016 version** — 12 lectures, 6 problem sets  
  [MIT 6.0001 (Fall 2016) OCW page](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/)  

- **Fall 2022 version** — 26 lectures, 6 problem sets, more detailed content  
  [MIT 6.100L (Fall 2022) OCW page](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/)  

Below are mappings from MIT 6.0001 **(Fall 2016)** assignments to related LeetCode problems for targeted practice.


💡 Tip: I left out some of the harder problems that have a lower acceptance rate (e.g., LC 44: Wildcard Matching — AR = 30.3%, LC 211). You can also ignore problems that require a premium account.

## PS 0
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps0/) is a an intro.  


## PS 1  
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/mit6_0001f16_ps1/)

| Part | MIT Assignment | LeetCode Problem | Concept |
|------|----------------|------------------|---------|
| A | House Hunting | [1475. Final Prices With a Special Discount in a Shop](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/) | Iterative calculation with conditions |
| B | Saving with a Raise | [1603. Design Parking System](https://leetcode.com/problems/design-parking-system/) | State management with periodic updates |
| C | Finding the Right Amount (Bisection Search) | [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/) | Binary search to find target value |



## PS 2 — Hangman  
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps2/)

| Function | MIT Function | LeetCode Problem | Concept |
|----------|--------------|------------------|---------|
| 1A | `is_word_guessed` | [383. Ransom Note](https://leetcode.com/problems/ransom-note/) | Check if all letters from one string exist in another |
| 1B | `get_guessed_word` | [709. To Lower Case](https://leetcode.com/problems/to-lower-case/) | String building, char-by-char processing |
| 1C | `get_available_letters` | [448. Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) | Finding elements not in a collection |
| 2 | Main Game Loop | [348. Design Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe/) | Game state management |
| 3A | `match_with_gaps` | [44. Wildcard Matching](https://leetcode.com/problems/wildcard-matching/) | Pattern matching with wildcards |
| 3B | `show_possible_matches` | [1408. String Matching in an Array](https://leetcode.com/problems/string-matching-in-an-array/) | Filter array of strings by pattern |


## PS 3 — Word Game  
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps3/)

| Problem | MIT Task | LeetCode Problem | Concept |
|---------|----------|------------------|---------|
| 1 | Word Scores | [1309. Decrypt String from Alphabet to Integer Mapping](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/) | Char-to-value mapping |
| 2 | Dealing with Hands | [387. First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/) / [1002. Find Common Characters](https://leetcode.com/problems/find-common-characters/) | Dictionary ops & char counting |
| 3 | Valid Words | [383. Ransom Note](https://leetcode.com/problems/ransom-note/) | String formation from chars |
| 4 | Wildcards | [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Generating combinations |
| 5 | Playing a Hand | [1689. Partitioning Into Minimum Number Of Deci-Binary Numbers](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/) | Iterative process simulation |
| 6 | Playing a Game | [1275. Find Winner on a Tic Tac Toe Game](https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/) | Multi-round game state management |


## PS 4 — Permutations & Ciphers  
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/)  

| Part | MIT Assignment | LeetCode Problem | Concept |
|------|----------------|------------------|---------|
| A | String Permutations | [46. Permutations](https://leetcode.com/problems/permutations/) | Recursive permutation generation |
| B | Caesar Cipher | [1309. Decrypt String from Alphabet to Integer Mapping](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/) | Character shifting |
| C | Substitution Cipher | [890. Find and Replace Pattern](https://leetcode.com/problems/find-and-replace-pattern/) / [47. Permutations II](https://leetcode.com/problems/permutations-ii/) | Substitution mapping & constrained permutations |



## PS 5 — RSS Feed Filter (OOP)  
🔗 [Assignment Link](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps5/)



**Focus**: Object-oriented programming, inheritance, abstract classes, polymorphism

This problem set introduces object-oriented programming concepts through building an RSS feed filter system. Students implement various trigger classes that filter news stories based on different criteria.

### Key Concepts Practiced:
- **Class Design**: Creating classes with proper encapsulation
- **Inheritance**: Building class hierarchies with shared functionality  
- **Abstract Methods**: Defining interfaces that subclasses must implement
- **Polymorphism**: Using different trigger types through a common interface
- **String Processing**: Complex text parsing and matching algorithms
- **Composition**: Combining simple triggers into complex filtering logic

### Problem Breakdown:

| Problem | Description | Key Learning |
|---------|-------------|--------------|
| 1 | **NewsStory Class** | Basic class construction and getter methods |
| 2 | **PhraseTrigger (Abstract)** | Abstract base class, complex string matching algorithm |
| 3 | **TitleTrigger** | Inheritance, method override |
| 4 | **DescriptionTrigger** | More inheritance practice |
| 5 | **TimeTrigger (Abstract)** | Working with datetime objects, abstract classes |
| 6 | **Before/AfterTrigger** | Date comparison logic |
| 7 | **NotTrigger** | Composition pattern, negation logic |
| 8 | **AndTrigger** | Boolean AND logic with multiple triggers |
| 9 | **OrTrigger** | Boolean OR logic with multiple triggers |
| 10 | **filter_stories Function** | Applying triggers to filter data |
| 11 | **read_trigger_config** | File parsing, dynamic object creation |


### Related LeetCode Problems:
- [1603. Design Parking System](https://leetcode.com/problems/design-parking-system/) - Basic OOP design
- [146. LRU Cache](https://leetcode.com/problems/lru-cache/) - Advanced OOP patterns
- [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) - String matching
- [211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) - Abstract methods & polymorphism
<details>
<summary>more problems?</summary>

| Concept | MIT Task | LeetCode Problem | Concept Practiced |
|---------|----------|------------------|-------------------|
| OOP Design | Trigger Classes | [1603. Design Parking System](https://leetcode.com/problems/design-parking-system/) | Simple class with state |
| OOP Design | Trigger Classes | [1656. Design an Ordered Stream](https://leetcode.com/problems/design-an-ordered-stream/) | State management in classes |
| OOP Design | Trigger Classes | [146. LRU Cache](https://leetcode.com/problems/lru-cache/) | OOP patterns & caching |
| Abstract Methods & Polymorphism | Trigger Hierarchy | [211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Abstract method design & polymorphism |
| Game State Management | Trigger Variants | [348. Design Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe/) | Multi-class interaction |
| String Matching | `PhraseTrigger` | [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Basic substring search |
| String Processing | `PhraseTrigger` | [58. Length of Last Word](https://leetcode.com/problems/length-of-last-word/) | String parsing |
| String Processing | `PhraseTrigger` | [709. To Lower Case](https://leetcode.com/problems/to-lower-case/) | Case-insensitive processing |
| Complex String Parsing | Trigger Logic | [394. Decode String](https://leetcode.com/problems/decode-string/) | Recursive parsing |
| String Validation | Trigger Logic | [468. Validate IP Address](https://leetcode.com/problems/validate-ip-address/) | Multi-format validation |
| String Manipulation | Trigger Logic | [557. Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/) | Delimiter-based processing |
| Filtering & Transformation | `filter_stories` | [1929. Concatenation of Array](https://leetcode.com/problems/concatenation-of-array/) | Basic array transformation |
| Filtering & Transformation | `filter_stories` | [1431. Kids With the Greatest Number of Candies](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/) | Boolean filtering |
| Filtering with Criteria | `filter_stories` | [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | Frequency-based filtering |
| Complex Filtering Logic | `filter_stories` | [880. Decoded String at Index](https://leetcode.com/problems/decoded-string-at-index/) | Advanced filtering logic |
| Config Parsing | `read_trigger_config` | [385. Mini Parser](https://leetcode.com/problems/mini-parser/) | Parsing nested structures |
| Config Parsing | `read_trigger_config` | [636. Exclusive Time of Functions](https://leetcode.com/problems/exclusive-time-of-functions/) | Log parsing |
| Config Parsing | `read_trigger_config` | [722. Remove Comments](https://leetcode.com/problems/remove-comments/) | Comment removal logic |



</details>

### My Solution

- **Solution file:** [./PS5/ps5.py](./PS5/ps5.py)  
- **Tests:** [./PS5/ps5_test.py](./PS5/ps5_test.py)  
- **Pretty printing tests:** [./PS5/ps5_test-pretty.py](./PS5/ps5_test-pretty.py)  

### Current Progress:

**Status**: 🚧 In Progress
- ✅ **Problem 1**: NewsStory Class - Complete  
- ✅ **Problem 2**: PhraseTrigger - Complete
- ✅ **Problem 3**: TitleTrigger - Complete


**last tester (ps5_test-pretty.py) output**: 
```
🎓============================================================================🎓
🎯 MIT 6.0001 Problem Set 5: RSS Feed Filter Test Suite 🎯
🎓============================================================================🎓
📅 Test Run: 2025-08-15 01:11:19
🔧 Debug Output: OFF | Test Details: ON
🌟 Let's see how you're doing! 🌟

🧪 RUNNING TESTS...
──────────────────────────────
📋 Test Details:
────────────────────
  testNewsStoryConstructor (ps5_test.ProblemSet5NewsStory.testNewsStoryConstructor) ✅
  testNewsStoryGetGuid (ps5_test.ProblemSet5NewsStory.testNewsStoryGetGuid) ✅
  testNewsStoryGetLink (ps5_test.ProblemSet5NewsStory.testNewsStoryGetLink) ✅
  testNewsStoryGetTime (ps5_test.ProblemSet5NewsStory.testNewsStoryGetTime) ✅
  testNewsStoryGetTitle (ps5_test.ProblemSet5NewsStory.testNewsStoryGetTitle) ✅
  testNewsStoryGetdescription (ps5_test.ProblemSet5NewsStory.testNewsStoryGetdescription) ✅
  test1TitleTrigger (ps5_test.ProblemSet5.test1TitleTrigger) ✅
  test2DescriptionTrigger (ps5_test.ProblemSet5.test2DescriptionTrigger) ❌ ERROR
  test3BeforeAndAfterTrigger (ps5_test.ProblemSet5.test3BeforeAndAfterTrigger) ❌ ERROR
  test3altBeforeAndAfterTrigger (ps5_test.ProblemSet5.test3altBeforeAndAfterTrigger) ❌ ERROR
  test4NotTrigger (ps5_test.ProblemSet5.test4NotTrigger) ❌ ERROR
  test5AndTrigger (ps5_test.ProblemSet5.test5AndTrigger) ❌ ERROR
  test6OrTrigger (ps5_test.ProblemSet5.test6OrTrigger) ❌ ERROR
  test7FilterStories (ps5_test.ProblemSet5.test7FilterStories) ❌ ERROR
  test8FilterStories2 (ps5_test.ProblemSet5.test8FilterStories2) ❌ FAILED


🎉============================================================================🎉
📊 TEST RESULTS SUMMARY
🎉============================================================================🎉
┌──────────────────────────────────────────────────┐
│  📈 Total Tests:                              15 │
│  ✅ Passed:                                   7 │
│  ❌ Failed:                                   1 │
│  💥 Errors:                                   7 │
└──────────────────────────────────────────────────┘

💪 Progress: 46.7%
[🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜]

🔥 Getting started! Every expert was once a beginner! 🔥

⚡ Tests completed in 0.03 seconds
💡 Run with --debug to see detailed debug output
🎓============================================================================🎓

💪 Keep coding! Use the error details above to fix issues! 💪
➜  PS5 git:(main) ✗ 
```