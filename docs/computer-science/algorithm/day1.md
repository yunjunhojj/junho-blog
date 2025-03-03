# Day 1: 정렬 & 해시

이번 섹션에서는 알고리즘의 기본이 되는 정렬과 해시의 개념, 구현 원리, 그리고 JavaScript에서의 활용 방법에 대해 자세하게 알아본다.

---

## 1. 정렬 (Sorting)

정렬 알고리즘은 데이터를 일정한 기준에 따라 순서대로 나열하는 기법이다. 다양한 정렬 알고리즘들이 존재하며, 각 알고리즘은 데이터의 특성, 입력 크기, 안정성, 평균 및 최악의 시간 복잡도 측면에서 차이가 있다.

### 주요 정렬 알고리즘

- **버블 정렬 (Bubble Sort)**

  - **원리**: 인접한 두 원소를 비교하여 순서가 맞지 않으면 서로 교환하며, 배열의 끝까지 반복하는 방식.
  - **시간 복잡도**: 평균 및 최악의 경우 O(n²)
  - **특징**: 구현이 쉽지만, 큰 데이터셋에 부적합.

- **선택 정렬 (Selection Sort)**

  - **원리**: 배열에서 최솟값(또는 최댓값)을 찾아 첫 번째 위치와 교환하고, 나머지 배열에 대해 같은 과정을 반복.
  - **시간 복잡도**: O(n²)
  - **특징**: 메모리 사용이 적으며, 교환 횟수가 비교적 적음.

- **삽입 정렬 (Insertion Sort)**

  - **원리**: 배열을 정렬된 부분과 정렬되지 않은 부분으로 나누고, 정렬되지 않은 원소를 올바른 위치에 '삽입'하는 방식.
  - **시간 복잡도**: 평균 및 최악의 경우 O(n²), 최선의 경우(이미 정렬된 경우) O(n)
  - **특징**: 소규모 데이터나 거의 정렬된 배열에 적합.

- **퀵 정렬 (Quick Sort)**

  - **원리**: 피벗 값을 정하고, 피벗보다 작은 값과 큰 값으로 배열을 분할한 후, 재귀적으로 정렬하는 방식.
  - **시간 복잡도**: 평균 O(n log n), 최악의 경우 O(n²) (하지만 피벗 선택 기법을 개선하면 최악의 경우를 회피할 수 있음)
  - **특징**: 분할 정복 알고리즘으로 실전에서 많이 사용됨.

- **병합 정렬 (Merge Sort)**
  - **원리**: 배열을 반으로 나누고, 각각 정렬한 후 합치는 방식. 항상 배열을 반씩 나누므로 재귀 깊이가 일정.
  - **시간 복잡도**: O(n log n)
  - **특징**: 안정 정렬이며, 추가 메모리 공간이 필요함.

### 정렬 알고리즘별 시간 복잡도 비교

| 알고리즘  | 평균 시간 복잡도 | 최악의 경우 시간 복잡도 | 안정성        |
| --------- | ---------------- | ----------------------- | ------------- |
| 버블 정렬 | O(n²)            | O(n²)                   | 안정          |
| 선택 정렬 | O(n²)            | O(n²)                   | 불안정        |
| 삽입 정렬 | O(n²)            | O(n²)                   | 안정          |
| 퀵 정렬   | O(n log n)       | O(n²)                   | 보통 (불안정) |
| 병합 정렬 | O(n log n)       | O(n log n)              | 안정          |

### JavaScript `sort()` 메서드 이해

- **동작 원리**:  
  JavaScript의 `Array.prototype.sort()` 메서드는 기본적으로 문자열 정렬 방식을 사용한다. 숫자 정렬의 경우 비교 함수를 제공해야 원하는 결과를 얻을 수 있다.
- **예시**

  ```js
  // 문자열 정렬 (기본 동작)
  const fruits = ["banana", "apple", "cherry"];
  fruits.sort(); // ["apple", "banana", "cherry"]

  // 숫자 정렬 (비교 함수 필요)
  const numbers = [10, 2, 30, 22];
  numbers.sort((a, b) => a - b); // [2, 10, 22, 30]
  ```

- 주의사항:
  sort() 메서드는 원본 배열을 직접 수정하며, 비교 함수가 없을 경우 유니코드 코드 포인트 순서대로 정렬된다.

## 2. 해시 (Hash)

해시 자료구조는 키와 값의 쌍으로 데이터를 저장하며, 빠른 탐색, 삽입, 삭제가 가능하도록 설계되었다. 해시 테이블은 내부적으로 해시 함수를 사용해 키를 인덱스로 변환하여 데이터를 저장하는 방식이다.

### 해시 테이블의 개념

- 기본 원리:
  입력된 키에 대해 해시 함수를 적용하여 배열의 인덱스를 결정하고, 해당 인덱스에 값을 저장한다.

- 장점:
  평균적으로 O(1)의 시간 복잡도로 데이터를 탐색할 수 있다.

### 충돌 해결 방법

해시 함수는 서로 다른 키에 대해 같은 인덱스를 반환할 수 있다. 이를 충돌(Collision)이라고 하며, 대표적인 해결 방법은 다음과 같다.

- 체이닝 (Chaining)
  - 같은 인덱스에 여러 값을 연결 리스트(또는 배열) 형태로 저장.
  - 각 슬롯에 리스트를 두어 충돌 발생 시 리스트에 추가한다.
- 개방 주소법 (Open Addressing)
  - 충돌 발생 시 배열 내 다른 빈 슬롯을 찾아 데이터를 저장.
  - 선형 조사, 제곱 조사, 이중 해싱 등이 대표적인 방식이다.

JavaScript에서의 해시 활용

- 객체(Object)
- 기본적인 키-값 저장소로 사용되며, 문자열 키를 기반으로 한다.
- 예시:

```javascript
const obj = {
  apple: 10,
  banana: 20,
};
```

- Map
  - ES6부터 도입된 자료구조로, 키에 어떤 데이터 타입이든 사용할 수 있다.
  - 삽입 순서를 기억하며, 반복 시 순서대로 접근 가능.
  - 예시:

```javascript
const map = new Map();
map.set("apple", 10);
map.set("banana", 20);
```

- Set
  - 중복을 허용하지 않는 값들의 집합을 표현하는 자료구조.
  - 예시:

```javascript
const set = new Set();
set.add("apple");
set.add("banana");

// 중복된 값은 무시됨
set.add("apple");

console.log(set); // Set { 'apple', 'banana' }
```

---

## 정렬 문제 풀이

어떤 문제를 정렬로 풀어야할까요?

- 정렬된 배열에서 특정 값 찾기
- 정렬된 배열을 다른 방식으로 정렬하기
- 정렬된 배열을 이용한 다른 문제 풀이

### 1. K번째 수 https://school.programmers.co.kr/learn/courses/30/lessons/42748

```javascript
// 배열에서 i~j 번째 숫자까지 자르고 정렬했을 때, K번째 있는 수?
// commands = [i,j,k] 로 이루어진 2차원 배열
// 1. 각 command 마다 result 값이 있어야함 (for문)
// 2. i,j 로 자른다
// 3. 자른 배열에서 k번째를 구한다.
function solution(array, commands) {
  var answer = [];

  for (let f = 0; f < commands.length; f++) {
    const temp = [...array];
    const [i, j, k] = commands[f];
    const slice = temp.slice(i - 1, j).sort((a, b) => a - b);
    answer.push(slice[k - 1]);
  }

  return answer;
}
```

### 2. 가장 큰 수 https://school.programmers.co.kr/learn/courses/30/lessons/42746

```javascript
function solution(numbers) {
  // 각 숫자를 문자열로 변환
  numbers = numbers.map(String);

  // 두 문자열을 이어 붙였을 때의 결과를 직접 비교하여 내림차순 정렬
  numbers.sort((a, b) => {
    const order1 = a + b;
    const order2 = b + a;

    if (order2 > order1) {
      return 1;
    } else if (order2 < order1) {
      return -1;
    } else {
      return 0;
    }
  });

  // 만약 가장 큰 값이 "0"이라면 모든 숫자가 0인 경우이므로 "0"을 반환
  if (numbers[0] === "0") return "0";

  // 정렬된 문자열을 이어 붙여 최종 결과 반환
  return numbers.join("");
}
```

### 3. H-Index https://school.programmers.co.kr/learn/courses/30/lessons/42747

```javascript
function solution(citations) {
  let answer = 0;
  const sorted = citations.sort((a, b) => b - a);

  for (let i = 0; i <= sorted.length; i++) {
    // i번 이상 인용된 논문의 개수를 계산합니다.
    const count = sorted.filter((citation) => citation >= i).length;
    if (count >= i) {
      answer = i;
    }
  }

  return answer;
}
```

### 4. 전화번호 목록 https://school.programmers.co.kr/learn/courses/30/lessons/42577

```javascript
function solution(phone_book) {
  phone_book.sort();

  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }

  return true;
}
```

---

## 해시 문제 풀이

어떤 문제를 해시로 풀어야할까요?

- 특정 값의 존재 여부 확인
- 특정 값의 개수 세기
- 특정 값의 빈도수 세기
- 특정 값의 순서 유지하기
- 특정 값의 순서 뒤집기

### 1. 완주하지 못한 선수 https://school.programmers.co.kr/learn/courses/30/lessons/42576

```javascript
// 마라톤, 모두 완주
// participant: 참여 선수 이름, completion: 완주한 선수이름
function solution(participant, completion) {
  var answer = "";
  const obj = {};

  for (let i = 0; i <= participant.length - 1; i++) {
    obj[participant[i]] = obj[participant[i]] ? obj[participant[i]] + 1 : 1;
  }

  for (let i = 0; i <= completion.length - 1; i++) {
    if (obj[completion[i]] !== undefined) {
      obj[completion[i]] = obj[completion[i]] - 1;
    }
  }

  for (const [key, value] of Object.entries(obj)) {
    if (value !== 0) {
      answer = key;
    }
  }

  return answer;
}
```

### 2. 전화번호 목록 https://school.programmers.co.kr/learn/courses/30/lessons/42577

```javascript
function solution(phone_book) {
  const map = new Map();

  for (let i = 0; i < phone_book.length; i++) {
    map.set(phone_book[i], i);
  }

  for (let i = 0; i < phone_book.length; i++) {
    for (let j = 1; j < phone_book[i].length; j++) {
      if (map.has(phone_book[i].slice(0, j))) {
        return false;
      }
    }
  }

  return true;
}
```

### 3. 의상 https://school.programmers.co.kr/learn/courses/30/lessons/42578

```javascript
function solution(clothes) {
  // 각 종류별 의상의 개수를 저장할 객체 생성
  const clothesMap = {};

  // clothes 배열을 순회하며 종류별 개수를 카운트
  for (const [item, type] of clothes) {
    clothesMap[type] = (clothesMap[type] || 0) + 1;
  }

  // 모든 종류의 (개수 + 1) (즉, 해당 종류를 선택하지 않는 경우 포함)을 곱함
  let combinations = 1;
  for (const type in clothesMap) {
    combinations *= clothesMap[type] + 1;
  }

  // 아무것도 입지 않는 경우를 제외하기 위해 1을 빼줌
  return combinations - 1;
}
```
