---
title: CRA에서 Vite로 마이그레이션하기
slug: cra-to-vite
tags:
  - react
  - vite
  - cra
authors: [junho]
---

# CRA에서 Vite로 마이그레이션하기

> React 프로젝트를 개발할 때, Create React App(CRA) 대신 Vite를 사용하면 훨씬 빠른 개발 경험을 할 수 있습니다. 심지어 바꾸는게 그렇게 어렵지 않습니다. 이번 포스트에서는 CRA에서 Vite로 마이그레이션하는 방법을 알아보겠습니다.

<!-- truncate -->

## Vite로 마이그레이션하는 이유

CRA보다 Vite가 더 나은 이유는 다음과 같습니다:

- 더 빠른 개발 서버: Vite는 모듈을 즉시 제공하여 개발 속도를 향상시킵니다.
- 더 가벼운 번들링: Rollup을 기반으로 최적화된 빌드를 제공합니다.
- Hot Module Replacement(HMR) 개선: 코드 변경 시 즉시 반영됩니다. CRA보다 더 빠릅니다.
- 더 쉬운 설정 및 확장성: 필요한 설정을 직접 구성할 수 있습니다.

### 1. CRA 프로젝트 생성하기

Vite로 마이그레이션할 기존 프로젝트가 없다면, 먼저 CRA 프로젝트를 생성해봅니다.

```bash
npx create-react-app my-app --template typescript
cd my-app
```

위 명령어를 실행하면 my-app 디렉토리에 React 프로젝트가 생성됩니다.

### 2. CRA 관련 패키지 제거

Vite를 적용하기 전에 기존 CRA 관련 패키지를 제거합니다.

```bash
npm uninstall react-scripts
```

그리고 package.json에서 react-scripts 관련 항목을 삭제해주세요.

### 3. Vite 설치 및 설정

Vite를 설치합니다.

```bash
npm install --save-dev vite @vitejs/plugin-react
```

이 때
`npm error Found: @types/node@16.18.126
npm error node_modules/@types/node
npm error   @types/node@"^16.18.126" from the root project`
에러가 발생하면, 아래의 명령어를 실행해주세요. 그 후 다시 Vite를 설치합니다.

```bash
npm install @types/node@latest --save-dev
```

이제 package.json의 scripts를 다음과 같이 수정합니다.

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 4. Vite 설정 파일 추가

프로젝트 루트에 vite.config.ts 파일을 생성하고 다음과 같이 설정합니다.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

### 5. index.html 수정

CRA의 public/index.html을 루트로 이동하고 `<script>` 태그를 변경합니다.

```js
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

위의 코드는 다음과 같이 변경합니다. (%PUBLIC_URL% 제거)

```js
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/logo192.png" />
<link rel="manifest" href="/manifest.json" />
```

```js
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  {/* 아래 추가 */}
  <script type="module" src="/src/main.tsx"></script>
</body>
```

### 6. src/main.tsx 수정

src/index.tsx를 src/main.tsx로 변경합니다.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 7. .env 파일 수정

환경 변수는 VITE\_ 접두사를 사용해야 합니다.

```bash
VITE_API_URL=https://api.example.com
```

그리고 코드에서 환경 변수를 가져올 때는 import.meta.env를 사용합니다.

```js
console.log(import.meta.env.VITE_API_URL);
```

### 8. TypeScript 설정 (tsconfig.json 수정)

Vite는 module을 ESNext로 설정하는 것이 권장됩니다.

```json
"compilerOptions": {
  "module": "ESNext"
}
```

### 9. 프로젝트 실행 및 테스트

이제 Vite로 전환된 프로젝트를 실행합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 정상적으로 동작하는지 확인하세요.

### 10. 최적화 및 추가 설정

#### 10.1 ESLint 및 Prettier 설정

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

.eslintrc.cjs 예제:

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
```

#### 10.2 Alias 설정 (vite.config.ts)

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(\_\_dirname, 'src'),
    },
  },
});
```

이제 @를 사용하여 간결한 경로 설정이 가능합니다.

```js
import MyComponent from "@/components/MyComponent";
```

## 마무리

이제 CRA에서 Vite로 성공적으로 마이그레이션되었습니다!
Vite를 사용하면 더욱 빠른 개발 환경을 경험할 수 있습니다.필요에 따라 추가적인 설정을 적용하여 최적화하세요!

회사에서 진행된 프로젝트로, 회사 코드를 공개할 수 없어서 간단한 예제로 작성했습니다.
