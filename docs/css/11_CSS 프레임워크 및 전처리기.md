# 11. CSS 프레임워크 및 전처리기

CSS 프레임워크와 전처리기는 CSS 작성 및 관리에 있어 효율성을 높이고, 스타일을 재사용 가능하게 만들어줍니다. 이 섹션에서는 인기 있는 CSS 프레임워크와 전처리기의 특징 및 활용 방법을 다룹니다.

## 11.1 인기 있는 CSS 프레임워크 소개

CSS 프레임워크는 기본적인 스타일과 레이아웃을 제공하여, 개발자가 손쉽게 웹 페이지를 디자인하고 개발할 수 있게 도와줍니다. 가장 많이 사용되는 CSS 프레임워크로는 다음과 같은 것들이 있습니다.

### 11.1.1 Tailwind CSS

**Tailwind CSS**는 유틸리티 퍼스트(Utility-first) CSS 프레임워크로, 미리 정의된 클래스들을 이용해 빠르게 스타일을 적용할 수 있습니다. Tailwind의 장점은 불필요한 CSS 코드를 최소화하고, 스타일을 최대한 재사용할 수 있다는 것입니다.

특징:

- 유틸리티 클래스 기반
- 빠른 개발 속도
- 커스터마이징이 쉬움

- **예시**:

```html
<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

이 코드에서 bg-blue-500은 배경색, text-white는 글자 색상을 의미하며, 미리 정의된 클래스를 통해 빠르게 스타일을 적용할 수 있습니다.

### 11.1.2 styled-components

styled-components는 React와 같은 JavaScript 프레임워크와 함께 사용되는 CSS-in-JS 라이브러리입니다. CSS를 JavaScript 내에서 정의하여 컴포넌트 단위로 스타일을 관리할 수 있게 도와줍니다.

특징:

- 컴포넌트 단위로 스타일을 작성
- 동적 스타일링 가능
- React와 같은 JavaScript 라이브러리와 밀접하게 통합
- 예시:

```javascript
import styled from "styled-components";

const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
`;

export default Button;
```

## 11.2 SASS, LESS와 같은 전처리기 활용

CSS 전처리기는 CSS의 기본 기능을 확장하여, 변수, 중첩, 함수 등을 사용할 수 있도록 해줍니다. 이를 통해 스타일을 더 유연하게 작성하고, 유지보수를 쉽게 할 수 있습니다. 대표적인 전처리기로는 SASS와 LESS가 있습니다.

11.2.1 SASS (Syntactically Awesome Stylesheets)

SASS는 CSS를 더 프로그래밍적으로 작성할 수 있도록 해주는 강력한 전처리기입니다. CSS에 변수를 사용하거나 중첩된 규칙을 작성할 수 있는 기능을 제공합니다.

특징:

- 변수, 중첩, 반복문 등 제공
- 더 유지보수하기 쉬운 코드 작성 가능
- 다양한 CSS 기능을 확장

- 예시:

```scss
$primary-color: #3498db;

.button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

## 11.2.2 LESS (Leaner Style Sheets)

LESS는 SASS와 유사한 기능을 제공하는 또 다른 전처리기입니다. 변수, 중첩 규칙, 함수 등을 사용할 수 있으며, JavaScript와 통합되기 쉽습니다.

특징:

- 변수, 중첩, 함수 제공
- SASS와 유사하지만 문법이 조금 다름
- CSS를 보다 유연하게 작성 가능

- 예시:

```less
@primary-color: #2ecc71;

.button {
  background-color: @primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}
```

사실 css의 경우 기존 회사에서 사용하는 css를 사용할 가능성이 많고, 위의 나열된 것 말고도 다양한 라이브러리들이 있으니 기본 css를 잘 다루는 것이 중요해보입니다.
