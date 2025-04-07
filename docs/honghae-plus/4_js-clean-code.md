# 4주차: 자바스크립트 클린 코드와 리팩토링 기초

## ✅ 학습 목표

- 클린 코드의 개념과 중요성을 이해한다.
- 읽기 쉽고 유지보수가 쉬운 자바스크립트 코드를 작성하는 법을 배운다.
- 대표적인 클린 코드 원칙(DRY, SRP 등)을 실제 코드에 적용해본다.
- 복잡하거나 나쁜 코드를 리팩토링하는 경험을 통해 개선 방향을 스스로 도출한다.

---

## 1. 클린 코드란 무엇인가?

### ✅ 클린 코드의 정의

> "클린 코드란 이해하기 쉬우며, 단순하고 명확한 로직으로 작성된 코드이다."

### ✅ 좋은 코드 vs 나쁜 코드

| 구분     | 좋은 코드   | 나쁜 코드             |
| -------- | ----------- | --------------------- |
| 가독성   | 읽기 쉬움   | 해석이 필요함         |
| 유지보수 | 수정 용이   | 버그 유발 가능성 높음 |
| 일관성   | 스타일 통일 | 중구난방              |
| 중복     | 없음        | 유사한 코드 반복됨    |

---

## 2. 클린 코드의 핵심 원칙

### 2-1. 의미 있는 이름 사용

- 변수명은 역할을 설명해야 한다.
- 축약어, 모호한 명사/동사는 피한다.

#### ❌ Bad

```js
const d = new Date();
const a = getData();
```

#### ✅ Good

```js
const currentDate = new Date();
const userData = getUserData();
```

### 2-2. 함수는 작고 하나의 역할만 하게 (SRP - Single Responsibility Principle)

- 함수는 하나의 동작만 수행해야 한다.
- 함수 이름은 동사 + 목적 형태로 작성한다.

#### ❌ Bad

```js
function process(user) {
  validate(user);
  save(user);
  notify(user);
}
```

#### ✅ Good

```js
function validateUser(user) {
  // 유효성 검사 로직
}
function saveUser(user) {
  // 저장 로직
}
function notifyUser(user) {
  // 알림 로직
}
```

### 2-3. 중복 코드 제거 (DRY - Don't Repeat Yourself)

- 중복된 코드는 유지보수의 어려움을 초래한다.
- 공통된 로직은 함수로 분리한다.
- 중복된 코드를 찾고, 이를 함수로 추출한다.
- 중복된 코드를 제거하면 코드의 가독성과 유지보수성이 향상된다.

#### ❌ Bad

```js
if (user.role === "admin") {
  console.log("관리자입니다");
}
if (user.role === "admin") {
  sendNotification();
}
```

#### ✅ Good

```js
function isAdmin(user) {
  return user.role === "admin";
}
function notifyAdmin(user) {
  if (isAdmin(user)) {
    console.log("관리자입니다");
    sendNotification();
  }
}
```

### 2-4. 조건문 단순화

- 중첩 if문은 가급적 피하고, 조기 반환(guard clause)을 사용한다.

#### ❌ Bad

```js
function isEligible(user) {
  if (user) {
    if (user.age > 18) {
      return true;
    }
  }
  return false;
}
```

#### ✅ Good

```js
function isEligible(user) {
  if (!user || user.age <= 18) {
    return false;
  }
  return true;
}

function isEligible(user) {
  if (!user) return false;
  return user.age > 18;
}
```

### 2-5. 매직 넘버와 문자열 제거

- 매직 넘버와 문자열은 상수로 정의한다.
- 코드의 의미를 명확히 하고, 변경 시 한 곳만 수정하면 된다.

#### ❌ Bad

```js
if (status === 4) {
  alert("에러 발생");
}
```

#### ✅ Good

```js
const ERROR_STATUS = 4;
if (status === ERROR_STATUS) {
  alert("에러 발생");
}
```

### 클린 코드를 위한 문법적 습관

1. 명확한 비교 사용

- == 대신 === 사용
- truthy/falsy 비교에 유의

2. 구조 분해 할당

- 객체나 배열의 값을 쉽게 추출
- 가독성 향상
- 예시: `const { name, age } = user;`
- 예시: `const [first어쩌구, second저쩌구] = array;`

3. 템플릿 리터럴

- 문자열을 쉽게 조합
- 예시: `` const message = `안녕하세요, ${name}님!`; ``
- 예시: `` const url = `https://api.example.com/${id}`; ``

4. 옵셔널 체이닝

- 객체의 속성 접근 시 null/undefined 체크
- 예시: `const name = user?.name;`
- 예시: `const address = user?.address?.city;`

> 단, 옵셔널 체이닝을 무지성으로 사용하지 않도록 주의 해야 한다. 값이 없으면 undefined가 반환되고 이는 컴포넌트에서 의도치 않은 오류 or 렌더링 문제를 발생시킬 수 있다. 따라서 옵셔널 체이닝을 사용할 때는 그 값이 undefined일 경우에 대한 처리를 반드시 해주어야 한다.

> 또한 그저 단순하게 type error를 피하기 위해 옵셔널 체이닝을 사용하는 것은 좋지 않다. 예를 들어, `user?.name`을 사용하여 `user`가 undefined일 때 오류를 피할 수 있지만, 이는 코드의 의도를 흐리게 만들 수 있다. 따라서 옵셔널 체이닝은 정말 필요한 경우에만 사용해야 한다.

```jsx
const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.age}</p>
    </div>
  );
};
```

5. 고차 함수

- 함수를 인자로 받거나 반환하는 함수
- 예시: `const map = (arr, fn) => arr.map(fn);`
- 예시: `const filter = (arr, fn) => arr.filter(fn);`
- 예시: `const reduce = (arr, fn, initial) => arr.reduce(fn, initial);`

### 실습 과제: 나쁜 코드 리팩토링하기

- 주어진 나쁜 코드를 클린 코드 원칙에 따라 리팩토링한다.
- 클린 코드 원칙을 적용하여 가독성과 유지보수성을 높인다.

```js
function fn(d) {
  if (d != null) {
    if (typeof d === "string") {
      if (d.length > 5) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

#### 리팩토링 후

```js
function isValidString(str) {
  if (!str) return false;
  if (typeof str !== "string") return false;
  return str.length > 5;
}
```

- 의미 있는 함수명
- early return 사용
- 불필요한 중첩 if문 제거
- 불필요한 else 제거

## Q: 함수를 항상 쪼갤순 없자나 예를들어 이메일 로그인 할 경우 로그인 이라는 함수 안에 validation 도 사용되고 로그인 호출 로직도 실해되는 방식아니야?

- A: 그럴 경우에는 함수의 역할을 명확히 하고, 각 역할에 맞는 함수를 분리하여 사용한다.
- A: 예를 들어, 로그인 함수는 다음과 같이 구성할 수 있다.

```js
function login(email, password) {
  if (!isValidEmail(email)) {
    showError('유효하지 않은 이메일입니다.');
    return;
  }

  if (!isValidPassword(password)) {
    showError('비밀번호는 최소 8자 이상이어야 합니다.');
    return;
  }

  const result = await apiLogin(email, password);

  if (!result.success) {
    showError(result.message);
    return;
  }

  redirectToDashboard();
}
```

각 함수는 역할을 명확히 하고 있습니다.

| 구분                 | 함수명              | 역할                                 |
| -------------------- | ------------------- | ------------------------------------ |
| 로그인               | login               | 이메일과 비밀번호로 로그인 수행      |
| 이메일 유효성 검사   | isValidEmail        | 이메일 형식과 도메인 유효성 검사     |
| 비밀번호 유효성 검사 | isValidPassword     | 비밀번호 길이 및 복잡성 검사         |
| 에러 메시지 표시     | showError           | 에러 메시지를 사용자에게 표시        |
| API 로그인           | apiLogin            | 서버에 로그인 요청                   |
| 대시보드 리다이렉트  | redirectToDashboard | 로그인 성공 시 대시보드로 리다이렉트 |

- 이 함수는 **“로그인 처리”**라는 하나의 큰 책임을 가진 ‘조정자(Coordinator)’ 역할을 하고 있어.
- 내부에 세부 로직들이 분리돼 있지만, 전체적으로 로그인이라는 하나의 목표에 집중돼 있다면 괜찮아.

### 조금 더 나아가면

```js
async function login(email, password) {
  if (!isValidLoginInput(email, password)) return;

  const result = await requestLogin(email, password);
  if (!result.success) return showError(result.message);

  redirectToDashboard();
}

function isValidLoginInput(email, password) {
  if (!isValidEmail(email)) return showError("유효하지 않은 이메일입니다.");
  if (!isValidPassword(password))
    return showError("비밀번호는 최소 8자 이상이어야 합니다.");
  return true;
}

async function requestLogin(email, password) {
  return apiLogin(email, password);
}
```

이런식으로 사용할 수도 있다. 하지만 누군가가 생각하기에는 과하다고 느낄 수도 있어. 이건 팀원들과의 합의가 필요해. -> code review의 중요성

## 🧠 핵심 정리

| 원칙            | 현실 적용                                               |
| --------------- | ------------------------------------------------------- |
| “작은 함수”     | **논리 단위로 작게**, 무조건 쪼개지는 말 것             |
| “하나의 책임”   | **의미 있는 수준에서 묶어서 표현 가능**                 |
| “SRP 위반”      | 너무 많은 역할이 **의미 없이 뒤섞인 경우**에만 해당     |
| “리팩토링 기준” | 이 함수의 목적을 **한 줄로 설명할 수 없다면 쪼개볼 것** |

## 개발자의 고민: 함수 및 변수의 이름 짓기

### ✅ 프로그래밍에서 이름을 잘 짓는 법

1. 이름은 ‘의도’를 드러내야 한다

- 나쁜 예시:

```js
const d = 3;
const a = get(u);
```

- 좋은 예시:

```js
const daysInAWeek = 7;
const userProfile = getUserById(userId);
```

**무엇인지? 왜 존재하는지?**를 이름만 보고도 알 수 있어야 함

2. 축약어/줄임말은 피하자 (단, 일반적인 약어는 OK)

- ❌ prc, usr, tp, cfg
- ✅ price, user, type, config

단, 아래는 예외:

- OK: id, url, html, api, db, cpu, img, pdf

3. 불리언 변수/함수는 질문처럼 지어라

- ✅ isActive, hasPermission, canSubmit, shouldRetry
- ❌ active, permission, retry

의미 있는 prefix를 붙여서 “예/아니오”로 대답할 수 있게 한다

4. 함수 이름은 동사 + 목적어로

- ✅ getUser, createOrder, sendEmail, validateForm
- ❌ user, emailSend, check, doWork

5. 반환값 기준으로 함수 이름을 지어라

우리가 알고 싶은 것은 무엇인가? "함수의 결과 어떤 값을 반환하는가" 를 기준으로 이름을 짓는다.

```js
function getUserAge(user) // 나이 숫자 반환
function isUserAdult(user) // true/false 반환
function fetchUsers() // 비동기 네트워크 호출
function handleLogin() // 클릭 등 이벤트 처리
```

6. 함수 vs 변수 혼동 피하기

- ✅ getUserName() // 함수
- ✅ userName // 변수
- ❌ userName() // 함수
- ❌ getUserName // 변수

7. 함수 목적이 복합적이라면 이름도 구체적으로

- ❌ handleSubmit → 너무 모호
- ✅ handleLoginFormSubmit, handleUserSearchSubmit

길이에 너무 신경쓰지 말고, **의미를 우선시**하자 (팀원들과 합의로 handle이나, submit 등은 생략 가능)

8. 동일한 의미에는 동일한 단어를 쓰자 (일관성)

- getUser, fetchUser, loadUser → 같은 의미로 다르게 쓰면 혼란
- ✅ 통일: 전부 fetchUser

**💡 요약 체크리스트**

- 이 이름만 보고 역할이 유추되는가?
- 읽는 사람이 오해할 여지가 있는가?
- 축약어 없이 명확하게 표현했는가?
- 변수는 명사, 함수는 동사인가?
- 논리값은 질문 형태인가?
- 팀에서 사용하는 네이밍과 일관성 있는가?

### 컨벤션의 중요성

앞선 내용에 대한 기준은 회사마다, 팀마다 다를 수 있다.
따라서 팀원들과의 합의가 필요하다. 이를 위해서는 코드 리뷰를 통해 서로의 코드를 확인하고, 피드백을 주고받는 것이 중요하다. 또한, 팀 내에서 사용하는 네이밍 컨벤션을 문서화하여 공유하는 것도 좋은 방법이다.

**예시**

````md
# 📘 JavaScript / Frontend 프로젝트 네이밍 컨벤션 가이드

이 문서는 일관된 코드 스타일을 유지하고, 읽기 쉬운 코드를 작성하기 위한 **네이밍 규칙 가이드**입니다.  
React, JavaScript, TypeScript 환경에서 사용하기 적합합니다.

---

## 1. 변수(variable)

- **명사** 형태로 짓는다.
- **카멜케이스(camelCase)** 사용 (`userName`, `totalPrice`)
- 의미 없는 축약어 사용 금지 (`val`, `tmp`, `d` 등)

| 목적        | 예시                                                 |
| ----------- | ---------------------------------------------------- |
| 사용자 정보 | `user`, `userInfo`, `userList`                       |
| 숫자        | `pageNumber`, `count`, `totalPrice`                  |
| 불리언      | `isOpen`, `hasPermission`, `canEdit`, `shouldRender` |
| 날짜        | `createdAt`, `lastUpdated`                           |

---

## 2. 함수(function)

- **동사 + 목적어** 형태로 짓는다.
- **카멜케이스(camelCase)** 사용
- 함수 목적이 반환값이면 `get`, `fetch`, `calculate`, `find`
- 행위 함수는 `handle`, `submit`, `process`, `toggle` 등 사용

| 목적        | 예시                                     |
| ----------- | ---------------------------------------- |
| 조회        | `getUserList()`, `fetchData()`           |
| 계산        | `calculateDiscount()`, `getTotalPrice()` |
| 이벤트 처리 | `handleClick()`, `submitForm()`          |
| 검증        | `isValidEmail()`, `hasAccess()`          |

---

## 3. 상수(constants)

- **모두 대문자(SCREAMING_SNAKE_CASE)** 사용
- 공통 값, 고정 값, 매직 넘버 대체 용도로 사용

```js
const MAX_PAGE_SIZE = 100;
const API_BASE_URL = "https://api.example.com";
const DEFAULT_TIMEOUT = 5000;
```
````

## ✅ 요약 정리

| 대상            | 케이스               | 예시                      |
| --------------- | -------------------- | ------------------------- |
| 변수/함수       | camelCase            | `userName`, `getUser`     |
| 상수            | SCREAMING_SNAKE_CASE | `MAX_PAGE_SIZE`           |
| 클래스/컴포넌트 | PascalCase           | `UserCard`, `UserService` |
| 파일/폴더       | kebab-case           | `user-profile.tsx`        |
| 커스텀 훅       | use + 동사           | `useInputValue()`         |
| 불리언          | 질문 형태            | `isVisible`, `hasToken`   |
