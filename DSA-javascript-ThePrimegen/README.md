# ThePrimeagen Algorithms Course

## 📚 Course Overview

Algorithms course by **ThePrimeagen**. using typescript   <img src="https://go-skill-icons.vercel.app/api/icons?i=typescript" height="25"/> 


* Big O notation
* Search & sort algorithms
* Linked lists, queues, stacks
* Trees, heaps, tries, graphs, maps
* LRU cache & advanced problem solving

---

**Instructor:** [ThePrimeagen](https://x.com/ThePrimeagen) — *Try Harder™*  
[YouTube](https://www.youtube.com/ThePrimeagen), [Twitch](https://www.twitch.tv/ThePrimeagen)

**Links:**

* [Course Page on Frontend Masters](https://frontendmasters.com/courses/algorithms/)
* [Course Notes & Resources](https://theprimeagen.github.io/fem-algos)

---

## 📦 Setup Instructions

```bash
git clone https://github.com/ThePrimeagen/kata-machine.git
cd kata-machine
yarn install
yarn generate
```


## 🧪 How to Practice

Once you've set up your repo,  
1. navigate to the algo files 
    ```bash
    cd kata-machine/src/day1
    ```   
2. write your solution in the algo file e.g. `LinearSearchList.ts`  
3. run the tests for each exercise. For example,  
    ```bash
    npx jest LinearSearchList.ts
    ```

✅ Example output when passing:

```
 PASS  ../__tests__/LinearSearchList.ts
  ✓ linear search array (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.945 s
Ran all test suites matching /LinearSearchList.ts/i.
```
## ✅ My Progress

Here are the exercises I've completed so far with passing tests:

| Exercise            | Status  |
|--------------------|---------|
| LinearSearchList.ts | ✅ Passed |
| BinarySearchList.ts | ✅ Passed |
| BubbleSort.ts       | ✅ Passed |
| Stack.ts            | ✅ Passed |

<details>
<summary>📊 Detailed Test Results</summary>

### LinearSearchList.ts
```
➜  kata-machine git:(main) ✗ npx jest LinearSearchList.ts

 PASS  src/__tests__/LinearSearchList.ts
  ✓ linear search array (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.815 s, estimated 1 s
Ran all test suites matching /LinearSearchList.ts/i.
```

### BinarySearchList.ts
```
➜  kata-machine git:(main) ✗ npx jest BinarySearchList.ts
 PASS  src/__tests__/BinarySearchList.ts
  ✓ binary search array (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.016 s
Ran all test suites matching /BinarySearchList.ts/i.
```

### BubbleSort.ts
```
➜  kata-machine git:(main) ✗ npx jest BubbleSort.ts      
 PASS  src/__tests__/BubbleSort.ts
  ✓ bubble-sort (2 ms)
  ✓ bubble-sort / one element

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.992 s
Ran all test suites matching /BubbleSort.ts/i.
```

### Stack.ts
```
➜  kata-machine git:(main) ✗ npx jest Stack.ts     
 PASS  src/__tests__/Stack.ts
  ✓ stack (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.99 s, estimated 1 s
Ran all test suites matching /Stack.ts/i.
```

</details>