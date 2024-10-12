# .get (Lodash)

옵셔널 체이닝 연산자(?.)가 등장하기 전에는 중간의 속성이 존재하지 않을 수 있는 JavaScript 객체에서 깊이 중첩된 속성에 접근하는 것이 때때로 번거로웠습니다.

```javascript
const john = {
  profile: {
    name: { firstName: "John", lastName: "Doe" },
    age: 20,
    gender: "Male",
  },
};

const jane = {
  profile: {
    age: 19,
    gender: "Female",
  },
};

function getFirstName(user) {
  return user.profile.name.firstName;
}
```

:::warning

getFirstName(john)은 동작하지만 getFirstName(jane)은 jane.profile에 name 속성이 없기 때문에 오류가 발생합니다.

:::

## Lodash's Get method

Lodash의 `_.get` 메서드는 이러한 사용 사례를 해결하기 위해 만들어졌습니다.

여기서는 get 함수를 직접 작성해 보겠습니다. 이 함수는 object의 path에 있는 값을 가져옵니다. 만약 그 값이 undefined라면, defaultValue가 대신 반환됩니다. 함수 시그니처는 다음과 같습니다.

```javascript
get(object, path, [defaultValue]);
```

- object: 조회할 객체입니다.
- path: 가져올 속성의 경로입니다. 필드 간에 점(.)으로 구분되는 문자열이거나 경로 문자열 배열일 수 있습니다.
- defaultValue: 선택적 파라미터입니다. 값이 undefined일 경우 반환되는 기본값입니다.

## **Examples (예시)**

```javascript
get(john, "profile.name.firstName"); // 'John'
get(john, "profile.gender"); // 'Male'
get(jane, "profile.name.firstName"); // undefined
```

숫자 인덱스가 제공된 경우 배열에도 접근할 수 있습니다.

```javascript
get({ a: [{ b: { c: 3 } }] }, "a.0.b.c"); // 3
```

문법적으로 get(object, 'a[0].b.c')와 같은 형태를 지원할 필요는 없습니다.

## 해결 방법 및 코드

이 문제의 어려운 부분은 중첩된 필드에 접근하기 위해 객체에 대해 반복 또는 재귀 처리가 필요하다는 것을 이해하는 것입니다.

- 1단계 : 경로를 구분 기호인 점(.)으로 나누기
- 2단계 : 나누어진 경로 기반으로 해당 값이 존재하는지 탐색 (for, while)
- 3단계 : 2단계의 경우 null 또는 undefined 값이 발견되면 탐색을 중지해야합니다.

```typescript
export default function get<T>(
  objParam: Record<string, any>,
  pathParam: string | Array<string>,
  defaultValue?: T
): T {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let index = 0;
  let length = path.length;
  let object = objParam;

  while (object != null && index < length) {
    object = object[String(path[index])];
    index++;
  }

  const value = index && index === length ? object : undefined;
  return value !== undefined ? value : (defaultValue as T);
}
```

### Edge Cases (예외 처리)

get(obj, 'a.b..c')와 get(obj, '')는 해석되지 않으며 defaultValue가 반환되어야 합니다.
이 솔루션은 간단한 객체에만 작동합니다. 다음과 같은 객체에는 작동하지 않습니다:
Symbol이 키로 사용된 경우.
Map과 Set 값.
이러한 예외의 경우 인터뷰어와 예상되는 동작을 명확히 설명할 수 있어야 합니다.

### Notes (참고 사항)

null은 undefined와 구별되어야 합니다. undefined일 때 기본값을 반환해야 하므로, value !== undefined를 사용하여 value === null인 경우를 구별하는 것이 좋습니다.
