# 3. JS와 React 심화 실습

## self made mini react

### 1. JSX 구현 (babel)

```bash
npm init -y
npm install @babel/core @babel/preset-react @babel/plugin-transform-react-jsx
```

```json
# tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

```javascript
// babel.ts
const babel = require("@babel/core");

const options = {
  presets: ["@babel/preset-react"],
  plugins: ["@babel/plugin-transform-react-jsx"],
};

const code = `
const element = <h1 title="foo">Hello</h1>;
`;

const result = babel.transformSync(code, options);
console.log(result?.code);
```

```bash
npm i -g ts-node typescript
ts-node babel.ts

# output
# const element = React.createElement("h1", {
#   title: "foo"
# }, "Hello");
```

위의 코드를 실행하면 JSX 코드를 React.createElement로 변환하는 것을 확인할 수 있다.

### 2. vite로 React 프로젝트 셋팅

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
});
```

- vite 플러그인을 사용하여 React를 사용할 수 있도록 설정한다.
- jsxRuntime: "classic" 옵션을 사용하여 React.createElement를 사용한다.

**src/main.tsx**

```tsx
import React from "./mini-react.ts";

const App = (
  <div id="test">
    <h1>Hello</h1>
  </div>
);

// eslint-disable-next-line react/no-deprecated
React.render(App, document.getElementById("root"));
// React.render(<App />, document.getElementById("root"));
```

src/mini-react.ts

```tsx
// Text elements require special handling.
const createTextElement = (text) => ({
  type: "TEXT",
  props: {
    nodeValue: text,
  },
});

// Create custom JavaScript data structures.
const createElement = (type, props = {}, ...child) => {
  const isVirtualElement = (e) => typeof e === "object";

  const children = child.map((c) =>
    isVirtualElement(c) ? c : createTextElement(String(c))
  );

  return {
    type,
    props: { ...props, children },
  };
};

// Update DOM properties.
// For simplicity, we remove all the previous properties and add next properties.
const updateDOM = (DOM, prevProps, nextProps) => {
  const defaultPropKeys = "children";

  for (const [removePropKey, removePropValue] of Object.entries(prevProps)) {
    if (removePropKey.startsWith("on")) {
      DOM.removeEventListener(
        removePropKey.substr(2).toLowerCase(),
        removePropValue
      );
    } else if (removePropKey !== defaultPropKeys) {
      DOM[removePropKey] = "";
    }
  }

  for (const [addPropKey, addPropValue] of Object.entries(nextProps)) {
    if (addPropKey.startsWith("on")) {
      DOM.addEventListener(addPropKey.substr(2).toLowerCase(), addPropValue);
    } else if (addPropKey !== defaultPropKeys) {
      DOM[addPropKey] = addPropValue;
    }
  }
};

// Create DOM based on node type.
const createDOM = (fiberNode) => {
  const { type, props } = fiberNode;
  let DOM = null;

  if (type === "TEXT") {
    DOM = document.createTextNode("");
  } else if (typeof type === "string") {
    DOM = document.createElement(type);
  }

  // Update properties based on props after creation.
  if (DOM !== null) {
    updateDOM(DOM, {}, props);
  }

  return DOM;
};

const render = (element, container) => {
  const DOM = createDOM(element);
  if (Array.isArray(element.props.children)) {
    for (const child of element.props.children) {
      render(child, DOM);
    }
  }

  container.appendChild(DOM);
};

export default {
  render,
  createElement,
};
```

- createTextElement: 텍스트 엘리먼트를 생성하는 함수
- createElement: JSX를 React.createElement로 변환하는 함수
- updateDOM: 이전 프로퍼티와 다음 프로퍼티를 비교하여 변경된 프로퍼티만 업데이트하는 함수
- createDOM: Fiber 노드를 기반으로 DOM을 생성하는 함수
- render: DOM을 생성하고, 자식 노드를 재귀적으로 렌더링하는 함수

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

```bash
npm i --save-dev vite
npm i @vitejs/plugin-react
vite
```

이를 통해 vite 플러그인을 사용하여 React를 사용할 수 있도록 설정하고, mini-react를 구현하여 React.createElement를 사용하는 방법을 알아보았다.

### 3. Fiber 아키텍처와 동시성 모드

- requestIdleCallback: 브라우저가 유휴 상태일 때 콜백을 실행하는 API
- 유휴 상태: 브라우저가 사용자 입력을 처리하거나 애니메이션을 렌더링하는 등의 작업을 수행하지 않는 상태

src/requestIdleCallback.ts

```tsx
// 간소화된 requestIdleCallback.
((global: Window) => {
  const id = 1; // requestIdleCallback 식별자
  const fps = 1e3 / 60; // 60fps

  let frameDeadline: number;
  let pendingCallback: IdleRequestCallback;

  const channel = new MessageChannel();
  const timeRemaining = () => frameDeadline - window.performance.now();

  const deadline = {
    didTimeout: false,
    timeRemaining,
  };

  channel.port2.onmessage = () => {
    if (typeof pendingCallback === "function") {
      pendingCallback(deadline);
    }
  };

  global.requestIdleCallback = (callback: IdleRequestCallback) => {
    global.requestAnimationFrame((frameTime) => {
      frameDeadline = frameTime + fps;
      pendingCallback = callback;
      channel.port1.postMessage(null);
    });
    return id;
  };
})(window);
```

- MessageChannel: 브라우저 간 메시지 전송을 위한 API
- 사용 이유: 매크로 태스크를 활용하기 위해, Dom 업데이트를 브라우저가 유휴 상태일 때 실행하기 위해

- setTimeout을 사용하지 않을 이유: 중첩 차단 가능성 및 최소 지연 보장 안됨

# 이제 위를 참고하여 직접 구현해보자.

본 문서는 React와 유사한 구조로 동작하는 **간단한 미니 프레임워크** 예시 코드에 대한 설명 자료다.  
`useState`, `useEffect`, 클래스 컴포넌트 구현 등을 통해 React 내부의 동작 방식을 간단하게 살펴볼 수 있다.

---

## 목차

1. [개요](#개요)
2. [파일 구조](#파일-구조)
3. [핵심 코드](#핵심-코드)
4. [코드 상세 설명](#코드-상세-설명)
   - [1) 전역 상태](#1-전역-상태)
   - [2) createElement 함수](#2-createelement-함수)
   - [3) updateDOM 함수](#3-updatedom-함수)
   - [4) performUnitOfWork 함수](#4-performunitofwork-함수)
   - [5) commitRoot 함수](#5-commitroot-함수)
   - [6) render 함수](#6-render-함수)
   - [7) Component 클래스](#7-component-클래스)
   - [8) useState 훅](#8-usestate-훅)
   - [9) useEffect 훅](#9-useeffect-훅)
   - [10) reconcileChildren 함수](#10-reconcilechildren-함수)
   - [11) requestIdleCallback & workLoop](#11-requestidlecallback--workloop)
5. [정리](#정리)
6. [추가 학습 질문](#추가-학습-질문)

---

## 개요

React는 DOM 조작을 **Fiber 구조**라는 가상의 자료구조에 맡기고, 이를 **비동기적으로 처리**하여 UI를 효율적으로 갱신한다.  
이 문서는 React와 비슷한 구조(하지만 매우 단순화된)를 갖춘 미니 프레임워크를 작성한 예시 코드를 다룬다.

- **가상 DOM**(VirtualElement)
- **Fiber 트리**
- **requestIdleCallback** 기반 스케줄링
- **useState**, **useEffect** 등의 훅 구현

이 코드를 통해 React가 내부적으로 어떻게 동작하는지 큰 그림을 파악할 수 있다.

---

## 파일 구조

- `type.ts` (또는 `type.js`):
  - `FiberNode`, `VirtualElement`, `ComponentFunction` 등 **타입/인터페이스** 정의를 모아둔 파일.
- `mini-react.ts` (본 문서에서 설명할 코드):
  - 미니 리액트의 전반적인 **로직**을 담고 있다.

---

## 핵심 코드

아래 코드는 **단일 파일**로 작성된 예시이며, 적절히 `type.ts` 등을 분리해서 사용할 수도 있다.

```ts
// React와 유사한 미니 프레임워크 구조입니다.

import {
  ComponentFunction,
  FiberNode,
  FiberNodeDOM,
  VirtualElement,
  VirtualElementProps,
  VirtualElementType,
} from "./type";

// 가상 엘리먼트 판별용 유틸 함수
const isVirtualElement = (e: unknown): e is VirtualElement =>
  typeof e === "object";

// React.fragment 대체 심볼 함수
const Fragment = Symbol.for("react.fragment");

// 텍스트 노드를 처리하기 위한 엘리먼트 생성 함수
const createTextElement = (text: string) => ({
  type: "TEXT",
  props: {
    nodeValue: text,
  },
});

// createElement: JSX로부터 변환된 요소들을 실제 VirtualElement로 만들기 함수
function createElement(
  type: VirtualElementType,
  props: Record<string, unknown> = {},
  ...child: (unknown | VirtualElement)[]
): VirtualElement {
  // 자식 중 객체(가상 엘리먼트)가 아닌 것은 텍스트로 변환
  const children = child.map((c) =>
    isVirtualElement(c) ? c : createTextElement(String(c))
  );

  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

// DOM 속성 업데이트 함수
// 이전 속성과 비교하여 제거할 것 제거, 새로 추가할 것 추가 함수
function updateDOM(
  DOM: NonNullable<FiberNodeDOM>,
  prevProps: VirtualElementProps,
  nextProps: VirtualElementProps
) {
  const defaultPropKey = "children";

  // 1) 이전 props를 순회하며 제거
  for (const [removePropKey, removePropValue] of Object.entries(prevProps)) {
    // 이벤트 속성 제거
    if (removePropKey.startsWith("on")) {
      DOM.removeEventListener(
        removePropKey.slice(2).toLowerCase(),
        removePropValue as EventListener
      );
    }
    // 자식 제외
    else if (removePropKey !== defaultPropKey) {
      (DOM as any)[removePropKey] = "";
    }
  }

  // 2) 새로운 props를 순회하며 추가
  for (const [addPropKey, addPropValue] of Object.entries(nextProps)) {
    // 이벤트 속성 등록
    if (addPropKey.startsWith("on")) {
      DOM.addEventListener(
        addPropKey.slice(2).toLowerCase(),
        addPropValue as EventListener
      );
    }
    // 자식 제외
    else if (addPropKey !== defaultPropKey) {
      (DOM as any)[addPropKey] = addPropValue;
    }
  }
}

// Fiber를 하나씩 처리(performUnitOfWork)하고 다음 Fiber로 이동
// 클래스/함수 컴포넌트/일반 문자열 태그 등에 따라 처리 방식 분기 함수
function performUnitOfWork(fiberNode: FiberNode): FiberNode | null {
  const { type } = fiberNode;

  switch (typeof type) {
    case "function": {
      // 함수/클래스 컴포넌트를 위한 준비
      wipFiber = fiberNode;
      wipFiber.useState = [];
      wipFiber.useEffect = [];
      hookIndex = 0;

      let children: ReturnType<ComponentFunction>;

      // 클래스 컴포넌트 판별
      if (Object.getPrototypeOf(type).REACT_COMPONENT) {
        const C = type; // 클래스
        const component = new C(fiberNode.props);
        const [state, setState] = useState(component.state);

        // 클래스 컴포넌트 상태 주입
        component.props = fiberNode.props;
        component.state = state;
        component.setState = setState;

        // 렌더 함수 호출 (this 바인딩)
        children = component.render.bind(component)();
      } else {
        // 함수 컴포넌트
        children = type(fiberNode.props);
      }

      // 자식 Fiber 연결
      reconcileChildren(fiberNode, [
        isVirtualElement(children)
          ? children
          : createTextElement(String(children)),
      ]);
      break;
    }

    case "number":
    case "string":
      // 일반 태그
      if (!fiberNode.dom) {
        fiberNode.dom = createDOM(fiberNode);
      }
      reconcileChildren(fiberNode, fiberNode.props.children);
      break;

    case "symbol":
      // Fragment 처리
      if (type === Fragment) {
        reconcileChildren(fiberNode, fiberNode.props.children);
      }
      break;

    default:
      // 위 케이스가 아닌 모든 엘리먼트 처리
      if (typeof fiberNode.props !== "undefined") {
        reconcileChildren(fiberNode, fiberNode.props.children);
      }
      break;
  }

  // 자식 fiber가 있으면 먼저 내려감
  if (fiberNode.child) {
    return fiberNode.child;
  }

  // 형제 fiber가 있으면 형제로 이동, 없으면 부모를 거슬러 올라감
  let nextFiberNode: FiberNode | undefined = fiberNode;
  while (typeof nextFiberNode !== "undefined") {
    if (nextFiberNode.sibling) {
      return nextFiberNode.sibling;
    }
    nextFiberNode = nextFiberNode.return;
  }

  return null;
}

// Fiber 전체 트리를 만든 뒤, 변경사항을 실제 DOM에 적용(commitRoot) 함수
function commitRoot() {
  // 부모 Fiber 탐색 헬퍼
  function findParentFiber(fiberNode?: FiberNode) {
    if (fiberNode) {
      let parentFiber = fiberNode.return;
      while (parentFiber && !parentFiber.dom) {
        parentFiber = parentFiber.return;
      }
      return parentFiber;
    }
    return null;
  }

  // 삭제 이펙트
  function commitDeletion(
    parentDOM: FiberNodeDOM,
    DOM: NonNullable<FiberNodeDOM>
  ) {
    if (isDef(parentDOM)) {
      parentDOM.removeChild(DOM);
    }
  }

  // REPLACEMENT 이펙트
  function commitReplacement(
    parentDOM: FiberNodeDOM,
    DOM: NonNullable<FiberNodeDOM>
  ) {
    if (isDef(parentDOM)) {
      parentDOM.appendChild(DOM);
    }
  }

  // 실제 DOM 변경 사항 반영
  function commitWork(fiberNode?: FiberNode) {
    if (!fiberNode) return;

    // DOM이 있으면 REPLACEMENT나 UPDATE 처리
    if (fiberNode.dom) {
      const parentFiber = findParentFiber(fiberNode);
      const parentDOM = parentFiber?.dom;

      switch (fiberNode.effectTag) {
        case "REPLACEMENT":
          commitReplacement(parentDOM, fiberNode.dom);
          break;
        case "UPDATE":
          updateDOM(
            fiberNode.dom,
            fiberNode.alternate ? fiberNode.alternate.props : {},
            fiberNode.props
          );
          break;
        default:
          break;
      }
    }

    // useEffect 실행 부분
    if (fiberNode.useEffect && fiberNode.useEffect.length) {
      for (const effectHook of fiberNode.useEffect) {
        if (effectHook?.callback) {
          // deps 변경이 감지된 경우에만 저장되어 있으므로 바로 호출
          effectHook.callback();
        }
      }
    }

    // 자식/형제 노드 처리
    commitWork(fiberNode.child);
    commitWork(fiberNode.sibling);
  }

  // 1) 삭제 목록 먼저 처리
  for (const deletion of deletions) {
    if (deletion.dom) {
      const parentFiber = findParentFiber(deletion);
      commitDeletion(parentFiber?.dom, deletion.dom);
    }
  }

  // 2) 변경사항 전체 반영
  if (wipRoot !== null) {
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
  }

  wipRoot = null;
}

// 유휴 시간(requestIdleCallback)에 남은 Fiber 작업을 이어서 진행 함수
const workLoop: IdleRequestCallback = (deadline) => {
  // 남은 작업이 있고, 시간이 있다면 계속 작업
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 모든 Fiber 생성이 끝났다면 commitRoot 수행
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  // 무한 루프 돌면서 유휴 시간 체크
  window.requestIdleCallback(workLoop);
};

// DOM 생성: TEXT 타입이면 text node, 일반 문자열이면 element 생성 함수
function createDOM(fiberNode: FiberNode) {
  const { type, props } = fiberNode;
  let DOM: Text | HTMLElement | null = null;

  if (type === "TEXT") {
    DOM = document.createTextNode("");
  } else if (typeof type === "string") {
    DOM = document.createElement(type);
  }

  if (DOM !== null) {
    updateDOM(DOM, {}, props);
  }
  return DOM;
}

// render: Fiber 루트 노드를 만들고, 다음 유닛 작업으로 등록 함수
function render(element: VirtualElement, container: Element) {
  currentRoot = null;
  wipRoot = {
    type: "div",
    dom: container,
    props: {
      children: [{ ...element }],
    },
    alternate: currentRoot,
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}

// 추상 클래스로서 Component 정의 함수
abstract class Component {
  props: Record<string, unknown>;
  abstract state: unknown;
  abstract setState: (value: unknown) => void;
  abstract render: () => VirtualElement;

  constructor(props: Record<string, unknown>) {
    this.props = props;
  }

  // 클래스 컴포넌트 판별용 속성
  static REACT_COMPONENT = true;
}

// 전역 상태: 현재 작업 중인 Fiber, 다음 작업 등 함수
let wipRoot: FiberNode | null = null;
let nextUnitOfWork: FiberNode | null = null;
let currentRoot: FiberNode | null = null;
let deletions: FiberNode[] = [];
let wipFiber: FiberNode;
let hookIndex = 0;

// 유틸 함수: 객체 여부, 정의 여부 확인 함수
function isPlainObject(val: unknown): val is Record<string, unknown> {
  return (
    Object.prototype.toString.call(val) === "[object Object]" &&
    [Object.prototype, null].includes(Object.getPrototypeOf(val))
  );
}

function isDef<T>(param: T): param is NonNullable<T> {
  return param !== void 0 && param !== null;
}

// useState 훅: Fiber에 상태를 저장하고, setState가 호출되면 리렌더(trigger)하는 구조 함수
function useState<S>(initState: S): [S, (value: S) => void] {
  const fiberNode: FiberNode<S> = wipFiber;
  // 이전 fiber의 hook이 있으면 가져오고, 없으면 새로 생성
  const hook = fiberNode?.alternate?.useState
    ? fiberNode.alternate.useState[hookIndex]
    : {
        state: initState,
        queue: [] as S[],
      };

  // queue가 비어있지 않으면 상태를 갱신
  while (hook.queue.length) {
    let newState = hook.queue.shift();
    // 객체라면 얕은 병합 로직 (React.setState와 유사)
    if (isPlainObject(hook.state) && isPlainObject(newState)) {
      newState = { ...hook.state, ...newState };
    }
    if (isDef(newState)) {
      hook.state = newState;
    }
  }

  // 현재 Fiber에 hook 배열이 없다면 생성
  if (!fiberNode.useState) {
    fiberNode.useState = [];
  }
  fiberNode.useState[hookIndex] = hook;

  // 다음 훅 인덱스 증가
  hookIndex += 1;

  // setState 구현
  const setState = (value: S) => {
    hook.queue.push(value);
    // 리렌더 트리거
    if (currentRoot) {
      wipRoot = {
        type: currentRoot.type,
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot,
      };
      nextUnitOfWork = wipRoot;
      deletions = [];
      currentRoot = null;
    }
  };

  return [hook.state, setState];
}

// reconcileChildren: 이전 Fiber와 새 VirtualElement를 비교해 Fiber를 갱신 함수
function reconcileChildren(
  fiberNode: FiberNode,
  elements: VirtualElement[] = []
) {
  let index = 0;
  let oldFiberNode: FiberNode | undefined = void 0;
  let prevSibling: FiberNode | undefined = void 0;

  // children 배열을 평탄화
  const virtualElements = elements.flat(Infinity);

  // 이전 fiber가 있으면 oldFiberNode로 가져옴
  if (fiberNode.alternate?.child) {
    oldFiberNode = fiberNode.alternate.child;
  }

  // 새 엘리먼트와 이전 fiber를 순회하며 비교
  while (
    index < virtualElements.length ||
    typeof oldFiberNode !== "undefined"
  ) {
    const virtualElement = virtualElements[index];
    let newFiber: FiberNode | undefined = void 0;

    // 타입이 같으면 UPDATE, 다르면 REPLACEMENT
    const isSameType =
      Boolean(oldFiberNode) &&
      Boolean(virtualElement) &&
      oldFiberNode!.type === virtualElement?.type;

    // 1) 동일 타입
    if (isSameType && oldFiberNode) {
      newFiber = {
        type: oldFiberNode.type,
        dom: oldFiberNode.dom,
        alternate: oldFiberNode,
        props: virtualElement.props,
        return: fiberNode,
        effectTag: "UPDATE",
      };
    }

    // 2) 타입 다르고 새 엘리먼트 있으면 새 Fiber 생성
    if (!isSameType && virtualElement) {
      newFiber = {
        type: virtualElement.type,
        dom: null,
        alternate: null,
        props: virtualElement.props,
        return: fiberNode,
        effectTag: "REPLACEMENT",
      };
    }

    // 3) 타입 다르고 이전 Fiber 있으면 삭제 처리
    if (!isSameType && oldFiberNode) {
      deletions.push(oldFiberNode);
    }

    // oldFiberNode를 형제로 이동
    if (oldFiberNode) {
      oldFiberNode = oldFiberNode.sibling;
    }

    // 첫 번째 자식이면 fiberNode.child, 아니면 형제로 이어붙임
    if (index === 0) {
      fiberNode.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index += 1;
  }
}

// useEffect 훅: deps 비교 후 변경되었으면 callback 등록 함수
function useEffect(callback: () => void, deps: unknown[]) {
  const fiberNode: FiberNode = wipFiber;
  // 현재 Fiber에 useEffect 배열이 없다면 새로 생성
  if (!fiberNode.useEffect) {
    fiberNode.useEffect = [];
  }

  // 이전 effect 훅이 있으면 가져옴
  const oldHook = fiberNode.useEffect[hookIndex];
  // 이전 deps가 없거나, 현재 deps와 달라졌으면 true
  const hasDepsChanged =
    !oldHook?.deps || deps.some((dep, i) => dep !== oldHook.deps?.[i]);

  // deps가 달라졌을 경우에만 callback을 저장
  const hook = {
    deps,
    callback: hasDepsChanged ? callback : oldHook?.callback,
  };

  fiberNode.useEffect[hookIndex] = hook;
  hookIndex++;
}
// 최종적으로 requestIdleCallback를 통해 workLoop 시작 함수
(function main() {
  window.requestIdleCallback(workLoop);
})();

// 외부로 내보내기 함수
export default {
  useState,
  useEffect,
  Component,
  render,
  createElement,
};
```

---

## 코드 상세 설명

### 1) 전역 상태

```ts
let wipRoot: FiberNode | null = null;
let nextUnitOfWork: FiberNode | null = null;
let currentRoot: FiberNode | null = null;
let deletions: FiberNode[] = [];
let wipFiber: FiberNode;
let hookIndex = 0;
```

- wipRoot: 현재 작업 중인 Root Fiber (work-in-progress Root)
- nextUnitOfWork: 다음에 처리할 Fiber 단위 작업
- currentRoot: 이전에 커밋된 Root Fiber (화면에 실제 반영된 상태)
- deletions: 삭제할 Fiber 목록
- wipFiber: 현재 처리 중인 Fiber
- hookIndex: 함수 컴포넌트 훅(useState, useEffect 등)을 순서대로 매핑하기 위한 인덱스

### 2) createElement 함수

```ts
function createElement(
  type: VirtualElementType,
  props: Record<string, unknown> = {},
  ...child: (unknown | VirtualElement)[]
): VirtualElement {
  // 자식 중 객체(가상 엘리먼트)가 아닌 것은 텍스트로 변환
  const children = child.map((c) =>
    isVirtualElement(c) ? c : createTextElement(String(c))
  );

  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
```

- `JSX(<App />)로 표현된 코드를 실제 VirtualElement 형태로 만든다.`
- 자식 요소 중 객체가 아닌 문자열/숫자 등은 모두 TEXT 엘리먼트로 변환한다.

### 3) updateDOM 함수

```ts
function updateDOM(
  DOM: NonNullable<FiberNodeDOM>,
  prevProps: VirtualElementProps,
  nextProps: VirtualElementProps
) {
  const defaultPropKey = "children";

  // 1) 이전 props를 순회하며 제거
  for (const [removePropKey, removePropValue] of Object.entries(prevProps)) {
    // 이벤트 속성 제거
    if (removePropKey.startsWith("on")) {
      DOM.removeEventListener(
        removePropKey.slice(2).toLowerCase(),
        removePropValue as EventListener
      );
    }
    // 자식 제외
    else if (removePropKey !== defaultPropKey) {
      (DOM as any)[removePropKey] = "";
    }
  }

  // 2) 새로운 props를 순회하며 추가
  for (const [addPropKey, addPropValue] of Object.entries(nextProps)) {
    // 이벤트 속성 등록
    if (addPropKey.startsWith("on")) {
      DOM.addEventListener(
        addPropKey.slice(2).toLowerCase(),
        addPropValue as EventListener
      );
    }
    // 자식 제외
    else if (addPropKey !== defaultPropKey) {
      (DOM as any)[addPropKey] = addPropValue;
    }
  }
}
```

- DOM 엘리먼트의 속성을 이전 속성과 비교하여 변경된 부분만 업데이트한다.
- 이벤트 속성(onClick, onChange 등)은 addEventListener로 등록한다.

### 4) performUnitOfWork 함수

```ts
function performUnitOfWork(fiberNode: FiberNode): FiberNode | null {
  const { type } = fiberNode;

  switch (typeof type) {
    case "function": {
      // 함수/클래스 컴포넌트를 위한 준비
      wipFiber = fiberNode;
      wipFiber.useState = [];
      wipFiber.useEffect = [];
      hookIndex = 0;

      let children: ReturnType<ComponentFunction>;

      // 클래스 컴포넌트 판별
      if (Object.getPrototypeOf(type).REACT_COMPONENT) {
        const C = type; // 클래스
        const component = new C(fiberNode.props);
        const [state, setState] = useState(component.state);

        // 클래스 컴포넌트 상태 주입
        component.props = fiberNode.props;
        component.state = state;
        component.setState = setState;

        // 렌더 함수 호출 (this 바인딩)
        children = component.render.bind(component)();
      } else {
        // 함수 컴포넌트
        children = type(fiberNode.props);
      }

      // 자식 Fiber 연결
      reconcileChildren(fiberNode, [
        isVirtualElement(children)
          ? children
          : createTextElement(String(children)),
      ]);
      break;
    }

    case "number":
    case "string":
      // 일반 태그
      if (!fiberNode.dom) {
        fiberNode.dom = createDOM(fiberNode);
      }
      reconcileChildren(fiberNode, fiberNode.props.children);
      break;

    case "symbol":
      // Fragment 처리
      if (type === Fragment) {
        reconcileChildren(fiberNode, fiberNode.props.children);
      }
      break;

    default:
      // 위 케이스가 아닌 모든 엘리먼트 처리
      if (typeof fiberNode.props !== "undefined") {
        reconcileChildren(fiberNode, fiberNode.props.children);
      }
      break;
  }

  // 자식 fiber가 있으면 먼저 내려감
  if (fiberNode.child) {
    return fiberNode.child;
  }

  // 형제 fiber가 있으면 형제로 이동, 없으면 부모를 거슬러
  let nextFiberNode: FiberNode | undefined = fiberNode;
  while (typeof nextFiberNode !== "undefined") {
    if (nextFiberNode.sibling) {
      return nextFiberNode.sibling;
    }
    nextFiberNode = nextFiberNode.return;
  }

  return null;
}
```

- Fiber 노드 하나를 처리하고, 처리 결과로 다음에 처리할 Fiber 노드를 반환한다.
- 함수/클래스 컴포넌트, 일반 태그 등으로 분기하여 자식들을 생성(reconcileChildren 호출).
- 자식이 없으면 형제(sibling)로 이동, 형제도 없으면 부모를 거슬러 올라간다.

### 5) commitRoot 함수

```ts
function commitRoot() {
  // 부모 Fiber 탐색 헬퍼
  function findParentFiber(fiberNode?: FiberNode) {
    if (fiberNode) {
      let parentFiber = fiberNode.return;
      while (parentFiber && !parentFiber.dom) {
        parentFiber = parentFiber.return;
      }
      return parentFiber;
    }
    return null;
  }

  // 삭제 이펙트
  function commitDeletion(
    parentDOM: FiberNodeDOM,
    DOM: NonNullable<FiberNodeDOM>
  ) {
    if (isDef(parentDOM)) {
      parentDOM.removeChild(DOM);
    }
  }

  // REPLACEMENT 이펙트
  function commitReplacement(
    parentDOM: FiberNodeDOM,
    DOM: NonNullable<FiberNodeDOM>
  ) {
    if (isDef(parentDOM)) {
      parentDOM.appendChild(DOM);
    }
  }

  // 실제 DOM 변경 사항 반영
  function commitWork(fiberNode?: FiberNode) {
    if (!fiberNode) return;

    // DOM이 있으면 REPLACEMENT나 UPDATE 처리
    if (fiberNode.dom) {
      const parentFiber = findParentFiber(fiberNode);
      const parentDOM = parentFiber?.dom;

      switch (fiberNode.effectTag) {
        case "REPLACEMENT":
          commitReplacement(parentDOM, fiberNode.dom);
          break;
        case "UPDATE":
          updateDOM(
            fiberNode.dom,
            fiberNode.alternate ? fiberNode.alternate.props : {},
            fiberNode.props
          );
          break;
        default:
          break;
      }
    }

    // useEffect 실행 부분
    if (fiberNode.useEffect && fiberNode.useEffect.length) {
      for (const effectHook of fiberNode.useEffect) {
        if (effectHook?.callback) {
          // deps 변경이 감지된 경우에만 저장되어 있으므로 바로 호출
          effectHook.callback();
        }
      }
    }

    // 자식/형제 노드 처리
    commitWork(fiberNode.child);
    commitWork(fiberNode.sibling);
  }

  // 1) 삭제 목록 먼저 처리
  for (const deletion of deletions) {
    if (deletion.dom) {
      const parentFiber = findParentFiber(deletion);
      commitDeletion(parentFiber?.dom, deletion.dom);
    }
  }

  // 2) 변경사항 전체 반영
  if (wipRoot !== null) {
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
  }

  wipRoot = null;
}
```

- 전체 Fiber 작업이 끝난 뒤 DOM에 반영하는 단계.
- commitWork를 재귀적으로 돌며, 각 Fiber의 effectTag에 따라 REPLACEMENT, UPDATE, (삭제 목록) 을 처리한다.
- 이 시점에 useEffect 콜백도 호출된다.

### 6) render 함수

```ts
function render(element: VirtualElement, container: Element) {
  currentRoot = null;
  wipRoot = {
    type: "div",
    dom: container,
    props: {
      children: [{ ...element }],
    },
    alternate: currentRoot,
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}
```

- 최상위 루트 Fiber(wipRoot)를 생성하고, nextUnitOfWork에 등록한다.
- 기존 currentRoot를 null로 만들어 초기 상태로 만들고, deletions 목록도 비운다.

### 7) Component 클래스

```ts
abstract class Component {
  props: Record<string, unknown>;
  abstract state: unknown;
  abstract setState: (value: unknown) => void;
  abstract render: () => VirtualElement;

  constructor(props: Record<string, unknown>) {
    this.props = props;
  }

  // 클래스 컴포넌트 판별용 속성
  static REACT_COMPONENT = true;
}
```

- 클래스 컴포넌트를 판별하기 위한 REACT_COMPONENT 속성을 갖는다.
- render() 메서드를 통해 UI 정의, setState()는 훗날 useState처럼 상태 변경 트리거 역할을 한다.

### 8) useState 훅

```ts
function useState<S>(initState: S): [S, (value: S) => void] {
  ...
}
```

- Fiber 구조에 Hook 정보를 저장하고, setState를 호출하면 re-render가 트리거된다.
- queue를 이용해 새 상태를 쌓아두고, 작업 시점에 병합한다.

### 9) useEffect 훅

```ts
function useEffect(callback: () => void, deps: unknown[]) {
  ...
}
```

- deps(배열)에 변경 사항이 있을 경우에만 callback을 교체한다.
- 실제 콜백 실행은 commitRoot → commitWork 과정에서 일어난다.

### 10) reconcileChildren 함수

```ts
function reconcileChildren(
  fiberNode: FiberNode,
  elements: VirtualElement[] = []
) {
  let index = 0;
  let oldFiberNode: FiberNode | undefined = void 0;
  let prevSibling: FiberNode | undefined = void 0;

  // children 배열을 평탄화
  const virtualElements = elements.flat(Infinity);

  // 이전 fiber가 있으면 oldFiberNode로 가져옴
  if (fiberNode.alternate?.child) {
    oldFiberNode = fiberNode.alternate.child;
  }

  // 새 엘리먼트와 이전 fiber를 순회하며 비교
  while (
    index < virtualElements.length ||
    typeof oldFiberNode !== "undefined"
  ) {
    const virtualElement = virtualElements[index];
    let newFiber: FiberNode | undefined = void 0;

    // 타입이 같으면 UPDATE, 다르면 REPLACEMENT
    const isSameType =
      Boolean(oldFiberNode) &&
      Boolean(virtualElement) &&
      oldFiberNode!.type === virtualElement?.type;

    // 1) 동일 타입
    if (isSameType && oldFiberNode) {
      newFiber = {
        type: oldFiberNode.type,
        dom: oldFiberNode.dom,
        alternate: oldFiberNode,
        props: virtualElement.props,
        return: fiberNode,
        effectTag: "UPDATE",
      };
    }

    // 2) 타입 다르고 새 엘리먼트 있으면 새 Fiber 생성
    if (!isSameType && virtualElement) {
      newFiber = {
        type: virtualElement.type,
        dom: null,
        alternate: null,
        props: virtualElement.props,
        return: fiberNode,
        effectTag: "REPLACEMENT",
      };
    }

    // 3) 타입 다르고 이전 Fiber 있으면 삭제 처리
    if (!isSameType && oldFiberNode) {
      deletions.push(oldFiberNode);
    }

    // oldFiberNode를 형제로 이동
    if (oldFiberNode) {
      oldFiberNode = oldFiberNode.sibling;
    }

    // 첫 번째 자식이면 fiberNode.child, 아니면 형제로 이어붙임
    if (index === 0) {
      fiberNode.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index += 1;
  }
}
```

- 이전 Fiber 노드(oldFiberNode)와 새 VirtualElement를 비교하여, UPDATE / REPLACEMENT / DELETION을 결정한다.
- 동일 타입이면 업데이트, 타입 불일치면 교체, 새 엘리먼트가 없는데 이전 Fiber만 남아있으면 삭제.

### 11) requestIdleCallback & workLoop

```ts
const workLoop: IdleRequestCallback = (deadline) => {
  // 남은 작업이 있고, 시간이 있다면 계속 작업
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 모든 Fiber 생성이 끝났다면 commitRoot 수행
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  // 무한 루프 돌면서 유휴 시간 체크
  window.requestIdleCallback(workLoop);
};

((global: Window) => {
  const id = 1;
  const fps = 1e3 / 60;
  let frameDeadline: number;
  let pendingCallback: IdleRequestCallback;
  const channel = new MessageChannel();
  const timeRemaining = () => frameDeadline - window.performance.now();

  const deadline = {
    didTimeout: false,
    timeRemaining,
  };

  channel.port2.onmessage = () => {
    if (typeof pendingCallback === "function") {
      pendingCallback(deadline);
    }
  };

  global.requestIdleCallback = (callback: IdleRequestCallback) => {
    global.requestAnimationFrame((frameTime) => {
      frameDeadline = frameTime + fps;
      pendingCallback = callback;
      channel.port1.postMessage(null);
    });
    return id;
  };
})(window);

(function main() {
  window.requestIdleCallback(workLoop);
})();
```

- requestIdleCallback을 통해 남는 시간(deadline.timeRemaining())을 활용하여 performUnitOfWork를 반복 실행한다.
- 모든 작업이 끝나면 commitRoot로 DOM을 최종 업데이트한다.
