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
