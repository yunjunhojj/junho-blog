---
title: "vue to nextjs migration를 진행하며"
slug: vue-to-nextjs-migration
tags:
  - vue
  - nextjs
  - migration
authors: [junho]
---

# vue to nextjs migration를 진행하며

## 1. Vue.js에서 Next.js로의 마이그레이션 이유

1. SSR(Server-Side Rendering) 지원: Vue 또한 Nuxt.js로 SSR이 가능하지만, Next.js는 React를 기반으로 다양한 생태계와 업데이트 속도를 갖추고 있어 선택했다.

2. React 중심의 조직 표준화: 조직 내 React 스택을 사용하는 프로젝트가 늘어나면서, Vue와 React 혼용보다는 통일된 기술 스택을 사용해 효율적 개발을 기대했다. 추가로 채용 관점에서도 React 개발자를 쉽게 구할 수 있어 선택했다.

3. 성능과 SEO 최적화: Next.js가 SSR과 SSG(Static Site Generation)를 간단하게 지원해, 퍼포먼스와 SEO 모두에서 이점을 주었다.

## 2. 마이그레이션 전략: iframe을 이용한 단계적 교체

1. 레거시 서비스와 신규 서비스의 공존

   - 레거시 Vue 프로젝트를 완전히 새로 만들기엔 리스크가 크거나, 특정 기능만 우선 React로 옮겨야 하는 경우가 있다.

   - 이런 상황에서 iframe을 통해 Next.js로 구현한 화면을 Vue 서비스 내부에 삽입해, 원하는 시점에 점진적으로 대체할 수 있다.

2. iframe 구성 방식

   1. Vue 메인 앱 (레거시)

      - 기존 Vue 앱이 전체 레이아웃이나 공통 UI, 인증 로직 등을 담당한다.

   2. Next.js 서브 앱 (신규)

      - 신규 기능을 React와 Next.js로 구현하여 iframe으로 불러온다.

      - 독립된 도메인 또는 서브도메인을 사용한다.

   3. 통신 (modal 관리, toast, 로딩바 등)

      - Vue 메인 앱 ↔ Next.js 서브 앱 간 데이터나 이벤트를 주고받을 때 postMessage를 사용한다.

## 3. postMessage로 통신하는 방법

**postMessage의 특징**

- postMessage는 서로 다른 도메인 간에도 메시지를 주고받을 수 있도록 지원한다.

- window.postMessage(message, targetOrigin) API를 통해 메시지를 전송하고, **window.addEventListener(‘message’, handler)** 를 사용해 이벤트를 수신한다.

- 보안을 위해 targetOrigin을 정확히 지정하거나, 유효성 검증을 거치도록 한다.

**postMessage 사용 예시**

1. Vue 메인 앱에서 Next.js 서브 앱으로 메시지 전송

```javascript
// Vue 메인 앱
<template>
  <div>
    <iframe
      ref="nextIframe"
      src="https://next-app.example.com"
      width="100%"
      height="600"
    ></iframe>
    <button @click="sendMessageToNext">Next.js로 메시지 보내기</button>
  </div>
</template>

<script>
export default {
  name: "VueApp",
  methods: {
    sendMessageToNext() {
      const iframe = this.$refs.nextIframe;
      const message = { type: "FROM_VUE", data: "Hello Next.js!" };
      iframe.contentWindow.postMessage(message, "https://next-app.example.com");
    },
  },
  mounted() {
    window.addEventListener("message", (event) => {
      // 출처 확인
      if (event.origin !== "https://next-app.example.com") return;

      if (event.data.type === "FROM_NEXT") {
        console.log("Next에서 보낸 데이터:", event.data.data);
      }
    });
  },
};
</script>
```

2. Next.js 서브 앱에서 Vue 메인 앱으로 메시지 수신

```javascript
// pages/index.js
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // 메시지 수신
    const handleMessage = (event) => {
      if (event.origin !== "https://vue-app.example.com") return;

      if (event.data.type === "FROM_VUE") {
        console.log("Vue에서 보낸 데이터:", event.data.data);

        // 메시지 응답
        event.source.postMessage(
          { type: "FROM_NEXT", data: "Hello Vue!" },
          event.origin
        );
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>Next.js Iframe 페이지</h1>
      <p>Vue로부터 메시지를 기다리는 중...</p>
    </div>
  );
}
```

## 4. 구현 시 주의사항

1. 보안 이슈

   - postMessage를 사용할 때 출처를 반드시 확인해야 한다.

   - targetOrigin을 정확히 지정하거나, 출처 검증을 통해 보안 취약점을 방지한다.

2. 성능 고려

   - iframe은 독립적인 문서로 구동되므로, 불필요한 네트워크 요청이나 리소스 낭비가 생길 수 있다. 필요한 경우에만 iframe을 사용하고, 점차 전체 페이지로 전환하는 로드맵을 계획한다.

3. 반복되는 코드 최소화

   - 데이터를 주고 받는 로직은 공통 모듈로 분리해 중복을 최소화한다.

4. SEO 및 SSR 제한

   - iframe에 렌더링된 콘텐츠는 부모 페이지가 SSR을 하더라도 검색 엔진이 직접 인덱싱하기 어렵다. 마이그레이션이 끝나면 iframe 의존도를 줄이는 방향을 갖는다.

## 5. 실습으로 배우는 Vue.js에서 Next.js로의 마이그레이션

**실습 목표**

- Vue 페이지: “Todo 생성 및 목록” (하나의 페이지에서 생성과 목록을 한 번에 처리)
- Next.js 페이지: “Todo 생성”과 “Todo 목록” (각각 분리된 페이지)

하단 Nav(또는 메뉴)를 통해 3개의 페이지를 전환할 수 있도록 만든다.

1. 프로젝트 구조 개요

```
root/
├─ vue-app/                 // Vue 메인 앱
│  ├─ public/
│  ├─ src/
│  │  ├─ router/
│  │  ├─ components/
│  │  ├─ views/
│  │  └─ App.vue
│  ├─ package.json
│  └─ ...
└─ next-app/                // Next.js 서브 앱
   ├─ pages/
   │  ├─ todo-create.js
   │  ├─ todo-list.js
   │  └─ index.js
   ├─ package.json
   └─ ...
```

2. 프로젝트 생성 및 설정

```bash
# 프로젝트 폴더 생성
mkdir vue-next-migration
cd vue-next-migration

# Vue 프로젝트 생성
$ yarn create vite vue-app --template vue

# Next.js 프로젝트 생성 (pages router 로 설정)
$ npx create-next-app@latest --ts next-app

# dev port 설정
# vue-app: 8080, next-app: 8001 (dev -p 8001)
```

3. json-server 설치 및 설정

```bash
# json-server 설치
$ yarn add json-server
```

# db.json 파일 생성

# vue-app 폴더에 각각 생성

````json
{
  "todos": []
}
```

# package.json 수정

```json
"scripts": {
  "json-server": "json-server --watch db.json --port 3000"
}
````

# json-server 실행

```bash
$ yarn json-server
```

4. Vue 메인 앱 구현

- app.vue

```vue
<template>
  <div class="layout" style="background-color: aqua">
    <nav>
      <ul>
        <li><a href="#/todoAll">Todo All</a></li>
        <li><a href="#/todoListIframe">Todo List Iframe</a></li>
        <li><a href="#/addIframe">Todo 생성 Iframe</a></li>
      </ul>
    </nav>
    <component :is="currentView" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TodoAll from "./views/TodoAll.vue";
import TodoListIframe from "./views/TodoListIframe.vue";
import AddIframe from "./views/AddIframe.vue";

const routes = {
  "/": TodoAll,
  "/todoAll": TodoAll,
  "/todoListIframe": TodoListIframe,
  "/addIframe": AddIframe,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>
```

- views/TodoAll.vue

```vue
<template>
  <div>
    <h2>Todo 생성 및 목록 (Vue + JSON Server)</h2>
    <input v-model="newTodo" placeholder="할 일 입력" @keyup.enter="addTodo" />
    <button @click="addTodo">추가</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const todos = ref([]);
    const newTodo = ref("");

    // JSON Server에서 Todo 목록 가져오기
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        todos.value = await response.json();
      } catch (error) {
        console.error("할 일 목록을 불러오는데 실패했습니다.", error);
      }
    };

    // 새로운 Todo 추가하기
    const addTodo = async () => {
      if (!newTodo.value.trim()) return;

      const newTask = { title: newTodo.value };

      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          const createdTodo = await response.json();
          todos.value.push(createdTodo); // 목록에 추가
          newTodo.value = ""; // 입력값 초기화
        }
      } catch (error) {
        console.error("할 일 추가 실패", error);
      }
    };

    // 컴포넌트가 마운트되면 기존 데이터 로드
    onMounted(fetchTodos);

    return { todos, newTodo, addTodo };
  },
};
</script>
```

- views/TodoListIframe.vue

```vue
<template>
  <div>
    <h2>Todo List Iframe</h2>
    <iframe src="localhost:8081/todoList" width="100%" height="100%" />
  </div>
</template>
```

- views/AddIframe.vue

```vue
<template>
  <div>
    <h2>Todo 생성 Iframe</h2>
    <iframe src="localhost:8081/addIframe" width="100%" height="100%" />
  </div>
</template>
```

5. Next.js 서브 앱 구현

- pages/todo-list.js

```javascript
import { useEffect, useState } from "react";
```
