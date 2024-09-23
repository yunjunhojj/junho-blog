## 8. 고급 SVG 기술

SVG는 단순한 도형이나 텍스트 표현을 넘어서 복잡한 그래픽과 애니메이션을 구현할 수 있는 강력한 기능을 제공합니다. 이 섹션에서는 고급 SVG 기술을 다루며, 마스크, 필터, 심볼 및 뷰포트 관리 등 다양한 고급 기능을 소개합니다.

### 8.1 클리핑(Clipping)과 마스킹(Masking)

SVG에서 클리핑과 마스킹을 사용하여 요소의 일부분을 숨기거나, 특정 형태로 자를 수 있습니다. 두 기능 모두 요소의 외관을 제한하는 데 사용되지만, 그 방식은 다릅니다.

#### 8.1.1 클리핑(Clipping)

클리핑은 클리핑 경로(clip path) 내에 있는 영역만 표시하고, 그 밖의 영역은 숨깁니다. 주로 도형을 일정한 형태로 잘라내는 데 사용됩니다.

##### 예제: 클리핑을 사용한 도형 자르기

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 클리핑 경로 정의 -->
    <clipPath id="clipCircle">
      <circle cx="100" cy="100" r="50" />
    </clipPath>
  </defs>

  <!-- 클리핑 적용 -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="blue"
    clip-path="url(#clipCircle)"
  />
</svg>
```

#### 8.1.2 마스킹(Masking)

마스킹은 지정한 마스크를 사용하여 요소의 투명도를 조정해, 부분적으로 숨기거나 표시할 수 있습니다. 클리핑과는 달리 마스크는 부드러운 경계를 지원할 수 있습니다.

##### 예제: 마스크를 사용한 부드러운 가림

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 마스크 정의 -->
    <mask id="mask1">
      <rect width="200" height="200" fill="white" />
      <circle cx="100" cy="100" r="50" fill="black" />
    </mask>
  </defs>

  <!-- 마스크 적용 -->
  <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#mask1)" />
</svg>
```

#### 8.2 필터(Filtering)

SVG에서 필터를 사용하면 요소에 그림자, 블러, 컬러 조정 등 다양한 효과를 적용할 수 있습니다. 필터는 복잡한 그래픽 처리를 쉽게 구현할 수 있는 도구입니다.

##### 예제: 블러 효과

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 블러 필터 정의 -->
    <filter id="blurFilter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>

  <!-- 블러 필터 적용 -->
  <circle cx="100" cy="100" r="50" fill="blue" filter="url(#blurFilter)" />
</svg>
```

##### 예제: 그림자 효과

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 그림자 필터 정의 -->
    <filter id="shadowFilter">
      <feDropShadow dx="5" dy="5" stdDeviation="3" flood-color="gray" />
    </filter>
  </defs>

  <!-- 그림자 필터 적용 -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="green"
    filter="url(#shadowFilter)"
  />
</svg>
```

#### 8.3 심볼(Symbol)과 뷰포트(Viewport) 관리

심볼은 SVG 내에서 재사용 가능한 그래픽을 정의할 때 사용됩니다. 뷰포트는 SVG의 보이는 영역을 관리하는 데 사용되며, viewBox 속성을 사용하여 요소의 크기와 위치를 조정할 수 있습니다.

##### 8.3.1 심볼(Symbol)

`<symbol>` 태그는 재사용 가능한 SVG 요소를 정의하는 데 사용됩니다. 심볼을 정의한 후에는 `<use>` 태그를 사용하여 해당 심볼을 여러 번 사용할 수 있습니다.

- 예제: **심볼 정의 및 사용**

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 심볼 정의 -->
    <symbol id="mySymbol" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="purple" />
    </symbol>
  </defs>

  <!-- 심볼 사용 -->
  <use href="#mySymbol" x="0" y="0" width="100" height="100" />
  <use href="#mySymbol" x="100" y="100" width="50" height="50" />
</svg>
```

##### 8.3.2 뷰포트(Viewport)와 viewBox

viewBox 속성은 SVG의 뷰포트를 설정하는 데 사용됩니다. 이 속성은 min-x, min-y, width, height의 네 가지 값으로 구성되며, 뷰포트가 보이는 영역을 결정합니다.

- 예제: **viewBox 사용**

```html
<svg
  width="200"
  height="200"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" width="100" height="100" fill="orange" />
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
```
