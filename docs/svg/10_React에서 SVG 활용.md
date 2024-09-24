## 10. React에서 SVG 활용하기

SVG는 React 애플리케이션에서 벡터 이미지를 표시하고, 인터랙티브한 그래픽을 구현하는 데 매우 유용합니다. 이 섹션에서는 React에서 SVG를 효과적으로 활용하는 방법과 성능 최적화, 그리고 실전 예제에 대해 알아보겠습니다.
참고로, img 태그로 사용하는 방법 혹은 backgroud-image로 사용하는 방법등은 svg의 중요한 장점인 컬러 주입 등을 못하게 하기 때문에 비추천하여 설명하지 않습니다.

[https://svgplayground.com/] 페이지에서 Convert 기능도 구경해보세요.

### 10.1 SVG를 React 컴포넌트로 사용하기

React에서 SVG를 사용하는 방법은 크게 두 가지로 나뉩니다: 인라인 SVG를 사용하는 방법과 외부 SVG 파일을 사용하는 방법입니다. 또한 JSX 내에서 직접 SVG 코드를 작성하여 컴포넌트화할 수 있습니다.

#### 인라인 SVG vs. 외부 파일

- **인라인 SVG**: SVG 코드를 JSX 내에 직접 작성합니다. 이 방법은 SVG를 컴포넌트로 취급하여 props를 통해 동적으로 조작할 수 있다는 장점이 있습니다.
- **외부 파일**: SVG 파일을 이미지처럼 `img` 태그로 불러옵니다. 이 방법은 간단하지만, SVG를 동적으로 조작할 수 없다는 단점이 있습니다.

#### 예제: 인라인 SVG 사용

```jsx
import React from "react";

const StarIcon = () => (
  <svg width="100" height="100" viewBox="0 0 24 24" fill="gold">
    <polygon points="12,2 15,11 24,11 17,17 20,26 12,20 4,26 7,17 0,11 9,11" />
  </svg>
);

export default StarIcon;
```

### 10.2 React와 SVG의 통합

React의 장점을 살려 SVG를 동적으로 조작하고, 상태 변화에 따라 SVG의 모양이나 동작을 변경할 수 있습니다.

Props를 이용한 동적 SVG

SVG 컴포넌트에 props를 전달하여 동적으로 속성을 변경할 수 있습니다.

```jsx
import React from "react";

const Circle = ({ radius, color }) => (
  <svg width="100" height="100">
    <circle cx="50" cy="50" r={radius} fill={color} />
  </svg>
);

export default Circle;

// 사용 예시
<Circle radius={30} color="blue" />;
```

## 10.3 라이브러리 활용

React에서 SVG를 보다 효율적으로 활용하기 위해 다양한 라이브러리를 사용할 수 있습니다. 여기서는 대표적인 라이브러리인 `SVGR`과 `styled-components`를 소개하고 사용법을 간단히 설명합니다. [https://react-svgr.com/]

### SVGR

`SVGR`은 SVG 파일을 React 컴포넌트로 변환해주는 도구로, SVG를 손쉽게 React에서 사용할 수 있게 도와줍니다. 이를 통해 SVG 파일을 직접 불러오거나, 컴포넌트로 변환하여 재사용할 수 있습니다.

#### 설치

```bash
npm install @svgr/webpack --save-dev
```

#### 사용 방법

1. SVG 파일을 직접 React 컴포넌트로 임포트하기

SVG 파일을 React 컴포넌트로 직접 임포트하여 사용할 수 있습니다. 이는 Create React App과 같은 설정에서 기본적으로 지원됩니다.

```jsx
import React from "react";
import { ReactComponent as Logo } from "./logo.svg";

const App = () => (
  <div>
    <Logo width={100} height={100} />
  </div>
);

export default App;
```

2. SVGR CLI를 사용하여 SVG를 컴포넌트로 변환하기

SVGR CLI를 사용하여 SVG 파일을 미리 React 컴포넌트로 변환할 수 있습니다.

```bash
npm install @svgr/cli --save-dev
```

```bash
npx svgr --out-dir src/components/icons src/assets/icons
```

설명:

- src/assets/icons 디렉토리의 모든 SVG 파일을 React 컴포넌트로 변환하여 src/components/icons 디렉토리에 저장합니다.
- 변환된 컴포넌트는 다른 React 컴포넌트에서 쉽게 임포트하여 사용할 수 있습니다.

3. **SVGR Webpack Loader 설정하기** - 저는 이 방법을 사용합니다.

커스텀 Webpack 설정을 사용하는 경우, SVGR을 Webpack 로더로 설정하여 SVG 파일을 자동으로 React 컴포넌트로 변환할 수 있습니다.

설정 예시 (webpack.config.js):

```js
module.exports = {
  // ...기타 설정
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      // ...다른 로더
    ],
  },
};
```

사용 예시:

```jsx
// 마치 컴포넌트 처럼 바로 사용 가능
import Star from "./star.svg";

const Example = () => (
  <div>
    <Star />
  </div>
);
```

장점:

- Webpack 설정을 통해 SVG 파일을 자동으로 React 컴포넌트로 변환하여 사용 편의성을 높일 수 있습니다.
- 코드 스플리팅 및 최적화를 쉽게 적용할 수 있습니다.

## 10.4 성능 최적화 - 대부분의 내용은 ch9의 내용을 참고해주세요.

React에서 SVG를 사용할 때, 성능 최적화는 사용자 경험을 향상시키는 데 중요한 역할을 합니다. 이 절에서는 SVG 렌더링 성능을 향상시키는 다양한 팁과 불필요한 리렌더링을 방지하는 방법에 대해 설명합니다.

### SVG 렌더링 성능 향상 팁

SVG의 복잡성은 렌더링 성능에 직접적인 영향을 미칠 수 있습니다. 다음은 SVG 렌더링 성능을 최적화하는 몇 가지 팁입니다.

#### 1. SVG 단순화

- **불필요한 요소 제거:** 사용하지 않는 SVG 요소나 그룹을 제거하여 SVG 파일의 크기를 줄입니다.
- **경로 단순화:** 복잡한 경로(`path`)는 단순화하여 렌더링 부담을 줄입니다.
- **최적화 도구 사용:** [SVGO](https://github.com/svg/svgo)와 같은 도구를 사용하여 SVG를 최적화할 수 있습니다.

```bash
npm install -g svgo
svgo your-icon.svg
```

#### 2. CSS 애니메이션 및 트랜지션 활용

CSS를 사용하여 애니메이션과 트랜지션을 구현하면 JavaScript보다 성능이 더 뛰어날 수 있습니다.

```css
/* styles.css */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating-icon {
  animation: rotate 2s linear infinite;
}
```

```jsx
import React from "react";
import "./styles.css";

const RotatingIcon = () => (
  <svg className="rotating-icon" width="50" height="50" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" stroke="blue" strokeWidth="5" fill="none" />
  </svg>
);

export default RotatingIcon;
```

#### 3. SVG 스프라이트 사용

SVG 스프라이트는 여러 SVG 아이콘을 하나의 파일로 합쳐 사용하는 방법입니다. 이를 통해 HTTP 요청 수를 줄이고, 캐싱을 효율적으로 활용할 수 있습니다.

```html
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path
      d="M21.707 20.293l-5.387-5.387A7.952 7.952 0 0016 9a8 8 0 10-8 8 7.952 7.952 0 005.906-2.68l5.387 5.387a1 1 0 001.414-1.414zM4 9a6 6 0 1112 0 6 6 0 01-12 0z"
    />
  </symbol>
</svg>
```

```jsx
import React from "react";

const SpriteIcon = ({ name, size, color }) => (
  <svg width={size} height={size} fill={color}>
    <use href={`#icon-${name}`} />
  </svg>
);

export default SpriteIcon;

// 사용 예시
<SpriteIcon name="search" size={24} color="#555" />;
```
