# you don't know js

- 독서 기간 (2024.11.18 ~ ) / 스터디를 통해 진행
- 목적 : JS 기반으로 알고리즘 공부와 더불어 코딩 테스트 준비

## 목차 요약

- 1장 ~ 4장 자바스크립트 개념 / 1장 ~ 8장 스코프와 클로저
- 총 341 Page
- 연습하기는 스터디로 진행하진 않을 예정

## 스터디 진행

- 기간 : 11월 18일 부터 진행 ~ 약 2달 예상
- 날짜 : 매주 목요일, 10시부터 진행할 예정 (수정 가능성 있습니다)
- 한번 스터디때마다 2명이 발표를 하고, 간단한 퀴즈까지 내주시면 감사합니다. (퀴즈는 필수 아님)
  발표시간은 30분 이내로 하는 것이 적당할 듯 하고, 디스코드에서 진행합니다.
- 발표자 이외의 분들도 책을 읽어오면 좋을 것 같아요 (권장)
- 발표자 2명은 제가 랜덤 순서를 정하겠습니다.
- 요약 : 매주 하루, 2명 발표, 둘이 각각 1장(챕터) 발표
- 특이사항 : 짧은 챕터는 한명이 2장을 발표하겠습니다.

## Intro & part 1

<details>
  <summary>ch1 자바스크립트</summary>

> 자바스크립트에 마스터는 없습니다. 더 익숙해지고 친해질 수 있습니다.
> 이 책은 자바스크립트와 가까워지기 위한 여행이 될 것 입니다.

## 1.1 책에 대하여

자바스크립트 정복은 목적지가 아니라 바라봐야할 방향입니다.
조급하게 이 책을 후딱 읽고 끝낸다는 마음보다, 천천히 인내와 끈기를 갖고 읽기 바랍니다.

## 1.2 이름의 유래

자바 사용자에게 마케팅하기 위해 자바 + (가벼운)스크립트 언어 라는 의미로 만들어졌습니다.

TC39에서 지정하고 공식화된 명칭은 ECMAScript 입니다.
ES6는 ECMAScript 2015로도 불립니다. (ES6는 2015년에 나왔기 때문)

> 자바스크립트와 자바의 관계는 햄스터와 햄의 관계와 같습니다.

## 1.3 명세서

TC39는 js를 관리하는 운영 위원회입니다.
제안 단계는 0 ~ 4단계로 나뉩니다.

누구나 제안을 할 수 있지만, TC39의 승인을 받아야합니다. (https://github.com/tc39/proposals)

js는 버전이 없습니다. 공식적인 표준 js는 오직 하나입니다.

모든 브라우저, 디바이스 제조사는 단 하나뿐인 명세서를 기준으로 js 구현체를 만듭니다.

### JS를 지배하는 웹

JS 구현체를 만들 때 가장 중요시 되는 분야는 역시나 웹 환경입니다.

JS 엔진 제조사들은 js 구현체를 만들 때, 여러 상황에 대한 엣지 케이스를 고려하여 발전해 왔습니다.

이런 상황에서 JS 명세서가 업데이트 되었을 때, 엔진 제조사들은 명세서를 준수하도록 엔진을 업데이트 하거나 명세서 개정안을 자사 엔진에 반영하지 않겠다는 결정을 합니다.

만약 자사 엔진에 반영하지 않는다고 했을 때에는, TC39 위원회는 종종 기존 결정을 철회하고 명세서를 웹에 맞게 수정합니다. (ex. contains -> includes, flatten -> flat)

### JS지만 JS가 아닌 웹 전용 문법 (feat: alert)

```javascript
alert("Hello, World!");
```

이 코드는 **모든 웹** 전용 문법입니다. (alert는 브라우저에서만 동작합니다.)

브라우저 엔진, Node js 등과 같이 JS가 실행되는 환경은 전역 스코프에 API를 추가해 자체적으로 사용할 수 있는 기능을 제공합니다. (ex. alert)

alert 말고도 다양한 API가 있습니다. (ex. fetch, getCurrentLocation)

node js는 브라우저에서 사용할 수 없는 API를 제공합니다. (ex. fs, http)

우리가 자주 사용하는 console.log도 브라우저에서만 사용할 수 있는 API입니다.

이 처럼 console.log 코드를 본다면 호출은 JS지만, console.log는 명세서에 없는 웹 전용 문법이라는 것을 알 수 있습니다.

### 모든 코드가 JS인 것은 아닙니다.

개발자 도구의 경우 가장 중요시하는 것은 DX입니다. (Developer Experience)

그렇기 때문에 개발자 도구에서의 결과가 JS 명세서와 일치하지 않을 수 있습니다.

예를 들어 "전역 스코프 최상위 레벨에서 let과 const로 변수 여러 개를 선언했을 때 작동 방식"은 실제 명세서와는 다를 수 있습니다.

정확한 내용을 알고 싶다면 명세서를 참고해야합니다.

## 1.4 JS의 다양한 얼굴

프로그래밍에서는 "패러다임" 이라는 용어를 통해, 코드를 어떤식으로 작성할지에 대한 방법론을 제시합니다.

대표적인 패러다임은 다음과 같습니다.

- 절차적 프로그래밍 : 코드가 탑다운이면서 선현적으로 구조화, 이때 프로시저라 불리는 코드 단위에 미리 정해진 일련의 연산을 작성합니다.
- 객체지향 프로그래밍 : 코드를 클래스 단위로 구조화, 클래스는 데이터와 동작을 함께 묶어서 관리합니다.
- 함수형 프로그래밍 : 코드를 함수 단위로 구조화, 이때 함수는 순수하고 불변적이어야합니다. 또한 함수 자체가 값이 될 수 있습니다.

패러다임에 옳고 그름은 없습니다. 어떤 패러다임이든 적절한 상황이 있습니다.

특정 언어의 경우 지향하는 패러다임이 있지만 (C언어는 절차적, Java는 객체지향) JS는 다양한 패러다임을 지원합니다. 이를 다중 패러다임 언어라고 합니다.

## 1.5 하위 호환성과 상위 호환성

JS는 하위 호환성을 중요시합니다. (ex. ES6 코드는 ES5 엔진에서도 동작해야합니다.)

TC39 위원회는 새로운 기능을 추가할 때, 기존 코드와 충돌이 없도록 설계합니다. 그리고 "우리는 절대 웹을 망치지 않을 것이다" 라는 신념을 가지고 있습니다.

이에 장점만 있는 것은 아닙니다. 단점으로는 한번의 실수로 영원히 고치지 못하는 명세가 발생할 수 있습니다. 그만큼 엄격한 기준과 테스트를 필요로 합니다.

다만 예외적인 경우도 있습니다만, 매우 드물고 특별한 경우입니다.

이와 반대개념인 상위 호환성에 대해 알아보겠습니다.

일단 JS는 상위 호환성을 지향하지 않습니다. 상위 호환성을 지원하는 대표적인 예시는 HTML과 CSS입니다.

HTML과 CSS에서는 본질상 선언적이므로, 인식되지 않는 선언은 무시하고 넘어갑니다.

### 간극을 메우는 노력

JS는 상위 호환성을 보장하지 않기에 오래된 엔진에서는 최신 기능을 사용할 수 없습니다. 이런 문제를 해결하기 위해 방법이 있습니다.

- 폴리필 : ES6 이상의 기능을 ES5 이하에서 사용할 수 있도록 도와주는 코드 조각입니다. (ex. core-js)
- 트랜스파일 : 코드를 변환하는 과정을 말합니다. (ex. babel)

바벨은 오래된 엔진에서도 최신 기능을 사용할 수 있도록 도와줍니다.

```javascript
// ES6
if (true) {
  let x = 2;
  console.log(x);
} else {
  let x = 3;
  console.log(x);
}
// let은 블록 스코프를 가지기 때문에 x는 블록 내부에서만 유효합니다.

// ES5 (바벨을 통해 변환된 코드)
var x$0, x$1;
if (true) {
  x$0 = 2;
  console.log(x);
} else {
  x$1 = 3;
  console.log(x);
}
```

그럼 그냥 옛날 방식으로 코딩하면 되지 않을까요? 그렇지 않습니다.

- ES6 이상의 기능은 코드를 더 명확하게 만들어줍니다.

이런 이유로 ES6 이상의 기능을 사용하는 것이 좋습니다. (다만, 폴리필과 트랜스파일을 통해 호환성을 지키는 것이 중요합니다.)

### 폴리필을 활용해서 극복하기

상위 호환성 문제가 새로운 문법이 아닌 근래에 추가되었지만, 아직 지원하지 않는 API 일 경우 폴리필을 사용할 수 있습니다.

```javascript
// finally 메서드는 ES6에 추가된 메서드입니다.
// 이 메서드는 Promise가 성공하든 실패하든 무조건 실행됩니다.

// 폴리필을 사용하지 않은 코드
promise
  .then(() => {
    // 성공
  })
  .catch(() => {
    // 실패
  })
  .finally(() => {
    // 무조건 실행
  });

// finally 메서드를 사용하기 위한 폴리필
if (typeof Promise.prototype.finally !== "function") {
  Promise.prototype.finally = function (callback) {
    return this.then(
      (value) => Promise.resolve(callback()).then(() => value),
      (reason) =>
        Promise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  };
}
```

폴리필에 대한 정보는 ES-Shim Repository에서 확인할 수 있습니다.

## 1.6 인터프리터 이해하기

인터프리터 언어 vs 컴파일러 언어

- 인터프리터 언어 : 코드를 한 줄씩 읽어가며 실행합니다. (ex. JS, Python)
- 컴파일러 언어 : 코드를 한 번에 컴파일하고 실행합니다. (ex. C, C++)

장단점은 다음과 같습니다.

- 인터프리터 언어 : 빠른 개발, 느린 실행 (실행 시간이 오래 걸릴 수 있음, 최적화가 어려울 수 있음)
- 컴파일러 언어 : 느린 개발, 빠른 실행 (컴파일 시간이 오래 걸릴 수 있음)

인터프리터 언어는 한 줄씩 읽기 때문에, 만약 5번째 줄에서 오류가 발생하면 1 ~ 4번째 줄까지는 실행이 되고 오류를 발경하지 못합니다. 근데 이렇게 오류 발견을 미루는 것은 때에 따라서는 문제가 될 수 있습니다.

**파싱(Parsing)**

파싱이라는 단계를 거치는 언어도 있습니다. 만약 파싱 단계가 있다면 5번째 줄에 오류를 사전에 발견하여 오류를 수정할 수 있습니다.

이렇게 된다면 syntax error(혹은 static error)를 미리 발견할 수 있습니다.

파싱이 끝난 후에는 파싱 결과인 AST(Abstract Syntax Tree)를 바탕으로 실행 단계로 넘어갑니다. 이런 파싱의 역할로 인해 파싱하는 언어는 컴파일 언어라고 통용되기도 합니다.

그럼 JS도 파싱을 거치는 언어인데, 컴파일 언어일까요? 대답은 컴파일 언어에 가깝다 입니다.

js -> 파싱(추상 구문 트리) -> 컴파일(바이트 코드) -> 실행

**JS로 만든 코드의 실행 절차**

1. 작성된 코드는 바벨이 트랜스파일합니다. 이후 번들러(webpack)가 코드를 하나로 묶습니다. 이 결과를 JS 엔진으로 보냅니다.
2. JS 엔진은 코드를 실행하기 전에 파싱합니다. 이때 추상 구문 트리(AST)를 만듭니다.
3. AST를 바이트 코드로 컴파일합니다. 이때 최적화를 수행합니다. (JIT 컴파일)
4. JS 가상 머신이 바이트 코드를 실행합니다.

<!-- img 추가 -->
<img src="/img/books/js/v8-overview.png" alt="v8-overview" width="500" height="300"/>

이런 특징들 덕분에 문법 오류를 미리 발견할 수 있고, 프로그램을 더 빠르게 완성할 수 있습니다.

### 웹어셈블리 (WebAssembly)

JS로 작성한 코드를 얼마나 빠르게 실행할 수 있을까요? 이런 고민에서 웹어셈블리가 탄생했습니다.

처음에는 ASM.js라는 프로젝트로 시작되었습니다. ASM.js는 JS로 작성된 코드를 최적화하여 빠르게 실행할 수 있도록 도와줍니다.

이후에 WASM(WebAssembly)가 등장했습니다. JS기반 개발자가 아니라도 JS 엔진에서 사용될 코드를 쉽게 작성할 수 있도록 도와줍니다. 특징으로는 파싱과 컴파일 단계를 거치지 않고, 바이트 코드로 바로 실행할 수 있습니다.

WASM은 웹을 위한 기술은 아닙니다. 다른 어떤 언어도 컴파일러만 있다면 WASM을 사용할 수 있습니다.

JS를 WASM이 대체하지는 않습니다. WASM은 JS와 함께 사용할 수 있는 기술입니다.

## 1.7 엄격 모드

엄격 모드는 JS의 버그를 줄이기 위해 만들어졌습니다.

엄격 모드는 다음과 같은 특징이 있습니다. (use strict)

- 선언되지 않은 변수를 사용하면 ReferenceError가 발생합니다.
- 함수의 매개변수 이름이 중복되면 SyntaxError가 발생합니다.
- with 문을 사용하면 SyntaxError가 발생합니다.
- eval 함수를 사용하면 SyntaxError가 발생합니다.

```javascript
// "use strict"; 는 함수 단위로도 사용할 수 있습니다. 점진적으로 적용할 때 사용할 수 있습니다.

function foo() {
  // 공백 혹은 주석만 use strict 위에 있을 수 있습니다.
  "use strict";
  x = 10; // ReferenceError: x is not defined
}
```

## 1.8 요약

- JS는 ECMAScript 명세서를 따르는 언어입니다.
- TC39 위원회가 명세서를 관리합니다.
- 브라우저를 비롯해 Node.js, Deno 등 다양한 환경에서 JS를 사용할 수 있습니다.

- JS는 다중 패러다임 언어입니다.
- 객제지향, 함수형, 절차적 프로그래밍을 지원합니다.

- JS는 컴파일 처리되는 언어입니다. (파싱, 컴파일, 실행 단계를 거칩니다.)

</details>

<details>
  <summary>ch2 자바스크립트 조망하기</summary>

> 가장 좋은 JS 학습 방법은 직접 코드를 작성해보는 것입니다.

## 2.1 파일은 프로그램입니다.

JS 파일을 하나의 프로그램이라고 생각해야합니다. 이런 마인드를 가져야하는 이유는 주로 오류 처리 때문입니다.

JS 파일을 모듈로 분리하고 이러한 모듈들의 조합으로 하나의 프로그램을 만들고, 빌드 도구를 사용해 하나의 파일로 만들어서 배포합니다.

그러므로 모듈 하나하나를 독립적인 작은 프로그램으로 생각하고, 이 프로그램들을 조합해 하나의 큰 프로그램을 만들어야합니다.

## 2.2 값

JS에서 값은 원시타입(Primitive Type)과 객체타입(Object Type)으로 나뉩니다.

### 원시타입

> 템플릿 리터럴은 문자열을 보다 편리하게 작성할 수 있도록 도와줍니다.

아래 코드는 다양한 string 표현 방법을 보여줍니다.

```javascript
let name = "world";
let greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, world!
console.log("Hello, " + name + "!"); // Hello, world!
console.log("Hello, " + name + "!"); // Hello, world!
```

- 템플릿 리터럴은 백틱(`)을 사용합니다. 변수를 ${}로 감싸서 사용합니다. 그냥 일반 string은 ""나 ''를 사용합니다.
- boolean은 true, false로 표현합니다.
- 매우 큰 정수를 표현할 때에는 BigInt를 사용합니다. (ex. 2n)
- null은 값이 없음을 나타내는 원시값입니다. (typeof null은 object입니다.)
- undefined는 값이 할당되지 않음을 나타내는 원시값입니다. (typeof undefined는 undefined입니다.)
- NaN은 숫자가 아님을 나타내는 원시값입니다. (typeof NaN은 number입니다.)
- symbol은 유일한 값을 나타내는 원시값입니다. (typeof symbol은 symbol입니다.)

### 배열과 객체

배열과 객체는 원시값과 달리 여러 값을 담을 수 있습니다.

```javascript
let arr = [1, 2, 3];
let obj = { a: 1, b: 2, c: 3 };

// 배열 안에는 다양한 타입의 값이 들어갈 수 있습니다.
// 객체, 배열, 함수 등 모든 타입이 들어갈 수 있습니다.
let mixed = [1, "two", [3], { four: 4 }, () => 5];

// 객체에 접근하는 방법
console.log(obj.a); // 1
console.log(obj["a"]); // 1
```

### 다시 한번 정리하는 값의 타입

```
typeof 42; // "number"
typeof "abc"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" <- null은 object로 나옵니다. 주의
typeof {}; // "object"
typeof []; // "object" <- 배열은 object로 나옵니다. 주의
typeof function () {}; // "function"
```

### 변수 선언과 사용

변수는 값을 담는 상자입니다. 변수를 선언할 때에는 let, const, var 키워드를 사용합니다.

- let : 재할당이 가능한 변수를 선언합니다. 블록 스코프입니다.
- const : 재할당이 불가능한 변수를 선언합니다. 블록 스코프입니다.
- var : let과 비슷하지만, 스코프가 함수 스코프입니다.

```javascript
// 할당 예시 코드
let x = 10;
const y = 20;
var z = 30;

x = 15; // 재할당 가능
y = 25; // 재할당 불가능
z = 35; // 재할당 가능

console.log(x, y, z); // 15 20 35

// 스코프 예시 코드
if (true) {
  let a = 10;
  const b = 20;
  var c = 30;
}

console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined
console.log(c); // 30
```

</details>

<details>
  <summary>ch3 자바스크립트 뿌리 파헤치기</summary>

## 3.1 이터레이션

이터레이션은 반복을 의미합니다. JS에서는 이터레이션을 위해 다양한 방법을 제공합니다.

JavaScript에서 반복자(Iterator)는 시퀀스를 정의하고 종료시의 반환값을 잠재적으로 정의하는 객체입니다. 더 구체적으로 말하자면, 반복자는 두 개의 속성( value, done)을 반환하는 next() 메소드 사용하여 객체의 Iterator protocol을 구현합니다. 시퀀스의 마지막 값이 이미 산출되었다면 done 값은 true 가 됩니다. 만약 value값이 done 과 함께 존재한다면, 그것은 반복자의 반환값이 됩니다.

```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  var nextIndex = start;
  var n = 0;

  var rangeIterator = {
    next: function () {
      var result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
      } else if (nextIndex == end) {
        result = { value: n, done: true };
      } else {
        result = { done: true };
      }
      nextIndex += step;
      n++;
      return result;
    },
  };
  return rangeIterator;
}
```

위 처럼 이터레이터를 만들 수 있습니다. 그러나 보통 generator를 사용합니다.

```javascript
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let n = 0;
  for (let i = start; i < end; i += step) {
    yield i;
    n++;
  }
  return n;
}

let it = makeRangeIterator(0, 10, 2);
console.log(it.next()); // { value: 0, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 4, done: false }
```

생성자 함수가 최초로 호출될 때, 함수 내부의 어떠한 코드도 실행되지 않고, 대신 생성자라고 불리는 반복자 타입을 반환합니다. 생성자의 next 메소드를 호출함으로서 어떤 값이 소비되면, 생성자 함수는 yield 키워드를 만날 때까지 실행됩니다.

### 이터레이터 사용하기 (for...of)

> 객체는 값이 for..of 구조 내에서 반복되는 것 같은 그 반복 동작을 정의하는 경우 반복이 가능(iterable)합니다. Array 또는 Map과 같은 일부 내장 형은 기본 반복 동작이 있지만 다른 형(가령 Object)은 없습니다.

```javascript
let arr = [1, 2, 3];

for (let value of arr) {
  console.log(value);
}
```

for...of 말고도 다양한 반복문이 있습니다.

- for...in : 객체의 열거 가능한 속성을 반복합니다.
- forEach : 배열의 각 요소에 대해 함수를 실행합니다.
- map : 배열의 각 요소에 대해 함수를 실행하고, 결과를 새로운 배열로 반환합니다.
- filter : 배열의 각 요소에 대해 함수를 실행하고, 결과가 true인 요소만을 새로운 배열로 반환합니다.
- reduce : 배열의 각 요소에 대해 함수를 실행하고, 하나의 결과값을 반환합니다.
- spread : 배열을 펼쳐서 전달합니다. (ex. Math.max(...arr))

### 이터러블

js에서 이터러블한 자료형은 문자열, 배열, 맵, 셋 등이 있습니다.

## 3.2 클로저

클로저는 함수와 함수가 선언된 렉시컬 환경의 조합입니다. 렉시컬 환경은 함수가 정의될 때의 환경을 말합니다.

```javascript
function addCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

let counter = addCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

let counter2 = addCounter();
console.log(counter2()); // 1
console.log(counter2()); // 2
console.log(counter2()); // 3
```

위 코드는 클로저를 사용한 예시입니다. makeAdder 함수는 클로저를 반환합니다. 이 클로저는 x를 기억하고 있습니다.

클로저는 함수가 선언될 때의 렉시컬 환경을 기억합니다. 이 덕분에 함수가 선언될 때의 환경을 기억하고, 이후에도 그 환경을 사용할 수 있습니다.

## this

this는 함수가 호출될 때 결정됩니다. this는 함수가 호출될 때, 함수를 호출한 객체를 참조합니다. (동적 바인딩)

<!-- 실행컨텍스트로 설명  -->

this가 가르키는 것은 실행 컨텍스트에 따라 달라집니다. 근데 실행 컨텍스트는 다음과 같은 순서로 결정됩니다.

1. 함수 호출 시점
2. 함수 호출 방식
3. 함수 호출 위치

```javascript
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} is teaching, ${this.student} is studying`);
  };
}

let assignment = classroom("Kyle");
assignment(); // Kyle is teaching, undefined is studying (this는 전역 객체를 가르킵니다.)

let workshop = {
  student: "Sally",
  assignment,
};

workshop.assignment(); // Kyle is teaching, Sally is studying (this는 workshop 객체를 가르킵니다.)

let workshop2 = {
  student: "Billy",
  assignment: assignment.bind({ student: "jane" }),
};

workshop2.assignment(); // Kyle is teaching, jane is studying (this는 jane을 가르킵니다.)
```

## prototype

모든 객체는 프로토타입을 가지고 있습니다. 프로토타입은 객체의 부모 역할을 합니다.

두 객체를 연결하는 연결 장치 입니다. 연결된 객체는 프로토타입 체인을 통해 서로 연결됩니다.

```javascript
let obj = { a: 1 };

let obj2 = Object.create(obj);

console.log(obj2.a); // 1
```

그러나 프로토타입을 조작하는 것은 권장되지 않습니다. 라이브러리에서 충돌이 발생할 수 있습니다.

### this + prototype

this와 prototype를 함께 사용하면, 객체의 메서드를 정의할 수 있습니다.

```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

let deepJS = new Workshop("Kyle");
let reactJS = new Workshop("Suzy");

deepJS.ask("Is 'prototype' a class?"); // Kyle Is 'prototype' a class?
reactJS.ask("Isn't 'prototype' ugly?"); // Suzy Isn't 'prototype' ugly?
```

</details>

## part 2

> 2부에서는 스코프 시스템과 클로저를 비롯해 모듈 디자인 패턴에 대해 다룹니다.

<details>
  <summary>ch1 스코프</summary>

이전에 JS는 실행 전 별도의 단계에서 파싱, 컴파일이 일어난다고 했었습니다. (v8 엔진)

## 컴파일러 vs 인터프리터

목적으로는 둘 다 "개발자가 작성한 코드를 기계가 이해할 수 있는 형태로 변환하는 것" 입니다.

- 컴파일러 : 코드를 한 번에 컴파일하고 변환합니다. (ex. C, C++)
- 인터프리터 : 코드를 한 줄씩 읽어가며 변환합니다. (ex. JS, Python)

## js 컴파일 과정

1. 토크나이징/렉싱 (Tokenizing/Lexing) : 문자열을 token이라는 의미 있는 조각으로 변환합니다. (ex. let a = 2; -> let, a, =, 2, ;)

2. 파싱 (Parsing) : token을 AST(Abstract Syntax Tree)로 변환합니다.
   파싱을 거치면 변수 선언, 식별자, 할당식, 숫자 리터럴 등을 나타내는 노드로 이루어진 트리가 만들어집니다.
   (ex. let a = 2; -> { type: 'VariableDeclaration', name: 'a', value: { type: 'NumericLiteral', value: 2 } })

3. 코드 생성 : AST를 기계어로 변환합니다. 이는 언어 혹은 목표하는 플랫폼 등에 따라 크게 달라집니다.

근데 js는 충분한 시간을 갖고 컴파일 하는 것이 아닙니다. 그렇기 때문에 성능을 보장하기 위해서 여러가지 스킬을 사용합니다. (ex. JIT 컴파일, Just-In-Time Compilation)

## 필수 두 단계 (파싱, 컴파일)

JS의 세가지 특징으로 컴파일 필요성을 입증 할 수 있습니다.

1. 구문 오류 : 코드를 실행하기 전에 구문 오류를 찾아내야합니다.
2. 초기 오류 : 코드를 실행하기 전에 오류를 찾아내야합니다.
3. 호이스팅 : 변수와 함수 선언을 끌어올립니다.

```javascript
// 구문오류 (SyntaxError)
var greeting = "Hello, World!";
console.log(greeting);
greeting = ."Hello, World!";
// SyntaxError: Unexpected token '.'
```

> 콘솔이 안 찍히고 syntax error가 발생합니다. -> 컴파일 단계에서 구문 오류를 찾아내는 것입니다.

```javascript
// 초기오류 (ReferenceError)
console.log("Hello, World!");

saySomething("hi!", "Kyle");
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context

function saySomething(greeting, greeting) {
  "use strict"; // 없으면 에러가 발생하지 않습니다.
  console.log(greeting);
}
```

> saySomething 함수를 호출하기 전에 선언되어 있지 않아서 ReferenceError가 발생합니다. -> 컴파일 단계에서 초기 오류를 찾아내는 것입니다.

```javascript
function sayHello() {
  var greeting = "Hello, World!";
  {
    greeting = "Hello, Kyle!"; // 에러가 발생합니다.
    let greeting = "Hello, Kyle!";
    console.log(greeting);
  }
}

sayHello();
// ReferenceError: Cannot access 'greeting' before initialization
```

> greeting 변수를 선언하기 전에 사용했기 때문에 ReferenceError가 발생합니다. -> 호이스팅을 통해 변수와 함수 선언을 끌어올리는 것입니다.

## 컴파일러 체계

> 컴파일러 된다는 것을 이해했다면, 이제 변수 식별과 스코프 결정에 대해 알아보겠습니다.

```javascript
var teacher = [
  { id: 1, name: "Kyle" },
  { id: 2, name: "Suzy" },
  { id: 3, name: "Frank" },
];

function getTeacherById(id) {
  for (let i = 0; i < teacher.length; i++) {
    if (teacher[i].id === id) {
      return teacher[i];
    }
  }
  return "No teacher found";
}

var result = getTeacherById(1);

console.log(result);
// { id: 1, name: 'Kyle' }
```

선언을 제외한다면 프로그램 내 모든 변수와 식별자는 **타깃**이나 값의 **소스**로 사용됩니다. (LHS, RHS)

### 타깃과 소스

```javascript
student = ["Kyle", "Suzy", "Frank"];
```

- student : 타깃
- ["Kyle", "Suzy", "Frank"] : 소스

```javascript
for (let student of students) {
  console.log(student);
}
```

- student : 타깃
- students : 소스

```javascript
getTeacherById(1);
```

- getTeacherById : 타깃
- 1 : 소스

```javascript
function getTeacherById(id) {
  for (let i = 0; i < teacher.length; i++) {
    if (teacher[i].id === id) {
      return teacher[i];
    }
  }
  return "No teacher found";
}
```

- id : 타깃
- teacher.length : 소스

### 런타임에 스코프 변경하기

> 일반적으로 스코프는 프로그램이 컴파일될 때 결정되고, 런타임에 변경되지 않습니다.

두가지 방법으로 런타임에 스코프를 변경할 수 있습니다.

1. eval : 문자열을 코드로 실행합니다. (eval 함수)
2. with : 객체의 속성을 스코프로 사용합니다. (with 문)

```javascript
var teacher = { name: "Kyle" };

with (teacher) {
  console.log(name);
}
```

위 코드는 with 문을 사용하여 런타임에 스코프를 변경하는 예시입니다.

근데 둘 다 사용하지 않는 것이 좋습니다. eval은 코드를 실행할 때 보안 문제가 발생할 수 있고, with는 성능 문제가 발생할 수 있습니다.

### 렉시컬 스코프

위에서 설명한 스코프 결정 방식은 렉시컬 스코프입니다. 렉시컬 스코프는 함수를 어디서 호출했는지가 아니라, 어디서 선언했는지에 따라 결정됩니다. (렉싱)

컴파일레이션은 스코프와 변수의 메모리 예약 관점에서 실제로는 아무것도 하지 않습니다. 왜냐하면 컴파일레이션 과정에서는 어떤 프로그램도 실행되지 않기 때문입니다.

</details>

<details>
  <summary>ch2 렉시컬 스코프</summary>

- Scope : 변수에 접근할 수 있는 범위
- Global Scope : 전역 범위
- Local Scope : 지역 범위

```javascript
// Define a variable in the global scope:
const fullName = "Oluwatobi Sofela";

// Define nested functions:
function profile() {
  function sayName() {
    function writeName() {
      return fullName;
    }
    return writeName();
  }
  return sayName();
}
```

- fullName : Global Scope -> 어디서든 접근 가능
- profile : Local Scope -> sayName, writeName에 접근 가능
- sayName : Local Scope -> writeName에 접근 가능
- writeName : Local Scope -> fullName에 접근 가능

> writeName 함수가 호출될 때, 바로 글로벌 스코프에서 fullName을 찾지 않고, fullName을 찾을 때까지 스코프 체인을 따라 올라갑니다.

### 스코프 체인

- 스코프 체인 : 함수가 선언될 때의 스코프를 기억합니다. 이를 통해 함수가 호출될 때 스코프를 찾을 수 있습니다.

fullName이 writeName 함수에서 찾을 때, writeName() scope -> sayName() scope -> profile() scope -> Global scope 순으로 찾습니다.

ex. 함수가 선언될 때의 스코프를 기억한다.

```javascript
// First fullName variable defined in the global scope:
const fullName = "Oluwatobi Sofela";

// Nested functions containing two more fullName variables:
function profile() {
  const fullName = "Tobi Sho";
  function sayName() {
    const fullName = "Oluwa Sofe";
    function writeName() {
      return fullName;
    }
    return writeName();
  }
  return sayName();
}

console.log(profile()); // Oluwa Sofe
```

### 렉시컬(lexical) 의미

렉시컬이란 : 단어, 표현, 변수를 만드는 것과 관련된 모든 것을 의미합니다.

</details>

```

```
