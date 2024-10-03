# 9. 고급 CSS

고급 CSS 기법은 웹 페이지의 사용자 경험을 향상시키고, 유지보수성 및 효율성을 높이는 데 중요한 역할을 합니다.

## 9.1 애니메이션과 트랜지션 효과

애니메이션과 트랜지션을 사용하면 웹 페이지의 요소들이 부드럽게 변하거나 이동하는 효과를 줄 수 있습니다. 이를 통해 웹사이트는 더욱 다이나믹하고 상호작용적인 느낌을 제공할 수 있습니다.

### 9.1.1 트랜지션 효과 (Transition)

트랜지션은 요소의 상태가 변경될 때, 즉시 변경되는 것이 아니라 부드럽게 변하는 효과를 제공합니다. 트랜지션을 통해 사용자 인터페이스가 더 자연스럽고 매끄럽게 느껴지도록 할 수 있습니다.

#### 기본 문법

```css
.element {
  transition: [property] [duration] [timing-function] [delay];
}
```

- property: 트랜지션이 적용될 CSS 속성 (예: all, width, background-color 등)

- duration: 트랜지션이 진행되는 시간 (예: 0.5s, 1s)

- timing-function: 트랜지션의 속도 곡선 (ease, linear, ease-in, ease-out 등)

- delay: 트랜지션이 시작되기 전 대기 시간

**트랜지션 예시**: 아래 코드는 버튼에 마우스를 올렸을 때 배경색이 변경되고, 크기가 살짝 커지는 트랜지션 효과를 제공합니다.

```css
.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
}

.button:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}
```

### 9.1.2 애니메이션 (Animation)

애니메이션은 트랜지션보다 더 복잡하고, 연속적인 프레임을 통해 요소가 다양한 변화를 겪도록 할 수 있습니다. 애니메이션은 시작부터 끝까지 여러 단계로 나뉘어 동작할 수 있습니다.

```css
@keyframes animation-name {
  from {
    /* 시작 상태 */
  }
  to {
    /* 끝 상태 */
  }
}

.element {
  animation: [animation-name] [duration] [timing-function] [delay]
    [iteration-count] [direction];
}
```

- animation-name: 미리 정의된 @keyframes 애니메이션 이름

- duration: 애니메이션이 진행되는 시간

- timing-function: 애니메이션의 속도 곡선

- delay: 애니메이션이 시작되기 전 대기 시간

- iteration-count: 애니메이션 반복 횟수 (infinite로 설정하면 무한
  반복)
- direction: 애니메이션이 반복될 때 진행 방향 (normal, reverse,
  alternate 등)

**애니메이션 예시**: 아래 코드는 요소가 좌우로 100px씩 부드럽게 이동하는 애니메이션을 설정하며, 무한 반복으로 계속해서 슬라이드됩니다.

```css
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

.element {
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
  animation: slide 2s ease-in-out infinite alternate;
}
```

## 9.2 CSS 변수와 커스텀 프로퍼티

CSS 변수(CSS Variables)는 CSS에서 변수를 사용할 수 있게 해주는 기능으로, 반복적으로 사용되는 값을 하나의 변수로 정의하여 재사용성을 높일 수 있습니다. 이를 통해 유지보수성을 높이고 코드 중복을 줄일 수 있습니다.

### 9.2.1 기본 문법

CSS 변수는 --로 시작하는 이름으로 정의하며, 이를 사용하는 요소에서 var() 함수로 참조할 수 있습니다.

```css
:root {
  --main-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
}

body {
  font-size: var(--font-size);
  color: var(--main-color);
}

button {
  background-color: var(--secondary-color);
  font-size: var(--font-size);
}
```

위 코드에서 --main-color, --secondary-color, --font-size라는 변수를 정의하여 여러 요소에서 재사용하고 있습니다. :root 선택자는 전역적으로 변수를 정의할 때 사용됩니다.

### 9.2.2 변수의 동적 업데이트

CSS 변수는 JavaScript를 통해 동적으로 변경할 수도 있습니다. 이를 사용하면 사용자가 테마를 변경하거나 상호작용할 때 CSS 속성을 동적으로 조정할 수 있습니다.

**예시: 테마 변경**

```html
<button id="dark-mode-toggle">다크 모드</button>

<style>
  :root {
    --background-color: white;
    --text-color: black;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .dark-mode {
    --background-color: black;
    --text-color: white;
  }
</style>

<script>
  const toggleButton = document.getElementById("dark-mode-toggle");
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
</script>
```

위 예시에서는 버튼을 클릭할 때마다 다크 모드와 기본 모드가 전환되며, 이를 CSS 변수를 사용하여 배경색과 텍스트 색상이 변경됩니다.

### 애니메이션 및 트랜지션 예시 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Animation & Transition Demo</title>
    <style>
      /* 공통 스타일 */
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin: 0;
        padding: 20px;
      }

      h1 {
        margin-bottom: 50px;
      }

      .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 300px;
      }

      .box {
        width: 100px;
        height: 100px;
        margin: 0 20px;
        text-align: center;
        line-height: 100px;
        font-size: 18px;
        color: white;
        border-radius: 10px;
      }

      /* 트랜지션 예제 */
      .transition-box {
        background-color: #3498db;
        transition: background-color 0.5s ease, transform 0.3s ease-in-out;
      }

      .transition-box:hover {
        background-color: #e74c3c;
        transform: scale(1.2);
      }

      /* 애니메이션 예제 */
      @keyframes slide {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(150px);
        }
        100% {
          transform: translateX(0);
        }
      }

      .animation-box {
        background-color: #2ecc71;
        animation: slide 2s ease-in-out infinite;
      }
    </style>
  </head>
  <body>
    <h1>CSS Animation & Transition Demo</h1>

    <div class="container">
      <!-- 트랜지션 박스 -->
      <div class="box transition-box">Hover Me</div>

      <!-- 애니메이션 박스 -->
      <div class="box animation-box">Sliding</div>
    </div>
  </body>
</html>
```
