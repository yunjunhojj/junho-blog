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

## 7. valid-parentheses

<details>
  <summary>문제 보기</summary>

**문제 설명**

괄호로 된 입력값이 올바른지 판별하세요.
열고 닫는 괄호의 순서가 올바르게 구성되어 있으면 true를 반환하고, 그렇지 않으면 false를 반환하세요.

**입출력 예**

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([)]"

Output: false

**풀이**

1. 스택으로 계산 - 여는 괄호를 스택에 추가하고 닫는 괄호를 만나면 스택에서 제거 (시간 복잡도: O(N))

```javascript
function isValid(s) {
  const stack = [];
  const map = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      const top = stack.length === 0 ? "#" : stack.pop();
      if (top !== map.get(s[i])) return false;
    } else {
      stack.push(s[i]);
    }
  }

  return stack.length === 0;
}
```

</details>

## 8. 다리를 지나는 트럭

<details>
  <summary>문제 보기</summary>

트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.

예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

경과 시간 다리를 지난 트럭 다리를 건너는 트럭 대기 트럭
0 [] [] [7,4,5,6]
1~2 [] [7] [4,5,6]
3 [7] [4] [5,6]
4 [7] [4,5] [6]
5 [7,4] [5] [6]
6~7 [7,4,5] [6] []
8 [7,4,5,6] [] []
따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

**제한 조건**

- bridge_length는 1 이상 10,000 이하입니다.
- weight는 1 이상 10,000 이하입니다.
- truck_weights의 길이는 1 이상 10,000 이하입니다.
- 모든 트럭의 무게는 1 이상 weight 이하입니다.

**입출력 예**

Example 1:

Input: bridge_length = 2, weight = 10, truck_weights = [7,4,5,6]

return: 8

Example 2:

Input: bridge_length = 100, weight = 100, truck_weights = [10]

return: 101

Example 3:

Input: bridge_length = 100, weight = 100, truck_weights = [10,10,10,10,10,10,10,10,10,10]

return: 110

```javascript
function solution(bridge_length, weight, truck_weights) {
  const bridge = Array(bridge_length).fill(0);
  let time = 0;

  while (bridge.length) {
    bridge.shift();
    time++;

    if (truck_weights.length) {
      const sum = bridge.reduce((acc, cur) => acc + cur, 0);
      if (sum + truck_weights[0] <= weight) {
        bridge.push(truck_weights.shift());
      } else {
        bridge.push(0);
      }
    }
  }

  return time;
}
```

</details>

## 9. 주식가격

<details>
  <summary>문제 보기</summary>

**문제 설명**

초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

**제한 조건**

- prices의 길이는 2 이상 100,000 이하입니다.
- prices의 각 가격은 1 이상 10,000 이하입니다.

**입출력 예**

Example 1:

Input: prices = [1, 2, 3, 2, 3]

Output: [4, 3, 1, 1, 0]

Explanation:

- 1초 시점의 ₩1은 끝까지 가격이 떨어지지 않아 4초간 가격이 떨어지지 않았습니다.
- 2초 시점의 ₩2은 끝까지 가격이 떨어지지 않아 3초간 가격이 떨어지지 않았습니다.
- 3초 시점의 ₩3은 1초까지 가격이 떨어지지 않아 1초간 가격이 떨어지지 않았습니다.
- 4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
- 5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.

```javascript
function solution(prices) {
  const answer = Array(prices.length).fill(0);

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[i] <= prices[j]) {
        answer[i]++;
      } else {
        answer[i]++;
        break;
      }
    }
  }

  return answer;
}
```

</details>

## 10. 프로세스

<details>
  <summary>문제 보기</summary>

**문제 설명**

1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.

예를들어, 프로세스 4개 [A, B, C, D]가 있고, 우선순위가 [2, 1, 3, 2]라면, 큐에는 [A, B, C, D]가 순서대로 대기중입니다. 이때, 프로세스를 실행하면 다음과 같은 순서로 실행됩니다.

1. 우선순위가 가장 높은 C가 실행됩니다. 큐에는 [A, B, D]가 남습니다.
2. 우선순위가 가장 높은 D가 실행됩니다. 큐에는 [A, B]가 남습니다.
3. 우선순위가 가장 높은 A가 실행됩니다. 큐에는 [B]가 남습니다.
4. 우선순위가 가장 높은 B가 실행됩니다. 큐에는 []가 남습니다.

따라서, 프로세스 실행 순서는 C -> D -> A -> B 입니다.

프로세스의 이름과 우선순위가 담긴 배열 priorities가 매개변수로 주어질 때, 프로세스 실행 순서를 return 하도록 solution 함수를 완성하세요.

**제한 조건**

- 프로세스의 개수는 1 이상 100 이하입니다.
- 우선순위는 1 이상 9 이하입니다.

```javascript
function solution(priorities, location) {
  let answer = 0;
  let queue = priorities.map((priority, index) => ({ priority, index }));

  while (queue.length) {
    const current = queue.shift();
    if (queue.some((item) => item.priority > current.priority)) {
      queue.push(current);
    } else {
      answer++;
      if (current.index === location) {
        break;
      }
    }
  }

  return answer;
}
```

</details>

## 11. 더 맵게

<details>
  <summary>문제 보기</summary>

**문제 설명**

매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

`섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)`

Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.

Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 완성해주세요.

**제한 조건**

- scoville의 길이는 2 이상 1,000,000 이하입니다.
- K는 0 이상 1,000,000,000 이하입니다.
- scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
- 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우 -1을 return 합니다.

**입출력 예**

Example 1:

Input: scoville = [1, 2, 3, 9, 10, 12], K = 7

Output: 2

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }

  getParentIdx(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }

  getLeftChildIdx(parentIdx) {
    return parentIdx * 2 + 1;
  }

  getRightChildIdx(parentIdx) {
    return parentIdx * 2 + 2;
  }

  heappop() {
    const heapSize = this.size();
    if (!heapSize) return null;
    if (heapSize === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbledown();
    return value;
  }

  heappush(value) {
    this.heap.push(value);
    this.bubbleup();

    return this.heap;
  }

  bubbleup() {
    let child = this.size() - 1;
    let parent = this.getParentIdx(child);

    while (this.heap[child] < this.heap[parent]) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParentIdx(parent);
    }
  }

  bubbledown() {
    let parent = 0;
    let leftChild = this.getLeftChildIdx(parent);
    let rightChild = this.getRightChildIdx(parent);

    while (
      (leftChild <= this.size() - 1 &&
        this.heap[leftChild] < this.heap[parent]) ||
      (rightChild <= this.size() - 1 &&
        this.heap[rightChild] < this.heap[parent])
    ) {
      if (
        rightChild <= this.size() - 1 &&
        this.heap[leftChild] > this.heap[rightChild]
      ) {
        this.swap(parent, rightChild);
        parent = rightChild;
      } else {
        this.swap(parent, leftChild);
        parent = leftChild;
      }
      leftChild = this.getLeftChildIdx(parent);
      rightChild = this.getRightChildIdx(parent);
    }
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.forEach((value) => heap.heappush(value));

  let count = 0;
  while (heap.size() > 1 && heap.heap[0] < K) {
    const first = heap.heappop();
    const second = heap.heappop();
    heap.heappush(first + second * 2);
    count++;
  }

  return heap.heap[0] < K ? -1 : count;
}
```

</details>

**재귀(Recursion)**

> 함수가 자기 자신을 다시 호출하여 문제를 단계적으로 해결하는 기법이다. 보통 더 이상 분할이 어려운 매우 작은 단위(재귀의 종료 조건, base case)에 도달하면 결과값을 반환하고, 재귀 호출 스택을 거슬러 올라가며 최종 결과를 구한다

## 12. 팩토리얼 (백준 10872)

<details>
  <summary>문제 보기</summary>

**문제 개요**

자연수 N이 주어졌을 때, N! 값을 재귀 함수를 이용해 구하는 문제다.
• N! = N × (N-1) × (N-2) × … × 2 × 1
• 재귀 종료 조건(base case)은 N = 0 일 때, 1을 반환하도록 한다(수학적으로 0! = 1).

**재귀 구현 예시 (TypeScript)**

```typescript
function factorial(n: number): number {
  if (n <= 1) {
    return 1; // base case
  }
  return n * factorial(n - 1);
}

// 입력값 예시:
const input: number = 5;
console.log(factorial(input)); // 120
```

</details>

## 13. 피보나치 수 (백준 10870)

<details>
  <summary>문제 보기</summary>

**문제 개요**

피보나치 수열은 다음과 같이 정의된다:
• F(0) = 0, F(1) = 1
• F(n) = F(n-1) + F(n-2) (n ≥ 2)

주어진 n에 대해 F(n)을 재귀로 계산하는 문제다.

**재귀 구현 예시 (TypeScript)**

```typescript
function fibonacci(n: number): number {
  if (n < 2) {
    return n; // base case: n이 0 또는 1
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 입력값 예시:
const inputFibo: number = 5;
console.log(fibonacci(inputFibo));
```

</details>

## 14. 재귀의 귀재 (백준 25501)

<details>
  <summary>문제 보기</summary>

**문제 개요**

주어진 문자열이 팰린드롬(앞뒤가 같은 문자열)인지 재귀 함수를 통해 판별하는 문제로 알려져 있다. 또한, 재귀 호출 횟수를 함께 출력하는 요구사항이 있다.

**예시 요구사항**
• isPalindrome 함수를 정의한다. (문자열과 현재 재귀 호출 횟수를 추적)
• 팰린드롬 여부와 함께 재귀 호출 횟수도 출력해야 할 수 있다.

**재귀 구현 예시 (TypeScript)**

```typescript
let callCount = 0;

function recursion(s: string, left: number, right: number): number {
  callCount++;

  if (left >= right) {
    return 1; // 팰린드롬이다
  } else if (s[left] !== s[right]) {
    return 0; // 팰린드롬이 아니다
  } else {
    return recursion(s, left + 1, right - 1);
  }
}

function isPalindrome(s: string): number {
  callCount = 0; // 매 호출 때마다 횟수 리셋
  return recursion(s, 0, s.length - 1);
}

// 입력값 예시:
const inputString: string = "ABBA";
const result = isPalindrome(inputString);

console.log(result); // 1 (팰린드롬)
console.log(callCount); // 재귀 호출 횟수 예: 3
```

</details>

## 15. 암호 만들기

<details>
  <summary>문제 보기</summary>

**문제 개요**

바로 어제 최백준 조교가 방 열쇠를 주머니에 넣은 채 깜빡하고 서울로 가 버리는 황당한 상황에 직면한 조교들은, 702호에 새로운 보안 시스템을 설치하기로 하였다. 이 보안 시스템은 열쇠가 아닌 암호로 동작하게 되어 있는 시스템이다.

암호는 서로 다른 L개의 알파벳 소문자들로 구성되며 최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성되어 있다고 알려져 있다. 또한 정렬된 문자열을 선호하는 조교들의 성향으로 미루어 보아 암호를 이루는 알파벳이 암호에서 증가하는 순서로 배열되었을 것이라고 추측된다. 즉, abc는 가능성이 있는 암호이지만 bac는 그렇지 않다.

새 보안 시스템에서 조교들이 암호로 사용했을 법한 문자의 종류는 C가지가 있다고 한다. 이 알파벳을 입수한 민식, 영식 형제는 조교들의 방에 침투하기 위해 암호를 추측해 보려고 한다. C개의 문자들이 모두 주어졌을 때, 가능성 있는 암호들을 모두 구하는 프로그램을 작성하시오.

**입력**

첫째 줄에 두 정수 L, C가 주어진다. (3 ≤ L ≤ C ≤ 15) 다음 줄에는 C개의 문자들이 공백으로 구분되어 주어진다. 주어지는 문자들은 알파벳 소문자이며, 중복되는 것은 없다.

**출력**

각 줄에 하나씩, 사전식으로 가능성 있는 암호를 모두 출력한다.

**예시 입력**

```
4 6
a t c i s w
```

**예시 출력**

```
acis
acit
aciw
acst
acsw
actw
aist
aisw
aitw
astw
cist
cisw
citw
istw
```

**풀이**

1. 재귀로 구현 - 가능성 있는 암호를 모두 출력

```javascript
function solution(L, C, characters) {
  // 문자들을 사전순(오름차순)으로 정렬
  characters.sort();

  const result = [];
  const vowels = ["a", "e", "i", "o", "u"];

  function recursion(start, password) {
    // 암호가 L 길이에 도달했을 때 모음·자음 개수 검증
    if (password.length === L) {
      let vowelCount = 0;
      let consonantCount = 0;

      for (let i = 0; i < L; i++) {
        if (vowels.includes(password[i])) {
          vowelCount++;
        } else {
          consonantCount++;
        }
      }

      if (vowelCount >= 1 && consonantCount >= 2) {
        // 조건을 만족하면 결과 배열에 추가
        result.push(password.join(""));
      }
      return;
    }

    // start 인덱스부터 C까지의 문자 조합 탐색
    for (let i = start; i < C; i++) {
      password.push(characters[i]);
      recursion(i + 1, password);
      password.pop(); // 백트래킹
    }
  }

  recursion(0, []);
  return result;
}

// 예시 사용
const L = 4;
const C = 6;
const characters = ["a", "t", "c", "i", "s", "w"];

console.log(solution(L, C, characters));
```

</details>

## 16. 칸토어 집합

<details>
  <summary>문제 보기</summary>

**문제 개요**

칸토어 집합은 0과 1사이의 실수로 이루어진 집합으로, 구간 [0, 1]에서 시작해서 각 구간을 3등분하여 가운데 구간을 반복적으로 제외하는 방식으로 만든다.

전체 집합이 유한이라고 가정하고, 다음과 같은 과정을 통해서 칸토어 집합의 근사를 만들어보자.

1. -가 3N개 있는 문자열에서 시작한다.

2. 문자열을 3등분 한 뒤, 가운데 문자열을 공백으로 바꾼다. 이렇게 하면, 선(문자열) 2개가 남는다.

3. 이제 각 선(문자열)을 3등분 하고, 가운데 문자열을 공백으로 바꾼다. 이 과정은 모든 선의 길이가 1일때 까지 계속 한다.

예를 들어, N=3인 경우, 길이가 27인 문자열로 시작한다.

```
---------------------------
```

여기서 가운데 문자열을 공백으로 바꾼다.

```
---------         ---------
```

남은 두 선의 가운데 문자열을 공백으로 바꾼다.

```
---   ---         ---   ---
```

이 과정을 반복하면, 다음과 같은 문자열이 만들어진다.

```
- -   - -         - -   - -
```

이 문자열을 출력하는 프로그램을 작성하시오.

**입력**

첫째 줄에 N이 주어진다. (0 ≤ N ≤ 10)

**출력**

입력으로 주어진 N에 대해서, 해당하는 칸토어 집합의 근사를 출력한다.

**예시 입력**

```
0
1
3
2
```

**예시 출력**

```
-
- -
- -   - -         - -   - -
- -   - -
```

**풀이**

1. 재귀로 구현 - 칸토어 집합의 근사를 출력 (시간 복잡도: O(3^N))

```javascript
function correctSolution(N) {
  // N=0일 경우 길이가 1인 배열을 생성
  const length = Math.pow(3, N);
  const arr = Array(length).fill("-");

  function removeMiddle(start, end) {
    const size = end - start;
    // 길이가 3 미만이면 더 이상 3등분 불가능
    if (size < 3) {
      return;
    }
    const interval = size / 3;
    const leftEnd = start + interval;
    const rightStart = start + 2 * interval;

    // 가운데 구간을 공백으로 설정
    for (let i = leftEnd; i < rightStart; i++) {
      arr[i] = " ";
    }

    // 왼쪽, 오른쪽 구간에 대해 같은 과정 반복
    removeMiddle(start, leftEnd);
    removeMiddle(rightStart, end);
  }

  // 가운데 구간을 공백화하는 재귀 함수 호출
  removeMiddle(0, length);

  return arr.join("");
}

// 예시
console.log(correctSolution(0)); // "-"
console.log(correctSolution(1)); // "- -"
console.log(correctSolution(2)); // "- -   - -"
console.log(correctSolution(3)); // "- -   - -         - -   - -"
```

</details>
