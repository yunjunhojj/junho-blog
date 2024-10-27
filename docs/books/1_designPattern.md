# 자바스크립트 + 리액트 디자인 패턴

- 독서 기간 (2024.10.16 ~ )
- 목적 : 디자인 패턴에 대한 이해와 js 그리고 React 에서의 활용 예시 체험

## 1장

<details>
  <summary>디자인 패턴 소개</summary>
  
### 디자인 패턴의 역사 
> 디자인 패턴은 기본적으로 건축학에서 유래됐습니다. 의미적으로는 건축을 잘하기 위한 일종의 템플릿이라고 생각할 수 있습니다. 이 의미를 프로그래밍에서도 사용하게 되면서 디자인 패턴이 시작했습니다.

디자인 패턴은 1994년에 GoF(Gang of Four)이라는 4명의 저자가 발표한 책에서 처음 소개되었다. 이 책은 디자인 패턴을 23가지로 분류하였다. 이후 디자인 패턴은 소프트웨어 개발에서 중요한 개념으로 자리잡았다.

### 패턴이란 무엇인가

> 디자인 패턴은 소프트웨어 개발에서 특정 문제를 해결하기 위한 방법을 말한다. 이 방법은 다른 개발자들이 이미 검증된 방법을 사용하여 문제를 해결할 수 있도록 도와준다.

### 디자인 패턴의 장점

- 검증된 솔루션을 제공한다.
- 쉽게 재사용할 수 있다.
- 코드를 이해하기 쉽다.
- 실수를 줄일 수 있다.
- 종합적인 개발 방법론을 제공한다.
- 반복적인 작업을 줄일 수 있다. -> (DRY 원칙)
- 공통 언어를 제공한다. -> 의사소통이 쉬워진다.
- 커뮤니티의 지식을 선순화한다.

### 일상 생활에서의 디자인 패턴

> 리액트에서 공급자 패턴을 사용하면 컴포넌트 트리의 깊은 곳에 있는 컴포넌트에 데이터를 전달할 수 있다. 이 패턴은 리액트에서 매우 일반적으로 사용되는 패턴이다.

예를 들면 인증 정보를 전역적으로 사용하고 싶을 때, context API를 사용하여 인증 정보를 전역적으로 사용할 수 있다. 이러한 패턴은 리액트에서 매우 일반적으로 사용되는 패턴이다.

</details>

## 2장

<details>
  <summary>패턴성 검증, 프로토 패턴 그리고 세 가지 법칙</summary>
  
### 프로토 패턴이란?

> 프로토 패턴이란 새롭게 도입되는(패턴성 검증이 안된) 패턴이라고 생각하면 된다. 이 패턴이 어떻게 패턴성 검증이 이루어지고, 세가지 법칙을 충족해 디자인 패턴으로서 인정받게 되는지 알아보자.

### 패턴성 검증

> 좋은 패턴애는 여러 특징이 있습니다. 물론 모든 것을 갖춰야만 좋은 패턴이라고 할 순 없지만 아래의 특징을 갖고 있다면 좋은 패턴으로 간주할 수 있습니다.

- 특정 문제를 해결하는 방법을 제공한다.
- 확실한 기능만을 말한다.
- 관계를 명확하게 정의한다.

### 세 가지 법칙

> 좋은 패턴이 되지 위해서는 반복되는 현상 또는 문제에서 지속적으로 사용할 수 있어야하합니다. 이를 위해 GoF는 세 가지 법칙을 제시했습니다.

- 좋은 패턴은 어떻게 판단할 수 있는가?
- 좋은 패턴이라고 할 수 있는 이유가 무엇인가?
- 넓은 적용 범위를 갖고 있어 패턴이 될 가치가 있는지? 있다면 어떤 가치가 있는가?

</details>

## 3장

<details>
  <summary>패턴 구조화 및 작성</summary>

### 디자인 패턴의 구조

> 패턴의 작성자는 패턴의 설계, 구현 방법 및 목적을 설명해야 합니다. 크게는 3가지로 구성됩니다.

- 컨텍스트(Context) : 패턴이 적용되는 상황을 설명합니다.
- 집중 목표(System of Forces) : 패턴이 해결하려는 문제를 설명합니다.
- 구성(Configuration) : 패턴의 구조와 구현 방법을 설명합니다.

위의 내용을 통해 구성요소를 정리해보면 다음과 같습니다.

- 이름
- 설명
- 컨텍스트 개요
- 문제 제시
- 해결책 제시

이외로 설계 내용과 구현 방법 그리고 예제 코드등을 제공하면 더욱 좋습니다. 추가적인 내용은 많을 수 있지만, 위늬 내용은 최소한으로 제공해야 합니다.

### 모범 패턴

> 디자인 패턴의 구조와 만들어진 목적을 이해하면 해당 패턴이 필요한 이유에 대해 더 싶게 이해할 수 있습니다.

패턴을 새로 만드는 것은 초기 비용이 많이 들 수 있지만, 그 투자로 얻을 수 있는 것들이 많습니다. 하지만 처음부터 새로 만들기보다는 이미 검증된 패턴을 사용하는 것이 더 좋습니다.

만약 패턴을 사용하는 것 같은 코드를 발견한다면 특징을 메모해 보세요. 이러한 특징을 통해 패턴을 찾아보고 적용해보세요.
(tip: 어떠한 상호작용이나 정해진 규칙이 보이지 않는다면 패턴이 아닐 수 있습니다.)

### 패턴 작성하기

> 디자인 패턴을 직접 개발한다면 일단 잘 만들어진 다른 패턴을 참고해봅시다.

참고로 이미 존재하는 패턴을 활용해서 새로운 패턴을 만들 수도 있습니다. 예를 들면 모듈 패턴을 활용해서 노출 모듈 패턴을 만들 수 있습니다.

하지만 패턴을 만들 떄 아래와 같은 사항들을 고려해야 합니다.

- 얼마나 실용적인가?
- 사용자한테 솔직해야합니다. (이 패턴이 편리하다고 세일즈를 하지 마세요.)
- 독창성이 중요한 것이 아니라, 문제를 해결하는 것이 중요합니다.
- 패턴이 어떤 문제를 해결하는지 명확하게 설명해야 합니다. 이를 위해 훌륭한 예제 코드를 제공해야 합니다.

</details>

## 4장

<details>
  <summary>안티 패턴</summary>
  
### 안티 패턴이란?
  
> 안티 패턴은 디자인 패턴과 반대되는 개념입니다. 안티 패턴은 문제를 해결하는 대신 문제를 악화시키는 방법을 제공합니다. 안티 패턴은 프로젝트를 망가뜨리는 원인이 될 수 있습니다.

안티 패턴은 다음과 같은 특징을 갖습니다.

- 문자 상황에 대한 잘못된 해결책
- 잘못된 패턴을 사용하여 문제를 해결하려는 시도

이를 통해 우리가 배워야할 점은 **올바른 해결책을 찾아야 한다**는 것입니다.

안티패턴을 아는 것은 빠르게 문제점을 파악하고 해결하는데 도움이 됩니다. 안티 패턴을 알고 있다면 이를 피할 수 있습니다.

### 자바스크립트 안티 패턴

> 자바스크립트는 느슨한 타입을 제공하기 떄문에 더욱 안티패턴을 많이 볼 수 있는 것 같습니다. 예시를 통해 알아보겠습니다.

- 전역 컨텍스트에 수많은 변수를 선언하는 것 -> 이는 전역 변수 오염을 일으킬 수 있습니다.
- setTimeout이나 setInterval 에 함수가 아닌 문자열을 전달하는 것 (eval 함수를 사용하는 것과 같은 문제)
- object.prototype을 확장하는 것 (이는 다른 라이브러리와 충돌을 일으킬 수 있습니다.)
- document.createElement를 대신 document.write를 사용하는 것 (https://developer.mozilla.org/en-US/docs/Web/API/Document/write)

</details>

## 5장

<details>
  <summary>최신 자바스크립트 문법과 기능</summary>

### 애플리케이션 분리의 중요성

> 자바스크립트는 모듈이라는 단위로 쪼갤 수 있습니다. 이를 통해 코드를 분리하고 관리할 수 있습니다. 이를 통해 코드의 가독성을 높이고 유지보수를 쉽게 할 수 있습니다.

이전에는 AMD, CommonJS, UMD 등의 모듈 시스템을 사용했지만, 이제는 ES6의 import/export를 사용합니다.

### 모듈 가저오기와 내보내기

> 모듈형 javascript는 의전성을 가진 모듈을 import하여 가져오고, export하여 내보내는 방식을 사용합니다.

```javascript
// math.js
export const sum = (a, b) => a + b;
export const sub = (a, b) => a - b;

// index.js
import { sum, sub } from "./math.js";
console.log(sum(1, 2)); // 3
console.log(sub(1, 2)); // -1
```

- 추가적인 특징으로는 import 문을 사용하면, 기존 변수명과 겹치지 않도록 이름을 변경할 수 있습니다.
- export로 내보내진 모듈은 기본적으로 읽기 전용이기 때문에, 내보내진 모듈을 수정하려고 하면 에러가 발생합니다.

```javascript
import { sum as add, sub as subtract } from "./math.js";
console.log(add(1, 2)); // 3
add = 1; // TypeError: Assignment to constant variable.

// math.js
export const sum = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

### 모듈 객체

> 모듈을 객체로 가져오면 모듈의 모든 내용을 가져올 수 있습니다.

```javascript
// math.js
export const Math = {
  sum: (a, b) => a + b,
  sub: (a, b) => a - b,
};

// index.js
import { Math } from "./math.js";
console.log(Math.sum(1, 2)); // 3
console.log(Math.sub(1, 2)); // -1
```

### 외부 소스 가져오기

> 외부 소스를 가져오는 방법은 다음과 같습니다.

```javascript
// index.js
import { sum } from "https://example.com/math.js";
console.log(sum(1, 2)); // 3
```

### 정적 모듈 가져오기와 동적 모듈 가져오기

> 정적 모듈 가져오기는 import 구문을 사용하여 모듈을 가져오는 것을 말합니다. 반면 동적 모듈 가져오기는 import() 함수를 사용하여 모듈을 가져오는 것을 말합니다.

```javascript
// 정적 모듈 가져오기
import { sum } from "./math.js";

// 동적 모듈 가져오기
import("./math.js").then((math) => {
  console.log(math.sum(1, 2)); // 3
});
```

동적 모듈 가져오기는 코드를 실행하는 시점에 모듈을 가져오기 때문에 필요한 시점에 모듈을 가져올 수 있습니다.
만약 매우 큰 모듈일 경우 초기 로딩 시간을 줄일 수 있습니다. import() 함수는 Promise를 반환하기 때문에 then 메서드를 사용하여 모듈을 가져올 수 있습니다. (async/await도 사용 가능)

### 사용자 상호작용에 따라 가져오기 (ex 화면에 보이면 가져오기)

> 사용자 상호작용에 따라 모듈을 가져오는 방법은 다음과 같습니다.

```javascript
// index.js
document.getElementById("button").addEventListener("click", async () => {
  const math = await import("./math.js");
  console.log(math.sum(1, 2)); // 3
});

// 화면에 보일때 가져오기 (IntersectionObserver)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      import("./math.js").then((math) => {
        console.log(math.sum(1, 2)); // 3
      });
    }
  });
});
```

### 모듈 사용의 장점

- 한 번에 필요한 모듈만 가져올 수 있습니다.
- 코드를 분리하여 재사용할 수 있습니다.
- 자동으로 지연 로딩을 지원합니다.
- 네임스페이스 충돌을 방지합니다.
- 사용하지 않는 코드를 제거할 수 있습니다. (트리 쉐이킹, 번들러를 통해 사용하지 않는 코드를 제거)

### 생성자, getter, setter를 가진 클래스

> ES6에서는 클래스를 사용하여 객체를 생성할 수 있습니다. 클래스는 생성자, getter, setter를 가질 수 있습니다.

```javascript
class Person {
  // 생성자 -> 객체를 생성할 때 호출되는 메서드, 객체의 초기화를 담당(변수 정의)
  constructor(name) {
    this.name = name;
  }

  // getter
  get name() {
    return this._name;
  }

  // setter
  set name(value) {
    this._name = value;
  }
}

const person = new Person("John");
console.log(person.name); // John
person.name = "Jane";
console.log(person.name); // Jane
```

이외로 클래스는 상속을 지원하고, 정적 메서드, 인스턴스 메서드, 비공개 필드를 지원합니다.

- 상속 : extends 키워드를 사용하여 상속을 받을 수 있습니다. (super 키워드를 사용하여 부모 클래스의 메서드를 호출할 수 있습니다.)
- 정적 메서드 : static 키워드를 사용하여 정적 메서드를 정의할 수 있습니다.
- 인스턴스 메서드 : 클래스 내부에 메서드를 정의하면 인스턴스 메서드가 됩니다.
- 비공개 필드 : # 키워드를 사용하여 비공개 필드를 정의할 수 있습니다.

</details>

## 6장

<details>
  <summary>디자인 패턴의 유형</summary>

### 배경

> 디자인 패턴은 크게 생성 패턴, 구조 패턴, 행동 패턴으로 나눌 수 있습니다. 이 책에서는 이 세 가지 유형을 다룹니다.

### 생성 패턴

> 생성 패턴은 객체를 생성하는 방법을 다룹니다. 생성 패턴은 객체를 생성하는 방법을 추상화하여 객체를 생성하는 방법을 다양하게 제공합니다.

- 생성자 패턴(Constructor Pattern)
- 팩토리 패턴(Factory Pattern)
- 추상 팩토리 패턴(Abstract Factory Pattern)
- 빌더 패턴(Builder Pattern)
- 프로토타입 패턴(Prototype Pattern)
- 싱글턴 패턴(Singleton Pattern)

### 구조 패턴

> 구조 패턴은 객체와 클래스를 조합하여 더 큰 구조를 만드는 방법을 다룹니다. 구조 패턴은 객체와 클래스를 조합하여 더 큰 구조를 만드는 방법을 추상화하여 제공합니다.

- 어댑터 패턴(Adapter Pattern)
- 브릿지 패턴(Bridge Pattern)
- 데코레이터 패턴(Decorator Pattern)
- 퍼사드 패턴(Facade Pattern)
- 플라이웨이트 패턴(Flyweight Pattern)
- 프록시 패턴(Proxy Pattern)

### 행동 패턴

> 행동 패턴은 객체 간의 상호작용을 다룹니다. 행동 패턴은 객체 간의 상호작용을 추상화하여 제공합니다.

- 이터레이터 패턴(Iterator Pattern)
- 중재자 패턴(Mediator Pattern)
- 관찰자 패턴(Observer Pattern)
- 방문자 패턴(Visitor Pattern)

### 디자인 패턴의 분류

> GoF 디자인 패턴 23가지를 생성 패턴, 구조 패턴, 행동 패턴으로 분류하면 다음과 같습니다.

<!-- 표로 설명 패턴이름 / 패턴 종류(생성, 구조, 행동) / 기반 (클래스, 객체) / 설명 -->

| 패턴 이름                | 패턴 종류 | 기반   | 설명                                                                                                        |
| ------------------------ | --------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| 팩토리 메서드            | 생성      | 클래스 | 인터페이스를 통해 객체를 생성하는 방법을 제공합니다.                                                        |
| 추상 팩토리              | 생성      | 객체   | 구체적인 클래스를 지정하지 않고 여러 클래스가 상속받은 인터페이스를 통해 객체를 생성하는 방법을 제공합니다. |
| 빌더                     | 생성      | 객체   | 객체 생성과 내부 구현을 분리하여 항상 같은 객체 생성을 보장하는 방법을 제공합니다.                          |
| 프로토타입               | 생성      | 객체   | 객체를 복사하여 새로운 객체를 생성하는 방법을 제공합니다.                                                   |
| 싱글턴                   | 생성      | 클래스 | 객체를 하나만 생성하여 전역적으로 사용하는 방법을 제공합니다.                                               |
| ---                      | ---       | ---    | ---                                                                                                         |
| 어댑터                   | 구조      | 클래스 | 호환되지 않는 인터페이스를 호환되는 인터페이스로 변환하는 방법을 제공합니다.                                |
| 브릿지                   | 구조      | 객체   | 추상화와 구현을 분리하여 두 개의 계층을 독립적으로 확장하는 방법을 제공합니다.                              |
| 데코레이터               | 구조      | 객체   | 객체에 새로운 기능을 추가하는 방법을 제공합니다.                                                            |
| 퍼사드                   | 구조      | 객체   | 전체 시스템의 복잡성을 감추고 간단한 인터페이스를 제공하는 방법을 제공합니다.                               |
| 플라이웨이트             | 구조      | 객체   | 객체를 공유하여 메모리 사용을 최적화하는 방법을 제공합니다.                                                 |
| 프록시                   | 구조      | 객체   | 실제 객체를 대신하여 대체 객체를 제공하는 방법을 제공합니다.                                                |
| 컴포지트                 | 구조      | 객체   | 합친 상태 이상의 효과를 제공하는 방법을 제공합니다.                                                         |
| ---                      | ---       | ---    | ---                                                                                                         |
| 인터프리터               | 행동      | 클래스 | 문법 규칙을 해석하여 실행하는 방법을 제공합니다.                                                            |
| 템플릿 메서드            | 행동      | 클래스 | 상위 클래스에서 구조를 정의하고 하위 클래스에서 구체적인 내용을 구현하는 방법을 제공합니다.                 |
| 체인 오브 리스폰시빌리티 | 행동      | 객체   | 요청을 처리할 수 있는 객체를 연결하여 요청을 처리하는 방법을 제공합니다.                                    |
| 커멘드                   | 행동      | 객체   | 요청을 객체로 캡슐화하여 요청을 처리하는 방법을 제공합니다.                                                 |
| 이터레이터               | 행동      | 객체   | 객체의 요소를 순서대로 접근하는 방법을 제공합니다.                                                          |
| 중재자                   | 행동      | 객체   | 객체 간의 상호작용을 중재하여 객체 간의 결합도를 낮추는 방법을 제공합니다.                                  |
| 관찰자                   | 행동      | 객체   | 객체의 상태 변화를 관찰하여 상태 변화에 따라 객체를 갱신하는 방법을 제공합니다.                             |
| 상태                     | 행동      | 객체   | 객체의 상태에 따라 객체의 행동을 변경하는 방법을 제공합니다.                                                |
| 전략                     | 행동      | 객체   | 알고리즘을 캡슐화하여 동적으로 변경하는 방법을 제공합니다.                                                  |
| 방문자                   | 행동      | 객체   | 객체의 구조와 기능을 분리하여 기능을 추가하는 방법을 제공합니다.                                            |

</details>

## 7장

<details>
  <summary>자바스크립트 디자인 패턴 - 분량 많음</summary>

### 생성자 패턴

> 생성 패턴은 객체를 생성하는 방법을 다룹니다. (생성자 패턴, 모듈 패턴, 노출 모듈 패턴, 팩토리 패턴, 프로토타입 패턴, 싱글턴 패턴)

생성자 (constructor)는 객체가 새로 만들어진 뒤 초기화를 위해 호출되는 함수입니다. 생성자 함수는 new 키워드를 사용하여 호출됩니다.

자바스크립트에서 거의 모든 것은 객체입니다. 그리고 클래스는 자바스크립트가 가진 프로토타입의 상속을 이용한 문법적 설탕입니다.

### 객체를 생성하는 방법

> 객체를 생성하는 방법은 다음과 같습니다.

- 객체 리터럴
- 생성자 함수
- Object.create 메서드
- 클래스

```javascript
// 객체 리터럴
const obj = { name: "John" };

// 생성자 함수
function Person(name) {
  this.name = name;
}
const person = new Person("John");

// Object.create 메서드
const obj = Object.create({ name: "John" });

// 클래스
class Person {
  constructor(name) {
    this.name = name;
  }
}
const person = new Person("John");
```

**객체에 키와 값을 추가하는 방법**

```javascript
// dot notation
obj.name = "John";
const name = obj.name;

// bracket notation
obj["name"] = "John";
const name = obj["name"];

// es5
Object.defineProperty(obj, "name", {
  value: "John",
  writable: true,
  enumerable: true,
  configurable: true,
});

// 위의 방식을 함수로 만들어 사용
function defineProp(obj, key, value) {
  const config = {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  };
  Object.defineProperty(obj, key, config);
}

const person = {};

defineProp(person, "name", "John");
console.log(person.name); // John

// defineProperties 함수를 사용하여 여러 개의 속성을 추가할 수 있습니다.
object.defineProperties(person, {
  name: {
    value: "John",
    writable: true,
  },
  age: {
    value: 30,
    writable: false,
  },
});
```

**객체를 상속하는 방법**

```javascript
// Object.create 메서드를 사용하여 객체를 상속할 수 있습니다.
const parent = {
  name: "John",
  age: 30,
};

const child = Object.create(parent);
console.log(child.name); // John
console.log(child.age); // 30
```

### 생성자의 기본 특징

> ES2015에 도입된 클래스는 객체 템플릿을 정의하고 캡슐화 및 상속을 지원하는 방법을 제공합니다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person_John = new Person("John", 30);
const person_Jane = new Person("Jane", 25);
console.log(person_John.name); // John
console.log(person_Jane.name); // Jane

console.log(person_John.age); // 30
console.log(person_Jane.age); // 25
```

### 프로토 타입을 가진 생성자

> 프로토타입은 객체의 부모 역할을 하는 객체입니다. 모든 객체는 프로토타입을 가지고 있습니다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
};

Person.prototype.getAge = function () {
  return this.age;
};

const person = new Person("John", 30);
console.log(person.getName()); // John
console.log(person.getAge()); // 30

const person2 = new Person("Jane", 25);
console.log(person2.getName()); // Jane
console.log(person2.getAge()); // 25
```

### 모듈 패턴

> 모듈은 코드를 논리적인 단위로 분리하는 방법을 제공합니다. 모듈은 코드를 재사용하고 관리하기 쉽게 만들어줍니다.

- 객체 리터럴 : 키와 값을 중괄호로 묶어 객체를 생성하는 방법

```javascript
const module = {
  name: "John",
  age: 30,
  getName: function () {
    return this.name;
  },
  getAge: function () {
    return this.age;
  },

  sayHello: function () {
    return `Hello, i am ${this.name} and i am ${this.age} years old.`;
  },
};

console.log(module.getName()); // John
console.log(module.getAge()); // 30
console.log(module.sayHello()); // Hello, i am John and i am 30 years old.
```

- 모듈 패턴 : 모듈 패턴은 전통적인 소프트웨어 엔지니어링 분야에서 클래스의 캡슐화를 위해 처음 고안 되었습니다.
- 비공개 : 모듈 패턴은 클로저(closure)를 사용하여 비공개 변수와 메서드를 만들 수 있습니다.

```javascript
const basket = [];

const doSomethingPrivate = () => {
  console.log("private");
};

const doSomething = () => {
  console.log("public");
};

const basektModule = {
  addItem(value) {
    basket.push(value);
  },

  getItemCount() {
    return basket.length;
  },

  doSomething() {
    doSomethingPrivate();
  },

  getTotal() {
    return basket.reduce((acc, cur) => acc + cur, 0);
  },
};

export default basektModule;
```

- 모듈 가져오기 : 모듈을 가져오는 방법은 다음과 같습니다.

```javascript
import basketModule from "./basket.js";

basketModule.addItem({ item: "apple", price: 10 });

basketModule.addItem({ item: "banana", price: 5 });

console.log(basketModule.getItemCount()); // 2
console.log(basketModule.getTotal()); // 15
```

- 각 메서드는 외부에서 접근할 수 없습니다. 이는 클로저를 사용하여 비공개 변수와 메서드를 만들었기 때문입니다.
- basket 변수는 외부에서 접근할 수 없습니다. 이는 클로저를 사용하여 비공개 변수를 만들었기 때문입니다. 오직 해당 모듈을 통해서만 접근할 수 있습니다.
- 비공개 메서드인 doSomethingPrivate 메서드는 외부에서 접근할 수 없습니다.
- 장점 : 모듈 패턴은 코드를 캡슐화하여 재사용성을 높이고 코드를 관리하기 쉽게 만들어줍니다.

WeekMap을 사용하는 최신 모듈 패턴

```javascript
const module = (function () {
  const privateData = new WeakMap();

  class Module {
    constructor() {
      privateData.set(this, {
        name: "John",
        age: 30,
      });
    }

    getName() {
      return privateData.get(this).name;
    }

    getAge() {
      return privateData.get(this).age;
    }
  }

  return Module;
})();

const moduleInstance = new module();
console.log(moduleInstance.getName()); // John
console.log(moduleInstance.getAge()); // 30
```

- WeakMap : WeakMap은 키와 값을 가지는 객체를 저장하는 자료구조입니다. WeakMap은 키가 가비지 컬렉션의 대상이 될 수 있습니다. 참조하는 객체가 없을 경우 가비지 컬렉션의 대상이 됩니다.

### 싱글턴 패턴

> 싱글턴 패턴은 객체를 하나만 생성하여 전역적으로 사용하는 방법을 제공합니다.

싱글턴 패턴은 정적 클래스나 객체와는 다르게 초기화를 지연시킬 수 있습니다. 왜냐하면 초기화 시점에 필요한 특정 정보가 유효하지 않을 수 있기 때문입니다.

```javascript
let instance = null;

const privateData = new WeakMap();
const privateMethod = () => {
  console.log("private method");
};

class Singleton {
  constructor() {
    // 이미 인스턴스가 존재하면 인스턴스를 반환 -> 싱글턴 패턴
    if (!instance) {
      instance = this;
    }

    privateData.set(this, {
      name: "John",
      age: 30,
    });

    return instance;
  }

  getName() {
    return privateData.get(this).name;
  }

  getAge() {
    return privateData.get(this).age;
  }

  sayHello() {
    privateMethod();
    return `Hello, i am ${privateData.get(this).name} and i am ${
      privateData.get(this).age
    } years old.`;
  }
}

export default Singleton;

// 사용
import Singleton from "./singleton.js";

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
console.log(instance1.getName()); // John
console.log(instance1.getAge()); // 30
console.log(instance1.sayHello()); // Hello, i am John and i am 30 years old.

console.log(instance2.getName()); // John
console.log(instance2.getAge()); // 30
console.log(instance2.sayHello()); // Hello, i am John and i am 30 years old.
```

- 클래스의 인스턴스는 정확히 하나만 있어야 하며 눈에 잘 보이는 곳에 위치시켜 접근을 용이하게 해야 합니다.
- 싱글톤의 인스턴스는 서브클래싱(subclassing)을 통해서만 확잘할 수 있고, 코드 수정 없이 확장된 인스턴스를 만들 수 있어야 합니다.

### 리액트의 상태 관리

> 리액트에서 상태 관리를 위해 Context API를 사용할 수 있습니다. Context API는 리액트 컴포넌트 트리 전체에 데이터를 제공하는 방법을 제공합니다.

싱글턴은 만능이 아닙니다. 정말 필요한 경우에만 사용해야 합니다.

### 프로토타입 패턴

> 이미 존재하는 객체를 복사하여 새로운 객체를 생성하는 방법을 제공합니다. 프로토타입 패턴은 상속을 통해 객체를 생성하는 방법을 제공합니다.

```javascript
const person = {
  name: "John",
  age: 30,
  getName() {
    return this.name;
  },
  getAge() {
    return this.age;
  },
};

const person2 = Object.create(person);
console.log(person2.getName()); // John
console.log(person2.getAge()); // 30

// 값을 추가하여 새로운 객체를 생성할 수 있습니다.
const person3 = Object.create(person, {
  name: {
    value: "Jane",
  },
  age: {
    value: 25,
  },
});

console.log(person3.getName()); // Jane
console.log(person3.getAge()); // 25
```

### 팩토리 패턴

> 생성자를 필요로하지 않고, 필요한 타입의 객체를 생성하는 방법을 제공합니다.

```javascript
class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "white";
  }
}

class Truck {
  constructor(options) {
    this.doors = options.doors || 2;
    this.state = options.state || "used";
    this.color = options.color || "black";
  }
}

class VehicleFactory {
  createVehicle(options) {
    if (options.vehicleType === "car") {
      return new Car(options);
    } else if (options.vehicleType === "truck") {
      return new Truck(options);
    }
  }
}

const factory = new VehicleFactory();

const car = factory.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6,
});

const truck = factory.createVehicle({
  vehicleType: "truck",
  color: "blue",
  doors: 4,
});

console.log(car instanceof Car); // true
console.log(car); // Car { doors: 6, state: 'brand new', color: 'yellow' }
```

장점

- 객체나 컴포넌트의 생성 과정이 높은 복잡성을 가질 때
- 상황에 따라 다양한 객체 인스턴스를 편리하게 생성할 때
- 같은 속성을 공유하는 객체를 생성할 때
- duck typing처럼 같은 api 규칙만 충족하면 되는 다른 객체를 생성할 때

단점

- 객체 생성 과정을 추상화하기 때문에 테스트하기 어려울 수 있습니다.
- 프레임워크나 라이브러리 설계가 아니면 생성자를 사용하는 것이 더 좋을 수 있습니다.

### 추상 팩토리 패턴

> 추상 팩토리 패턴은 관련성 있는 객체를 생성하는 방법을 제공합니다. 추상 팩토리 패턴은 팩토리 패턴을 추상화하여 관련성 있는 객체를 생성하는 방법을 제공합니다.

객체의 생성 과정에 영향을 받지 않아야 하거나 여러 타입의 객체로 작업해야 하는 경우에 추상 팩토리를 사용하면 좋습니다.

```javascript
class AbstractVehicleFactory {
  constructor() {
    this.types = {};
  }

  getVehicle(type, customizations) {
    const Vehicle = this.types[type];
    return new Vehicle(customizations);
  }

  registerVehicle(type, Vehicle) {
    if (Vehicle.prototype.drive && Vehicle.prototype.breakDown) {
      this.types[type] = Vehicle;
    } else {
      console.log("Vehicle is invalid");
    }
  }
}

const abstractVehicleFactory = new AbstractVehicleFactory();

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// 추상 차량 타입으로 새 자동차를 인스턴스화합니다.
const car = abstractVehicleFactory.getVehicle("car", {
  color: "lime green",
  state: "like new",
});

// 비슷한 방법으로 트럭도 인스턴스화할 수 있습니다.
const truck = abstractVehicleFactory.getVehicle("truck", {
  wheelSize: "medium",
  color: "neon yellow",
});
```

### 구조 패턴

> 구조 패턴은 클래스와 객체의 구성을 다룹니다. 상속의 개념을 활용하여 객체와 클래스를 조합하여 더 큰 구조를 만드는 방법을 제공합니다.

- 퍼사드 패턴
- 믹스인 패턴
- 데코레이터 패턴
- 플라이웨이트 패턴

### 퍼사드 패턴

> 퍼사드란 실제 모습을 숨기고 꾸며낸 겉모습만을 세상에 드러내는 것을 말합니다. 퍼사드 패턴은 복잡한 시스템을 단순하게 표현하는 방법을 제공합니다.

대표적인 예로 jQuery가 있습니다. jQuery는 DOM 조작을 쉽게 하기 위해 퍼사드 패턴을 사용합니다.

예를들 들어 jQuery의 `$(document).ready()`는 DOM이 준비되면 함수를 실행하는 방법을 제공합니다.

```javascript
const addCustomEvent = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn);
  } else {
    el[`on${ev}`] = fn;
  }
};
```

jQuery의 `${document}.ready()`를 사용하여 이벤트를 추가할 수 있습니다.

```javascript
$(document).ready(() => {
  const el = document.getElementById("myId");
  addCustomEvent(el, "click", () => {
    console.log("clicked");
  });
});
```

퍼스드 패턴의 장점은 내부의 복잡한 로직을 모르더라도 쉽게 사용할 수 있다는 것입니다.

### 믹스인 패턴

> C++나 다른 전통적인 프로그래밍 언어에서 믹스인은 서브클랙스가 쉽게 상속받아 기능을 재사용할 수 있도록 하는 클래스입니다.

**서브클래싱이란?**

- 부모 클래스 객체에서 속성을 상속받아 새로운 객체를 만드는 것을 뜻합니다.
- 서브클래스의 메서드는 오버라이드된 부모 클래스의 메서드를 호출할 수 있습니다. (메서드 체이닝)
- 마찬가지로 부모 클래스의 생성자를 호출할 수 있다 (생성자 체이닝)

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayHello() {
    return `Hello, i am ${this.firstName} ${this.lastName}`;
  }
}

class SuperHero extends Person {
  constructor(firstName, lastName, superPower) {
    // 부모 클래스의 생성자를 호출
    super(firstName, lastName);
    this.superPower = superPower;
  }

  usePower() {
    return `${this.superPower}!`;
  }
}

const superman = new SuperHero("Clark", "Kent", "Fly");
```

**믹스인 활용하기**

- JS에서는 기능의 확장을 위해 믹스인의 상속을 이용한다.
- 믹스인 은 다른 여러 클래스를 아울러 쉽게 공유할 수 있는 속성과 메서드를 가진 클래스 입니다.

```javascript
const MyMixin = (superclass) =>
  class extends superclass {
    moveUp() {
      console.log("move up");
    }

    moveDown() {
      console.log("move down");
    }

    stop() {
      console.log("stop");
    }
  };

class CarAnimator {
  constructor() {
    this.moveLeft = () => {
      console.log("move left");
    };
  }
}

class PersonAnimator {
  constructor() {
    this.moveRandomly = () => {
      console.log("move randomly");
    };
  }
}

class Car extends MyMixin(CarAnimator) {}

class Person extends MyMixin(PersonAnimator) {}

const car = new Car();
const person = new Person();

car.moveLeft();
car.moveUp();
car.stop();

person.moveRandomly();
person.moveDown();
person.stop();
```

장점과 단점

- 장점 : 함수의 중복을 줄이고, 코드의 재사용성을 높일 수 있습니다.
- 단점 : 믹스인을 사용하면 코드의 복잡성이 증가할 수 있습니다. 그래서 안좋은 코드를 만들어 낼 수 있는 위험이 있는 패턴입니다. (출처를 알 수 없는 믹스인을 사용하면 코드의 추적이 어려워질 수 있습니다.)

ex 리액트에서도 믹스인을 반대하고 대신 고차 컴포넌트(HOC) 혹은 Hooks를 사용합니다.

### 데코레이터 패턴

> 데코레이터 패턴은 객체에 추가적인 기능을 동적으로 첨가하는 방법을 제공합니다.

```javascript
class MacBook {
  constructor() {
    this.cost = 997;
    this.screenSize = 11.6;
  }

  cost() {
    return this.cost;
  }

  screenSize() {
    return this.screenSize;
  }
}

class Memory extends MacBook {
  constructor(macbook) {
    super();
    this.macbook = macbook;
  }

  cost() {
    return this.macbook.cost() + 75;
  }
}

class Engraving extends MacBook {
  constructor(macbook) {
    super();
    this.macbook = macbook;
  }

  cost() {
    return this.macbook.cost() + 200;
  }
}

class Insurance extends MacBook {
  constructor(macbook) {
    super();
    this.macbook = macbook;
  }

  cost() {
    return this.macbook.cost() + 250;
  }
}

let mb = new MacBook();

mb = new Memory(mb);
mb = new Engraving(mb);
mb = new Insurance(mb);

console.log(mb.cost()); // 1522
console.log(mb.screenSize()); // 11.6
```

### 플라이웨이트 패턴

> 반복되고 느리고 비효율적으로 데이터를 공유하는 것을 방지하기 위해 객체를 공유하는 방법을 제공합니다. 연관성이 있는 객체를 공유하여 메모리 사용을 최적화하는 방법을 제공합니다.

```javascript

</details>
```
