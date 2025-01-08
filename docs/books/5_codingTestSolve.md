# 코딩테스트 대비 문제풀이

## 1. Two Sum

<details>
  <summary>문제 보기</summary>

**문제 설명**

정수 배열 nums와 정수 target이 주어질 때, 합이 target이 되는 두 숫자의 인덱스를 반환하세요.

- 각 입력에는 정확히 하나의 답이 있다고 가정할 수 있습니다.
- 동일한 요소를 두 번 사용할 수 없습니다.

답은 어떤 순서로든 반환해도 괜찮습니다.

**입출력 예**

Example 1:

Input: nums = [2,7,11,15], target = 9

Output: [0,1]

Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6

Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6

Output: [0,1]

**제한사항**

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- Only one valid answer exists.

**풀이**

1. 브루트 포스로 계산 - 모든 조합을 (시간 복잡도: O(N^2))
2. 투 포인터로 계산 - 정렬 후 양 끝에서 시작 (시간 복잡도: O(NlogN))
3. 해시 테이블로 계산 - 값을 저장하고 탐색 (시간 복잡도: O(N))

```javascript
// 브루트 포스로 계산 - 내 풀이
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// 투 포인터로 계산
function twoSum(nums, target) {
  // 원래 배열의 인덱스를 함께 저장
  const indexedNums = nums.map((num, index) => ({ value: num, index }));

  // 값 기준으로 정렬
  indexedNums.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = indexedNums.length - 1;

  while (left < right) {
    const sum = indexedNums[left].value + indexedNums[right].value;

    if (sum === target) {
      return [indexedNums[left].index, indexedNums[right].index];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// 해시 테이블로 계산
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
```

</details>

## 2. Contains Duplicate 2

<details>
  <summary>문제 보기</summary>

**문제 설명**

`정수 배열 nums와 정수 k가 주어질 때, 배열에서 두 개의 서로 다른 인덱스 i와 j가 존재하여 nums[i] == nums[j]이고, abs(i - j) <= k를 만족하면 true를 반환하세요.`

여기서 abs는 절대값을 의미합니다.

**입출력 예**

Example 1:

Input: nums = [1,2,3,1], k = 3

Output: true

Example 2:

Input: nums = [1,0,1,1], k = 1

Output: true

Example 3:

Input: nums = [1,2,3,1,2,3], k = 2

Output: false

**제한사항**

- `1 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`
- `0 <= k <= 105`

**풀이**

1. 브루트 포스로 계산 - 모든 조합을 (시간 복잡도: O(N^2))
2. 해시 테이블로 계산 - 값을 저장하고 탐색 (시간 복잡도: O(N))

```javascript
// 브루트 포스로 계산 - 내 풀이
function containsNearbyDuplicate(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && Math.abs(i - j) <= k) {
        return true;
      }
    }
  }

  return false;
}

// 해시 테이블로 계산
function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && Math.abs(map.get(nums[i]) - i) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}

// 해시 테이블 + 슬라이딩 윈도우로 계산
function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) return true;
    map.set(nums[i], i);

    if (map.size > k) {
      map.delete(nums[i - k]);
    }
  }

  return false;
}
```

</details>

## 3. valid palindrome

<details>
  <summary>문제 보기</summary>

**문제 설명**

문자열이 대소문자를 구분하지 않고, 알파벳과 숫자 외의 모든 문자를 제거한 후 앞에서 읽으나 뒤에서 읽으나 동일하다면, 해당 문자열은 **회문(palindrome)**입니다.

알파벳과 숫자는 영문자와 숫자를 포함합니다.

문자열 s가 주어질 때, 주어진 문자열이 회문이면 true, 아니면 false를 반환하세요.

**입출력 예**

Example 1:

Input: s = "A man, a plan, a canal: Panama"

Output: true

Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:

Input: s = "race a car"

Output: false

Explanation: "raceacar" is not a palindrome.

Example 3:

Input: s = " "

Output: true

Explanation: s is an empty string "" after removing
non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

**제한사항**

- `1 <= s.length <= 2 * 105`
- `s consists only of printable ASCII characters.`

**풀이**

1. 브루트 포스로 계산 - 문자열을 정제하고 비교 (시간 복잡도: O(N))
2. 투 포인터로 계산 - 문자열을 정제하고 양 끝에서 시작 (시간 복잡도: O(N))

```javascript
// 브루트 포스로 계산
function isPalindrome(s) {
  const refined = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return refined === refined.split("").reverse().join("");
}

// 투 포인터로 계산 - 내 풀이
function isPalindrome(s) {
  const refined = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let left = 0;
  let right = refined.length - 1;

  while (left < right) {
    if (refined[left] !== refined[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

</details>

## 4. valid anagram

<details>
  <summary>문제 보기</summary>

**문제 설명**

두 문자열 s와 t가 주어질 때, t가 s의 애너그램인지 확인하세요.

애너그램이란, 문자를 재배열하여 다른 뜻을 가진 단어로 바꾸는 것을 의미합니다.

**입출력 예**

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

**제한사항**

- `1 <= s.length, t.length <= 5 * 104`
- `s and t consist of lowercase English letters.`

**풀이**

1. 브루트 포스로 계산 - 문자열을 정렬하고 비교 (시간 복잡도: O(NlogN))
2. 해시 테이블로 계산 - 문자열을 저장하고 탐색 (시간 복잡도: O(N))

```javascript
// 브루트 포스로 계산 - 내 풀이
위의 코드를 가독성을 높이기 위해 아래와 같이 수정
function isAnagram(s, t) {
  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");
  return sortedS === sortedT;

}

// 해시 테이블로 계산
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
    map.set(t[i], (map.get(t[i]) || 0) - 1);
  }

  for (const value of map.values()) {
    if (value !== 0) return false;
  }

  return true;
}
```

</details>

## 5. best time to buy and sell stock

<details>
  <summary>문제 보기</summary>

**문제 설명**

정수 배열 prices가 주어질 때, i번째 요소가 i일에 주어진 주식의 가격을 나타냅니다.

한 번의 거래로 낼 수 있는 최대 이익을 계산하세요.

**입출력 예**

Example 1:

Input: prices = [7,1,5,3,6,4]

Output: 5

Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:

Input: prices = [7,6,4,3,1]

Output: 0

Explanation: In this case, no transactions are done and the max profit = 0.

**제한사항**

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

**풀이**

1. 브루트 포스로 계산 - 모든 조합을 (시간 복잡도: O(N^2))
2. 최솟값과 최댓값 계산 - 최솟값과 최댓값을 계산하고 차이를 구함 (시간 복잡도: O(N))

```javascript
// 브루트 포스로 계산 - 내 풀이
function maxProfit(prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
    }
  }

  return maxProfit;
}

// 최솟값과 최댓값 계산
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }

  return maxProfit;
}
```

</details>

## 6. 최대공약수와 최소공배수

<details>
  <summary>문제 보기</summary>

**문제 설명**

두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하세요.

**입출력 예**

입력: 첫째 줄에는 두 개의 자연수가 주어진다. 이 둘은 10,000이하의 자연수이며 사이에 한 칸의 공백이 주어진다.

출력: 첫째 줄에는 입력으로 주어진 두 수의 최대공약수를, 둘째 줄에는 입력으로 주어진 두 수의 최소공배수를 출력한다.

**풀이**

1. 유클리드 호제법으로 계산 - 최대공약수를 구하고 최소공배수를 계산 (시간 복잡도: O(logN)) -> 이걸로 푸는 지는 아는데, 공식 생각안나서 걍 풀이 보고 했음

```javascript
// 유클리드 호제법으로 계산
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function solution(n, m) {
  const g = gcd(n, m);
  const l = (n * m) / g;

  return [g, l];
}
```

</details>

## Stack & Queue 직접 구현하기

<details>
  <summary>스택 구현하기 </summary>

**스택(Stack)**

- 스택은 LIFO(Last In First Out) 구조로, 가장 최근에 추가된 요소가 가장 먼저 제거되는 자료구조입니다.

```javascript
class Stack {
  constructor() {
    this.stack = [];
  }

  // 스택에 요소 추가 > 추가될 요소를 스택의 맨 위에 추가
  push(item) {
    this.stack.push(item);
  }

  // 스택에서 요소 제거 > 스택의 맨 위에 있는 요소를 제거하고 반환
  pop() {
    return this.stack.pop();
  }

  // 스택의 맨 위에 있는 요소를 반환
  peek() {
    return this.stack[this.stack.length - 1];
  }

  // n번째 요소를 반환
  get(n) {
    return this.stack[n];
  }

  // 스택이 비어있는지 확인
  isEmpty() {
    return this.stack.length === 0;
  }
}
```

</details>

<details>
  <summary>큐 구현하기 </summary>

**큐(Queue)**

- 큐는 FIFO(First In First Out) 구조로, 가장 먼저 추가된 요소가 가장 먼저 제거되는 자료구조입니다.

```javascript
class Queue {
  constructor() {
    this.queue = [];
  }

  // 큐에 요소 추가 > 큐의 맨 뒤에 추가
  enqueue(item) {
    this.queue.push(item);
  }

  // 큐에서 요소 제거 > 큐의 맨 앞에 있는 요소를 제거하고 반환
  dequeue() {
    return this.queue.shift();
  }

  // 큐의 맨 앞에 있는 요소를 반환
  peek() {
    return this.queue[0];
  }

  // n번째 요소를 반환
  get(n) {
    return this.queue[n];
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    return this.queue.length === 0;
  }
}
```

</details>

## Queue와 Stack을 이용한 문제풀이

<details>
  <summary>문제 보기</summary>

**문제 설명**
프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

**제한 사항**

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

**입출력 예**

Example 1:

Input: progresses = [93, 30, 55], speeds = [1, 30, 5]

Output: [2, 1]

Example 2:

Input: progresses = [95, 90, 99, 99, 80, 99], speeds = [1, 1, 1, 1, 1, 1]

Output: [1, 3, 2]

```javascript
function solution(progresses, speeds) {
  const answer = [];
  const queue = new Queue();

  for (let i = 0; i < progresses.length; i++) {
    const remain = Math.ceil((100 - progresses[i]) / speeds[i]);
    queue.enqueue(remain);
  }

  while (!queue.isEmpty()) {
    let count = 1;
    const first = queue.dequeue();

    while (!queue.isEmpty() && first >= queue.peek()) {
      queue.dequeue();
      count++;
    }

    answer.push(count);
  }

  return answer;
}
```

</details>
