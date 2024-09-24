# SVG 학습 목차

이 곳[https://developer.mozilla.org/en-US/play/] 혹은 저 곳 [https://svgplayground.com/] 에서 svg를 직접 테스트하면서 진행해주시면 좋을 것 같아요.

## 1. SVG 소개

### 1.1 SVG란 무엇인가?

- SVG의 정의 및 역사
- SVG와 다른 그래픽 포맷의 비교 (예: PNG, JPEG, Canvas)

### 1.2 SVG의 장점과 사용 사례

- 해상도 독립성
- 파일 크기 절감
- 인터랙티브 그래픽
- 웹 애니메이션
- 아이콘 및 로고 디자인

## 2. SVG 기본 구조

### 2.1 SVG 요소의 기본 구조

- `<svg>` 태그의 역할과 속성
- 네임스페이스 이해하기

### 2.2 뷰포트와 좌표계

- `viewBox` 속성
- 사용자 좌표 시스템 vs. 뷰포트 좌표 시스템

## 3. 기본 도형 그리기

### 3.1 선 (Line)

- `<line>` 요소와 속성

### 3.2 직사각형 (Rectangle)

- `<rect>` 요소와 속성

### 3.3 원 (Circle)

- `<circle>` 요소와 속성

### 3.4 타원 (Ellipse)

- `<ellipse>` 요소와 속성

### 3.5 다각형과 폴리라인 (Polygon & Polyline)

- `<polygon>`과 `<polyline>` 요소

### 3.6 경로 (Path)

- `<path>` 요소와 `d` 속성
- 기본 경로 명령어 (M, L, C, Q, Z 등)

## 4. 그룹화와 변환

### 4.1 그룹 (Group) 요소

- `<g>` 태그의 활용
- 그룹에 스타일 및 변환 적용

### 4.2 변환 (Transform) 속성

- 이동 (translate)
- 회전 (rotate)
- 스케일 (scale)
- 기울이기 (skew)
- 복합 변환

## 5. 스타일링과 색상

### 5.1 채우기와 스트로크

- `fill`과 `stroke` 속성
- 선의 두께와 종류 (`stroke-width`, `stroke-dasharray` 등)

### 5.2 그라디언트과 패턴

- 선형 그라디언트 (`<linearGradient>`)
- 방사형 그라디언트 (`<radialGradient>`)
- 패턴 정의 (`<pattern>`)

### 5.3 CSS를 이용한 스타일링

- 외부 CSS와 인라인 스타일링
- CSS 클래스와 ID 활용

## 6. 텍스트와 폰트

### 6.1 텍스트 요소

- `<text>` 태그의 사용법
- 텍스트 위치 지정 (`x`, `y`, `dx`, `dy`)

### 6.2 폰트 속성

- `font-family`, `font-size`, `font-weight` 등

### 6.3 텍스트 경로

- `<textPath>`를 이용한 텍스트 곡선 배치

## 7. 애니메이션과 상호작용

### 7.1 SVG 애니메이션 기초

- 애니메이션의 필요성 및 기본 개념

### 7.2 SMIL 애니메이션

- `<animate>`, `<animateTransform>` 등의 태그 사용법

## 8. 고급 SVG 기술

### 8.1 마스크와 클리핑

- `<mask>`와 `<clipPath>`의 차이점 및 활용법

### 8.2 필터 효과

- 기본 필터 (`<filter>`, `feGaussianBlur` 등)
- 사용자 정의 필터 생성

### 8.3 심볼과 `<use>` 요소

- `<symbol>` 정의 및 재사용
- `<use>`를 통한 심볼 인스턴스화

## 9. SVG 최적화

### 9.1 파일 크기 줄이기

- 불필요한 코드 제거
- 압축 기법

### 9.2 코드 최적화 팁

- 간결한 코드 작성
- 재사용 가능한 코드 구조

### 9.3 도구 소개

- SVGO 등 SVG 최적화 도구 사용법

## 10. React에서 SVG 활용하기

### 10.1 SVG를 React 컴포넌트로 사용하기

- 인라인 SVG vs. 외부 파일
- JSX 내에서 SVG 작성

### 10.2 React와 SVG의 통합

- Props를 이용한 동적 SVG
- 상태 관리를 통한 SVG 변화

### 10.3 라이브러리 활용

- `svgr` 등 SVG 관련 라이브러리 소개 및 사용법

### 10.4 성능 최적화

- SVG 렌더링 성능 향상 팁
