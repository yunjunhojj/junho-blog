# uniqueArray

다음과 같은 함수를 구현하세요. 이 함수는 배열을 입력으로 받아, 배열에서 중복이 제거된 버전을 반환합니다. 이때 각 요소의 첫 번째 발생만 유지되어야 하며, 반환되는 값들의 순서는 배열에서 등장한 순서를 따라야 합니다.

## 예시

```javascript
uniqueArray([1, 2, 3]); // [1, 2, 3]
uniqueArray([1, 1, 2]); // [1, 2]
uniqueArray([2, 1, 2]); // [2, 1]
```

## 답변

```javascript
/**
 * @param {Array} array
 * @return {Array}
 */
export default function uniqueArray(array) {
  const result = [];

  array.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
}
```

## Clarification Questions (명확히 해야 할 질문들)

- 배열이나 객체와 같은 비원시 값들을 어떻게 공평하게 비교할 수 있을까요?
  - 인터뷰 환경에서 이 질문의 목적을 위해 === 비교를 사용할 수 있습니다. Lodash의 uniq 함수는 훨씬 더 정교한 SameValueZero를 사용합니다.
- 배열에 동일한 타입의 값들만 포함될 것인가요?
  - 우리는 그런 가정을 할 수 없습니다.

## Solution (해결책)

**Brute force approach (무차별 대입 방식)**

우리는 새로운 배열을 사용해 결과(result)를 저장할 수 있습니다. 입력 배열을 반복하면서 현재 요소가 result 배열에 있는지 Array.prototype.includes()를 사용해 확인한 다음, 존재하지 않으면 result 배열에 추가합니다.

그러나 이 해결책은 O(n²)의 복잡도를 가집니다. 왜냐하면 Array.prototype.includes()는 O(n) 연산이고, 우리는 입력 배열의 각 요소에 대해 이 연산을 한 번씩 수행하기 때문입니다.

## Solution 2 (Set 사용하기)

```javascript
export default function uniqueArray(array) {
  return [...new Set(array)];
}
```

- 설명:
  - Set은 중복된 값을 허용하지 않는 자료구조이므로, 배열을 Set으로 변환하면 자동으로 중복이 제거돼.
    new Set(array)는 입력 배열에서 중복을 제거한 값들로 구성된 Set을 반환하고, 이 Set을 다시 배열로 변환하기 위해 ... (스프레드 연산자)를 사용해 새로운 배열을 생성해.
- 시간 복잡도:
  - Set의 삽입과 조회는 평균적으로 O(1)이기 때문에, 이 방식은 전체적으로 O(n)의 시간 복잡도를 가지며, 매우 효율적이야.
