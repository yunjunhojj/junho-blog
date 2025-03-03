# **Day 3: 힙(Heap) & 완전탐색(Brute Force)**

이번 섹션에서는 **힙**과 **완전탐색** 기법에 대해 학습한다.  
힙은 데이터를 정렬된 상태로 관리할 수 있는 자료구조이며, 완전탐색은 문제의 모든 경우를 고려하는 방법론이다.

---

## **1. 힙 (Heap)**

### **1.1 최소 힙 vs. 최대 힙**

- **최소 힙 (Min Heap)**
  - 부모 노드가 자식 노드보다 항상 작거나 같은 값을 가지는 완전 이진 트리.
  - 루트 노드에는 가장 작은 값이 위치한다.
- **최대 힙 (Max Heap)**
  - 부모 노드가 자식 노드보다 항상 크거나 같은 값을 가지는 완전 이진 트리.
  - 루트 노드에는 가장 큰 값이 위치한다.

### **1.2 힙 정렬 및 우선순위 큐 구현**

- **힙 정렬(Heap Sort)**

  - 입력 배열을 힙으로 변환한 후, 루트 노드(최소 혹은 최대)를 반복적으로 제거하여 정렬된 배열을 만드는 알고리즘.
  - 시간 복잡도는 O(n log n)이다.

- **우선순위 큐(Priority Queue)**
  - 각 요소에 우선순위를 부여하고, 우선순위가 높은 요소를 먼저 처리한다.
  - 힙 자료구조를 이용하여 효율적으로 구현할 수 있다.

### **1.3 JavaScript 배열을 이용한 힙 구현 예제**

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] > this.heap[smallerChildIndex]) {
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      } else {
        break;
      }
    }
  }
}

// 사용 예제
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
console.log(minHeap.extractMin()); // 1 (최소값)
```

---

## 2. 완전탐색 (Brute Force)

2.1 완전탐색의 개념

- 정의:
  가능한 모든 경우의 수를 전부 탐색하여 문제의 정답을 찾는 방법.
- 장점:
  모든 경우를 고려하기 때문에 문제의 해를 확실히 찾을 수 있다.
  단, 입력 크기가 작을 때 주로 사용하며, 큰 문제에서는 비효율적일 수 있다.

  2.2 재귀(백트래킹)와 반복문 활용

- 재귀(백트래킹)
- 문제를 작은 부분 문제로 분할해가며 해를 구하는 방식.
- 각 단계에서 조건에 맞지 않는 경우 빠르게 가지를 치며, 가능한 해를 탐색한다.
- 대표 문제: N-Queen, 부분집합 구하기 등.
- 반복문
- 중첩된 반복문을 사용하여 모든 경우의 수를 탐색.
- 대표 문제: 순열, 조합 구하기 등.

  2.3 시간 복잡도와 최적화 포인트

- 시간 복잡도:
  완전탐색은 모든 경우의 수를 고려하기 때문에 보통 지수(exponential) 혹은 순열/조합 문제에서 팩토리얼 시간 복잡도를 가질 수 있다.
- 최적화 포인트
  - 가지치기 (Pruning):
    재귀 호출 중 불필요한 경로를 미리 배제하여 탐색 범위를 줄인다.
  - 메모이제이션:
    이미 계산한 결과를 저장하여 중복 계산을 피한다.
  - 문제의 특성을 파악:
    입력의 제약 조건을 분석하여 완전탐색 대신 더 효율적인 방법을 도출할 수 있는지 검토한다.

---

요약

- 힙은 최소 힙과 최대 힙으로 나뉘며, 우선순위 큐나 힙 정렬 등에 활용된다.
  JavaScript에서는 배열을 기반으로 힙을 구현할 수 있으며, heapify 과정을 통해 유지된다.
- 완전탐색은 가능한 모든 경우를 탐색하는 기법으로,
  재귀(백트래킹)나 반복문을 활용하여 구현된다.
  시간 복잡도 문제로 입력 크기가 클 경우 최적화(가지치기, 메모이제이션 등)가 필요하다.

---
