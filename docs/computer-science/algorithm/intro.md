# 일주일만에 알고리즘 훑어보기

> 알고리즘이 과연 실무에 중요한가? 라고 생각할 수도 있습니다. 하지만, 알고리즘은 생각의 폭을 넓혀주고, 문제를 해결하는 능력을 키워줍니다. 그리고 채용과정에 포함되어 있는 코딩테스트에서도 알고리즘은 필수입니다. 이번 주에는 알고리즘의 기초를 훑어보며, 알고리즘의 중요성을 느껴보도록 하겠습니다.

## 7일간의 알고리즘 테스트 준비 목차 (JavaScript 기준)

아래 계획은 7일이라는 짧은 시간 동안 폭넓은 알고리즘 주제를 효율적으로 학습하기 위한 목차 예시다. 각 일자별로 핵심 이론 학습 후, 해당 주제의 예제 문제를 JavaScript로 직접 풀이해보면서 실력을 확실히 쌓을 수 있도록 구성하였다.

---

### **Day 1**: 정렬 & 해시

1. **정렬(Sorting)**

   - 주요 정렬 알고리즘 소개(버블 정렬, 선택 정렬, 삽입 정렬, 퀵 정렬, 병합 정렬 등)
   - 정렬 알고리즘별 시간 복잡도 비교
   - JavaScript `sort()` 메서드 동작 방식 이해

2. **해시(Hash)**
   - 해시 테이블의 개념과 충돌 해결 방법(체이닝, 개방 주소법 등)
   - 해시를 이용한 빠른 탐색/삽입/삭제
   - JavaScript에서 Map, Object, Set 등 활용 사례

---

### **Day 2**: 스택 & 큐

1. **스택(Stack)**

   - LIFO(Last In First Out) 원리
   - `push()`, `pop()` 연산 구현
   - 스택을 활용한 괄호 검사, 문자열 역순 처리 예제

2. **큐(Queue)**
   - FIFO(First In First Out) 원리
   - `enqueue()`, `dequeue()` 연산 구현
   - 우선순위 큐, 원형 큐 등 변형 구조 이해

---

### **Day 3**: 힙(Heap) & 완전탐색(Brute Force)

1. **힙(Heap)**

   - 최소 힙, 최대 힙 개념
   - 힙 정렬과 우선순위 큐 구현 원리
   - JavaScript 배열을 이용한 힙 구조 구현

2. **완전탐색(Brute Force)**
   - 가능한 모든 경우를 탐색하여 해를 구하는 방법
   - 재귀(백트래킹), 반복문 활용
   - 시간 복잡도와 최적화 포인트

---

### **Day 4**: 탐욕법(Greedy) & 이분탐색(Binary Search)

1. **탐욕법(Greedy)**

   - 부분적 최적해를 선택해 전체 최적해를 구하는 접근
   - 대표 문제(거스름돈, 회의실 배정 등)
   - Greedy 선택이 항상 최적해가 되지 않는 경우 분석

2. **이분탐색(Binary Search)**
   - 정렬된 배열에서 O(log N)의 탐색
   - 재귀/반복 구현 방식
   - lower bound, upper bound 개념

---

### **Day 5**: 동적계획법(Dynamic Programming)

1. **DP 개념 이해**
   - 하위 문제(부분 문제)의 해를 저장하여 전체 문제 해를 구하는 방식
   - 메모이제이션(Memoization), 탭ULATION(Tabulation) 차이
2. **실전 예제**
   - 피보나치 수열, 배낭 문제(Knapsack Problem), 계단 오르기 등
   - 점화식 설계 과정과 코드로 옮기는 법

---

### **Day 6**: 깊이/너비 우선 탐색(DFS/BFS) & 그래프

1. **DFS(Depth-First Search)와 BFS(Breadth-First Search)**
   - 재귀/큐를 통한 구현
   - 그래프, 트리 탐색 시나리오별 사용 사례 비교
2. **그래프(Graph)**
   - 그래프 표현 방식(인접 리스트, 인접 행렬)
   - 사이클 검출, 연결 요소 찾기, 최단 경로 등

---

### **Day 7**: 종합 문제 풀이 & 마무리 점검

1. **종합 문제 풀이**
   - 앞서 배운 모든 알고리즘/자료구조를 활용한 복합 문제 해결
   - JavaScript로 빠른 입출력, 자료구조 구현 점검
2. **마무리 점검**
   - 자주 틀리는 유형 복습
   - 시간 복잡도, 공간 복잡도 정리
   - 알고리즘 테스트 대비 실전 감각 기르기

---

## 참고 자료

- [ECMAScript 표준](https://tc39.es/)
- 알고리즘 문제 풀이 플랫폼(예: 백준, 프로그래머스 등)  
  _(문제 링크는 상황에 맞춰 학습 시 참고하기)_

---

## 알고리즘을 위한 JavaScript 기본 문법

- **변수 선언**

  ```javascript
  let a = 1;
  const b = 2;
  var c = 3;
  ```

- **형 변환**

  ```javascript
  let num = 1;
  let str = String(num);
  let bool = Boolean(num);
  ```

- **배열**

  - 생성: const arr = [];, const arr = new Array(10);
  - 메서드
    - push(), pop(): 배열의 뒤에서 삽입/삭제
    - shift(), unshift(): 배열의 앞에서 삽입/삭제
    - slice(), splice(): 배열 복사/추가/삭제
    - map(), filter(), reduce() 등 고차 함수
  - 시간 복잡도
    - push(), pop()은 평균적으로 O(1)
    - shift(), unshift()는 앞쪽 원소를 모두 재배치하므로 O(N)
    - 알고리즘 문제에서 큐를 배열로 구현할 때 shift() 연산이 자주 등장하므로 성능에 주의

- **객체** 와 **Map**, **Set**

  - 객체: `const obj = { key: 'value' };`
  - Map: const map = new Map();
  - Set: const set = new Set();
  - 차이점: Map은 key-value 쌍을 저장하며, Set은 중복을 허용하지 않는다.

- **함수**

  ```javascript
  function sum(a, b) {
    return a + b;
  }
  ```

- **클래스**

  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }
    sayHello() {
      console.log(`Hello, ${this.name}!`);
    }
  }
  ```

- **입출력**

  ```javascript
  const fs = require("fs");
  const input = fs.readFileSync("/dev/stdin").toString().split("\n");
  ```

- **구조 분해 할당**

  ```javascript
  const [a, b] = [1, 2];
  const { key, value } = { key: "value" };
  ```

- **Spread 문법**

  ```javascript
  const arr = [1, 2, 3];
  const newArr = [...arr, 4, 5];
  ```

- **Rest 문법**

  ```javascript
  function sum(...args) {
    return args.reduce((acc, cur) => acc + cur, 0);
  }
  ```

- **삼항 연산자**

  ```javascript
  const result = condition ? "true" : "false";
  ```

- **반복문**

  ```javascript
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  ```

- **문자열**

  split(), join(), slice() 등

  ```javascript
  const str = "Hello, World!";
  const arr = str.split(" ");
  const newStr = arr.join(", ");
  const spliceStr = str.slice(7, 12);

  console.log(arr); // ["Hello,", "World!"]
  console.log(newStr); // Hello, World!
  console.log(spliceStr); // World
  ```

- **배열 메서드**

  map(), filter(), reduce() 등

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  const filtered = arr.filter((num) => num % 2 === 0);
  const mapped = arr.map((num) => num * 2);

  console.log(sum); // 15
  console.log(filtered); // [2, 4]
  console.log(mapped); // [2, 4, 6, 8, 10]
  ```

---
