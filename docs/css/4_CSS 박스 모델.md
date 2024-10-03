# 4. CSS 박스 모델

CSS 박스 모델은 웹 페이지의 요소들이 어떻게 크기와 여백, 테두리, 패딩으로 구성되는지를 설명하는 기본 개념입니다. 이 모델을 이해하면 요소의 크기 조정, 배치, 간격 조절 등을 효과적으로 관리할 수 있습니다. 이 장에서는 CSS 박스 모델의 구성 요소와 그 동작 방식을 자세히 살펴봅니다.

## 4.1 박스 모델의 구성 요소

CSS 박스 모델은 다음과 같은 네 가지 주요 부분으로 구성됩니다:

1. **콘텐츠(Content)**: 실제로 웹 페이지에 표시되는 내용입니다. 텍스트, 이미지, 비디오 등 다양한 콘텐츠가 여기에 해당합니다.
2. **패딩(Padding)**: 콘텐츠와 테두리(border) 사이의 내부 여백입니다. 패딩을 사용하여 콘텐츠와 테두리 간의 간격을 조절할 수 있습니다.
3. **테두리(Border)**: 요소의 가장자리 경계입니다. 테두리는 다양한 스타일, 두께, 색상으로 설정할 수 있습니다.
4. **마진(Margin)**: 요소와 다른 요소들 사이의 외부 여백입니다. 마진을 통해 요소 간의 간격을 조절할 수 있습니다.

다음 그림은 박스 모델의 구조를 시각적으로 나타낸 것입니다:

<img alt="css 박스 모델" src='/img/docs/css/box-model.png' width="500px" />

## 4.2 박스 모델의 속성

각 구성 요소는 CSS 속성을 통해 제어할 수 있습니다. 주요 속성은 다음과 같습니다:

### 4.2.1 콘텐츠(Content)

- **설명:** 요소 내에 실제로 표시되는 내용입니다.
- **예제:**
  ```html
  <div class="box">안녕하세요, 박스 모델입니다!</div>
  ```

### 4.2.2 패딩(Padding)

- **설명:** 콘텐츠와 테두리 사이의 내부 여백을 설정합니다.
- **속성:**
  - `padding-top`
  - `padding-right`
  - `padding-bottom`
  - `padding-left`
  - `padding` (단축 속성)
- **예제:**
  ```css
  .box {
    padding: 20px; /* 모든 방향에 20px 패딩 적용 */
  }
  ```
  ```css
  .box {
    padding: 10px 20px 30px 40px; /* 상, 우, 하, 좌 패딩 적용 */
  }
  ```

### 4.2.3 테두리(Border)

- **설명:** 요소의 경계선을 설정합니다.
- **속성:**
  - `border-width`
  - `border-style`
  - `border-color`
  - `border` (단축 속성)
  - 개별 방향별: `border-top`, `border-right`, `border-bottom`, `border-left`
- **예제:**
  ```css
  .box {
    border: 2px solid #333; /* 두께 2px, 실선, 색상 #333 */
  }
  ```
  ```css
  .box {
    border-top: 5px dashed red; /* 상단에만 두께 5px, 대시선, 빨간색 */
  }
  ```

### 4.2.4 마진(Margin)

- **설명:** 요소와 다른 요소들 사이의 외부 여백을 설정합니다.
- **속성:**
  - `margin-top`
  - `margin-right`
  - `margin-bottom`
  - `margin-left`
  - `margin` (단축 속성)
- **예제:**
  ```css
  .box {
    margin: 15px; /* 모든 방향에 15px 마진 적용 */
  }
  ```
  ```css
  .box {
    margin: 10px 20px; /* 상하 10px, 좌우 20px 마진 적용 */
  }
  ```

## 4.3 박스 사이징(Box Sizing)

박스 모델의 계산 방식을 제어하는 속성입니다. 기본적으로 CSS는 요소의 너비와 높이를 콘텐츠 영역에만 적용합니다. `box-sizing` 속성을 사용하면 패딩과 테두리를 포함한 전체 크기를 제어할 수 있습니다.

- **속성:**
  - `content-box` (기본값): 너비와 높이는 콘텐츠 영역만 포함합니다.
  - `border-box`: 너비와 높이에 패딩과 테두리를 포함합니다.
- **예제:**
  ```css
  .box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
  }
  ```
  - **설명:** 위 예제에서 `.box`의 전체 너비는 `200px`으로 고정되며, 패딩과 테두리는 이 너비 안에 포함됩니다.

## 4.4 박스 모델을 활용한 레이아웃 예제

박스 모델을 이해하면 다양한 레이아웃을 쉽게 구현할 수 있습니다. 다음은 박스 모델을 활용한 간단한 카드 레이아웃 예제입니다.

**HTML:**

```html
<div class="card">
  <h2>카드 제목</h2>
  <p>이것은 카드의 내용입니다. 박스 모델을 이용하여 스타일링되었습니다.</p>
</div>
```

```css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: #fff;
}

.card h2 {
  margin-top: 0;
  color: #333;
}

.card p {
  color: #666;
}
```

## 4.5 박스 모델의 문제점과 해결 방법

기본 box-sizing: content-box;에서는 패딩과 테두리가 요소의 전체 크기에 추가되므로, 요소의 실제 크기가 의도보다 커질 수 있습니다. <br/> box-sizing: border-box 속성으로 해결

## 4.6 요약

CSS 박스 모델은 웹 페이지 요소의 크기와 간격을 제어하는 기본 개념입니다. 콘텐츠, 패딩, 테두리, 마진의 네 가지 구성 요소를 이해하고 적절히 활용하면, 다양한 레이아웃과 디자인을 효과적으로 구현할 수 있습니다. box-sizing 속성을 통해 박스 모델의 동작 방식을 조절하고, 예상치 못한 크기 증가나 마진 합산과 같은 문제를 해결할 수 있습니다.
