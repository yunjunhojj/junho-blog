# **Day 5: 동적계획법 (Dynamic Programming)**

동적계획법(DP)은 복잡한 문제를 작은 하위 문제로 분할한 뒤, 이들의 해를 저장해 전체 문제의 해답을 도출하는 강력한 알고리즘 설계 기법이다. 이 방식은 중복 계산을 줄여 효율적으로 문제를 해결할 수 있도록 돕는다.

---

## 1. DP 개념 이해

### **1.1 기본 원리**

- **하위 문제(부분 문제)의 해결:**  
  전체 문제를 작은 단위의 하위 문제로 나누어 각각의 문제를 해결한다.  
  이때, 동일한 하위 문제가 여러 번 등장하는 경우가 많아 중복 계산이 발생할 수 있다.

- **메모이제이션 (Memoization):**  
  재귀 호출 중 이미 계산된 하위 문제의 결과를 캐시에 저장하여, 같은 문제를 다시 계산하지 않도록 하는 방식이다.
- **탭ULATION (Tabulation):**  
  하위 문제의 결과를 테이블(보통 배열) 형태로 저장하며, 작은 문제부터 순차적으로 풀어나가는 방식이다.  
  보통 반복문을 사용하여 바텀업(bottom-up) 방식으로 문제를 해결한다.

### **1.2 메모이제이션 vs. 탭ULATION**

| 특징 | 메모이제이션                                 | 탭ULATION                                      |
| ---- | -------------------------------------------- | ---------------------------------------------- |
| 방식 | 재귀를 기반으로, 필요할 때마다 계산 및 저장  | 반복문을 사용해 작은 문제부터 결과를 채워나감  |
| 구현 | 상향식 (Top-Down) 방식                       | 하향식 (Bottom-Up) 방식                        |
| 장점 | 코드가 간결하고 직관적                       | 불필요한 재귀 호출이 없어 메모리 사용이 효율적 |
| 단점 | 재귀 호출로 인한 스택 오버플로우 가능성 있음 | 초기 테이블 설정 및 순서 설계가 필요           |

---

## 2. 실전 예제

동적계획법의 핵심은 문제를 점화식(재귀식)으로 표현하고, 이를 코드로 옮기는 과정에 있다. 여기서는 대표적인 예제들을 통해 DP의 활용법을 살펴본다.

### **2.1 피보나치 수열**

**문제 설명:**  
피보나치 수열은 첫 두 항(0, 1) 이후부터 이전 두 항의 합으로 이루어진 수열이다.

**메모이제이션 구현 (Top-Down):**

```js
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // 55
```

**Tabulation 구현 (Bottom-Up):**

```js
function fibonacci(n) {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(fibonacci(10)); // 55
```

### **2.2 배낭 문제 (Knapsack Problem)**

문제 설명:
주어진 무게 제한 내에서 최대 가치를 얻기 위해 물건들을 선택하는 문제이다.

점화식 설계:

- dp[i][w] : 처음 i개의 물건을 고려했을 때, 무게 제한이 w인 경우의 최대 가치
- 점화식:
  - 물건 i를 포함하지 않을 경우: dp[i][w] = dp[i-1][w]
  - 물건 i를 포함할 경우 (w가 충분한 경우): dp[i][w] = dp[i-1]w - weight[i]] + value[i]
  - 따라서, dp[i][w] = max(dp[i-1][w], dp[i-1]w - weight[i]] + value[i])

**Tabulation 구현 (Bottom-Up):**

```js
function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp 배열 초기화 (n+1) x (capacity+1)
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  return dp[n][capacity];
}

// 예제: 물건 3개, 무게 제한 50
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;
console.log(knapsack(weights, values, capacity)); // 220
```

### **2.3 계단 오르기 문제**

문제 설명:
한 계단씩 혹은 두 계단씩 오를 수 있을 때, 계단을 오르는 총 경우의 수를 구하는 문제이다.

점화식 설계:

- dp[i]: i번째 계단까지 도달하는 경우의 수
- 점화식: dp[i] = dp[i - 1] + dp[i - 2]
  (첫 번째 계단과 두 번째 계단을 밟는 경우의 수의 합)

**Tabulation 구현 (Bottom-Up):**

```js
function climbStairs(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(climbStairs(4)); // 5
console.log(climbStairs(5)); // 8
```

---

### 3. 정리 및 고려사항

    -	문제의 분해:

동적계획법은 문제를 하위 문제로 쪼개고, 이들 사이의 관계(점화식)를 찾는 것이 핵심이다.

- 메모이제이션 vs. Tabulation:
  - 메모이제이션은 재귀적 접근으로 구현이 직관적이지만, 재귀 깊이가 깊어질 경우 스택 오버플로우 위험이 있다.
  - Tabulation은 반복문을 통해 작은 문제부터 해결하므로 메모리 사용이 효율적이다.
- 점화식 설계:
  문제의 조건을 명확히 분석하여 점화식을 도출하는 과정이 중요하다.
  각 단계의 선택이 전체 문제에 어떻게 영향을 미치는지 면밀히 검토해야 한다.
- 코드 구현:
  점화식을 코드로 옮길 때, 배열의 초기값 설정과 반복 범위를 정확히 지정하는 것이 오류를 줄이는 핵심 포인트이다.
