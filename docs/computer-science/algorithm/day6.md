# **Day 6: 깊이/너비 우선 탐색(DFS/BFS) & 그래프**

이번 섹션에서는 그래프와 트리 탐색의 핵심 알고리즘인 DFS(Depth-First Search)와 BFS(Breadth-First Search)를 살펴보고, 그래프를 표현하고 다양한 문제(사이클 검출, 연결 요소 찾기, 최단 경로 등)를 해결하는 방법을 학습한다.

---

## 1. DFS(Depth-First Search)와 BFS(Breadth-First Search)

### **1.1 DFS (깊이 우선 탐색)**

- **개념:**  
  DFS는 한 노드를 방문한 후, 가능한 한 깊게 들어가서 더 이상 진행할 수 없을 때 이전 단계로 돌아가는 방식이다.  
  주로 재귀 함수나 스택을 이용해 구현한다.

- **구현 방식:**

  - **재귀를 이용한 DFS**
    ```js
    function dfs(node, visited = new Set()) {
      if (!node || visited.has(node)) return;
      console.log(node.value);
      visited.add(node);
      for (let neighbor of node.neighbors) {
        dfs(neighbor, visited);
      }
    }
    ```
  - **스택을 이용한 DFS (반복적 접근)**
    ```js
    function dfsIterative(startNode) {
      const visited = new Set();
      const stack = [startNode];
      while (stack.length) {
        const node = stack.pop();
        if (!visited.has(node)) {
          console.log(node.value);
          visited.add(node);
          // 스택은 LIFO 특성으로, 이웃 노드를 역순으로 넣으면 원래 순서대로 탐색 가능
          for (let i = node.neighbors.length - 1; i >= 0; i--) {
            stack.push(node.neighbors[i]);
          }
        }
      }
    }
    ```

- **사용 사례:**
  - **경로 찾기:** 미로 탐색, 퍼즐 문제 등
  - **컴포넌트 분리:** 연결된 컴포넌트를 찾는 문제
  - **탐색 깊이가 중요한 경우:** 트리의 구조 분석 등

---

### **1.2 BFS (너비 우선 탐색)**

- **개념:**  
  BFS는 시작 노드에서부터 인접한 노드를 모두 방문한 후, 그 다음 깊이의 노드들을 방문하는 방식이다.  
  주로 큐(Queue)를 이용해 구현하며, 최단 경로 문제 해결에 효과적이다.

- **구현 방식:**

  ```js
  function bfs(startNode) {
    const visited = new Set();
    const queue = [startNode];
    while (queue.length) {
      const node = queue.shift();
      if (!visited.has(node)) {
        console.log(node.value);
        visited.add(node);
        for (let neighbor of node.neighbors) {
          queue.push(neighbor);
        }
      }
    }
  }
  ```

- 사용 사례:
  - 최단 경로 탐색: 미방문 노드에 대한 최단 거리를 찾는 문제
  - 계층적 구조 분석: 트리나 그래프의 레벨별 탐색
  - 동일 깊이의 노드 처리: 특정 레벨의 노드를 동시에 처리해야 하는 문제

### **1.3 DFS vs. BFS: 사용 시나리오 비교**

| 탐색 방식 | 장점                                    | 단점                                     | 적용 사례                                 |
| --------- | --------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| **DFS**   | 구현이 간단하며, 메모리 사용이 적음     | 깊은 재귀로 인한 스택 오버플로우 가능성  | 경로 찾기, 연결 요소 분리, 사이클 검출 등 |
| **BFS**   | 최단 경로 탐색에 최적, 레벨별 탐색 가능 | 큐 사용으로 인해 메모리 사용량 증가 가능 | 최단 경로, 레벨 순회, 거리 계산 등        |

---

## 2. 그래프

### **2.1 그래프의 표현 방식**

- **인접 행렬 (Adjacency Matrix)**

  - 각 노드마다 인접한 노드의 목록을 저장하는 방식으로, 메모리 효율적이며 희소 그래프에 적합하다.

- **인접 리스트 (Adjacency List)**
  - 2차원 배열을 사용하여 노드 간의 연결 관계를 표현. 모든 노드 간의 관계를 O(1)에 확인 가능하지만, 메모리 소모가 크다.

```js
// 인접 리스트 예시
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

// 인접 행렬 예시
const nodes = ["A", "B", "C", "D"];
const matrix = [
  [0, 1, 1, 0], // A
  [1, 0, 0, 1], // B
  [1, 0, 0, 1], // C
  [0, 1, 1, 0], // D
];
```

### **2.2 2.2 그래프 문제 해결 기법**

- 사이클 검출 (Cycle Detection):
  - DFS를 활용: 방문 중인 노드를 추적하여 사이클 여부 확인.
  - Union-Find (Disjoint Set): 주로 무방향 그래프에서 사이클 검출에 사용.
- 연결 요소 찾기 (Connected Components):
  - DFS 또는 BFS를 이용해, 방문하지 않은 노드를 시작점으로 하여 전체 컴포넌트를 분리.
- 최단 경로 (Shortest Path):
  - BFS: 무가중치 그래프에서 최단 경로 탐색.
  - 다익스트라 알고리즘: 가중치가 있는 그래프에서 최단 경로 탐색.
  - 벨만-포드 알고리즘: 음수 가중치가 포함된 그래프에서 사용.

---

3. 종합 정리

- DFS와 BFS의 선택:
  - DFS는 깊이 우선 탐색을 통해 경로를 따라 깊게 들어가며 탐색하는 반면,
  - BFS는 레벨별로 탐색하여 최단 경로를 찾는 데 유리하다.
- 그래프 표현:
  - 인접 리스트는 노드의 연결이 드문 경우에 효율적이며,
  - 인접 행렬은 모든 노드 간 관계를 빠르게 확인할 수 있으나 메모리 소모가 크다.
- 응용 사례:
  - 사이클 검출, 연결 요소 찾기, 최단 경로 계산 등 다양한 문제를 그래프 탐색 기법으로 해결할 수 있다.

---
