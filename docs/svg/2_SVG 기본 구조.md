## 2. SVG 기본 구조

SVG(Scalable Vector Graphics)는 XML 기반의 마크업 언어로, 웹에서 벡터 그래픽을 표현하는 표준입니다. SVG의 기본 구조를 이해하면 보다 효율적으로 그래픽을 생성하고 조작할 수 있습니다. 이 섹션에서는 SVG의 기본 요소 구조와 뷰포트 및 좌표계에 대해 자세히 살펴보겠습니다.

### 2.1 SVG 요소의 기본 구조

#### `<svg>` 태그의 역할과 속성

- **`<svg>` 태그의 역할**

  - SVG 문서의 루트(root) 요소로, 모든 SVG 그래픽은 `<svg>` 태그 안에 위치해야 합니다.
  - HTML 문서 내에서 인라인으로 삽입하거나 외부 파일로 참조할 수 있습니다.

- **주요 속성**

  - `width`와 `height`: SVG의 너비와 높이를 지정합니다.
    ```html
    <svg width="200" height="200">
      <!-- SVG 콘텐츠 -->
    </svg>
    ```
  - `viewBox`: 내부 좌표계를 설정하여 SVG의 스케일링 방식을 정의합니다. `viewBox="min-x min-y width height"` 형식으로 지정합니다.
  - `xmlns`: SVG의 네임스페이스를 정의하며, 보통 `http://www.w3.org/2000/svg`로 설정합니다.
    ```html
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <!-- SVG 콘텐츠 -->
    </svg>
    ```
  - `version`: SVG의 버전을 명시합니다. 기본값은 `1.1`입니다.
    ```html
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <!-- SVG 콘텐츠 -->
    </svg>
    ```

- **예제**
  ```html
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="300"
    height="200"
    viewBox="0 0 300 200"
  >
    <rect x="50" y="50" width="200" height="100" fill="blue" />
  </svg>
  ```

## 네임스페이스 이해하기

- 네임스페이스의 중요성

  - XML 기반의 SVG에서는 네임스페이스를 사용하여 요소와 속성의 고유성을 보장합니다.
  - 네임스페이스를 명시하지 않으면 SVG 요소가 제대로 인식되지 않을 수 있습니다.

- 기본 네임스페이스

  - SVG의 기본 네임스페이스는 http://www.w3.org/2000/svg입니다.
  - HTML 문서 내에서 SVG를 사용할 때는 반드시 xmlns 속성을 포함해야 합니다

- 다른 네임스페이스와의 혼용
  - SVG 내부에서 다른 XML 네임스페이스를 사용할 수도 있습니다. 예를 들어, XLink를 사용한 링크 생성 시 xmlns:xlink를 추가해야 합니다.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <a xlink:href="https://www.example.com">
    <circle cx="50" cy="50" r="40" fill="red" />
  </a>
</svg>
```
