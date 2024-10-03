# 3. CSS 문법 및 선택자

CSS는 꾸며주는 역할을 한다고 했습니다. 근데 꾸며주려면 대상이 있어야하겠죠? 대상을 어떻게 지정할까요? <br/>
그 역할을 하는 것이 css의 선택자 입니다. 어떻게 꾸미는 지에 대한 내용은 선언 블록 안에 담기게 됩니다.

## 3.1 CSS 기본 문법

CSS의 기본 문법은 선택자(selector)와 선언 블록(declaration block)으로 구성됩니다. 선언 블록은 중괄호 `{}`로 감싸며, 하나 이상의 선언(declaration)을 포함합니다. 각 선언은 속성(property)과 값(value)으로 이루어져 있으며, 콜론 `:`으로 구분되고 세미콜론 `;`으로 끝납니다.

**구조:**

```css
selector {
  property: value;
  property: value;
  /* 추가 선언 */
}
```

```css
p {
  color: blue;
  font-size: 16px;
  line-height: 1.5;
}
```

설명:

- p는 선택자(selector)로, 모든 `<p>` 요소를 대상으로 합니다.
- {} 안에 있는 각 줄은 선언(declaration)으로, property: value; 형태입니다.
- color, font-size, line-height는 속성(property)이고, 각각 blue, 16px, 1.5는 그에 대응하는 값(value)입니다.

## 3.2 기본 선택자

기본 선택자는 특정 HTML 요소를 선택하여 스타일을 적용하는 가장 단순한 방법입니다. 여기에는 요소 선택자, 클래스 선택자, ID 선택자, 그리고 범용 선택자가 포함됩니다.

- 요소 선택자 (Element Selector) : 특정 HTML 요소를 선택하여 스타일을 적용합니다.
- 클래스 선택자 (Class Selector) : HTML 요소에 지정된 클래스(class) 속성을 기반으로 선택합니다. 점 .으로 시작합니다.
- ID 선택자 (ID Selector) : HTML 요소에 지정된 고유 ID(id) 속성을 기반으로 선택합니다. 샵 #으로 시작합니다. 각 ID는 문서 내에서 유일해야 합니다.
- 범용 선택자 (Universal Selector) : 모든 HTML 요소를 선택합니다. 범용 선택자는 별표 \*로 표시됩니다.

```css
/* 모든 <h1> 요소에 대한 스타일 */
h1 {
  color: darkgreen;
  font-family: "Arial", sans-serif;
}

/* 모든 .highlight 클래스에 대한 스타일 */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* header 라는 ID를 가진 태그에 대한 스타일 */
#header {
  background-color: #333;
  color: white;
  padding: 20px;
}

/* 모든 요소의 박스 사이징을 설정 */
* {
  box-sizing: border-box;
}
```

## 3.3 고급 선택자

고급 선택자는 더 복잡한 조건에 맞는 요소를 선택할 수 있도록 도와줍니다. 여기에는 속성 선택자와 의사 클래스 및 의사 요소가 포함됩니다.

- 속성 선택자 (Attribute Selector): 특정 속성을 기반으로 요소를 선택하여 정교한 스타일링을 가능하게 합니다.
- 의사 클래스 (Pseudo-classes): 요소의 특정 상태(예: 호버, 포커스)에 따라 스타일을 적용합니다.
- 의사 요소 (Pseudo-elements): 요소의 특정 부분(예: 첫 글자, 첫 줄)에 스타일을 적용하거나 콘텐츠를 추가합니다.

```css
/* 속성 선택자 (Attribute Selector) */

/* type 속성이 'text'인 <input> 요소 선택 */
input[type="text"] {
  border: 1px solid #ccc;
  padding: 5px;
}

/* href 속성이 'https'로 시작하는 <a> 요소 선택 */
a[href^="https"] {
  color: green;
}

/* title 속성이 존재하는 모든 요소 선택 */
*[title] {
  border-bottom: 1px dotted #000;
}

/* 의사 클래스 (Pseudo-classes) */

/* 마우스를 올렸을 때 링크 색상 변경 */
a:hover {
  color: red;
}

/* 포커스된 입력 필드 스타일링 */
input:focus {
  border-color: blue;
}

/* 짝수 번째 <li> 요소에 배경색 적용 */
li:nth-child(even) {
  background-color: #f9f9f9;
}

/* 첫 번째 <p> 요소에 스타일 적용 */
p:first-child {
  margin-top: 0;
}

/* 마지막 <li> 요소에 스타일 적용 */
li:last-child {
  border-bottom: none;
}

/* 클래스가 'exclude'가 아닌 모든 <div> 요소 선택 */
div:not(.exclude) {
  background-color: #fafafa;
}

/* 의사 요소 (Pseudo-elements) */

/* 각 단락의 첫 글자에 스타일 적용 */
p::first-letter {
  font-size: 2em;
  color: #ff6347;
}

/* 각 단락의 첫 줄에 스타일 적용 */
p::first-line {
  font-weight: bold;
}

/* 요소의 내용 앞에 콘텐츠 추가 */
h2::before {
  content: "★ ";
  color: gold;
}

/* <h3> 요소 앞에 아이콘 추가 */
h3::before {
  content: "🔹 ";
  color: blue;
}

/* <p> 요소 뒤에 텍스트 추가 */
p::after {
  content: " (읽어주셔서 감사합니다)";
  font-style: italic;
}

/* 텍스트 선택 시 스타일 적용 */
::selection {
  background-color: #3390ff;
  color: white;
}
```
