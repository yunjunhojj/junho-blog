# **Day 2: 스택 & 큐**

이번 섹션에서는 **스택(Stack)과 큐(Queue)** 의 개념과 활용법을 학습한다.  
스택은 **LIFO(Last In, First Out)**, 큐는 **FIFO(First In, First Out)** 원리를 따르는 대표적인 자료구조이다.  
이를 기반으로 문제 해결 능력을 향상시킬 수 있도록 JavaScript에서의 구현과 응용 사례를 다룬다.

---

## **1. 스택(Stack)**

스택은 **후입선출 (LIFO, Last In First Out)** 구조를 가지며,  
마지막에 삽입된 데이터가 가장 먼저 제거되는 방식이다.

### **1.1 스택의 기본 연산**

| 연산            | 설명                                             |
| --------------- | ------------------------------------------------ |
| `push(element)` | 스택의 **맨 위**(top)에 요소를 추가              |
| `pop()`         | 스택의 **맨 위**(top) 요소를 제거 및 반환        |
| `peek()`        | 스택의 **맨 위**(top) 요소를 확인(제거하지 않음) |
| `isEmpty()`     | 스택이 비어있는지 확인                           |
| `size()`        | 스택에 포함된 요소 개수 반환                     |

### **1.2 스택의 JavaScript 구현**

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// 스택 사용 예제
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.size()); // 2
```

### **1.3 스택의 응용**

- **괄호 검사(Bracket Matching)**

  - 주어진 수식의 괄호 짝이 맞는지 확인하는 문제
  - 여는 괄호일 때 스택에 추가, 닫는 괄호일 때 스택에서 제거하여 짝이 맞는지 확인

```js
function isValidBracket(s) {
  const stack = [];
  const bracket = { "(": ")", "{": "}", "[": "]" };

  for (let char of s) {
    if (bracket[char]) stack.push(char);
    else {
      if (bracket[stack.pop()] !== char) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValidBracket("()[]{}")); // true
console.log(isValidBracket("([)]")); // false
```

- **문자열 역순 처리**

  - 문자열을 역순으로 출력하는 문제
  - 스택을 활용하여 문자열을 역순으로 출력

```js
function reverseString(str) {
  const stack = [];
  for (let char of str) stack.push(char);
  let reversed = "";
  while (stack.length) reversed += stack.pop();
  return reversed;
}

// 테스트
console.log(reverseString("hello")); // "olleh"
```

---

## **2. 큐(Queue)**

큐는 **선입선출 (FIFO, First In First Out)** 구조를 가지며,
먼저 삽입된 데이터가 먼저 제거되는 방식이다.

### **2.1 큐의 기본 연산**

| 연산               | 설명                                             |
| ------------------ | ------------------------------------------------ |
| `enqueue(element)` | 큐의 **맨 뒤**(rear)에 요소를 추가               |
| `dequeue()`        | 큐의 **맨 앞**(front) 요소를 제거 및 반환        |
| `peek()`           | 큐의 **맨 앞**(front) 요소를 확인(제거하지 않음) |
| `isEmpty()`        | 큐가 비어있는지 확인                             |
| `size()`           | 큐에 포함된 요소 개수 반환                       |

### **2.2 큐의 JavaScript 구현**

```js
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// 큐 사용 예제
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1
console.log(queue.peek()); // 2
console.log(queue.size()); // 2
```

### **2.3 큐의 응용**

- **2.3.1 캐시(Cache) 구현 (LRU 알고리즘)**

  - 가장 오랫동안 사용되지 않은 페이지를 제거하는 캐시 알고리즘
  - 큐를 활용하여 캐시에 페이지를 추가하고, 최근 사용 페이지를 앞으로 이동

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

// 캐시 사용 예제
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1
```

## **3. 스택 & 큐 문제 풀이**

- **3.1. [기능 개발](https://programmers.co.kr/learn/courses/30/lessons/42586)**

```js

```
