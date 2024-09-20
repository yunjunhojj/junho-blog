import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";

// 캐릭터 위치를 관리하기 위한 상태 정의
const initialPosition = {
  x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
};

// 이미지 좌표 설정 (임의로 설정한 값)
const docsPosition = {
  x: 800,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
};
const blogPosition = {
  x: typeof window !== "undefined" ? window.innerWidth / 2 + 150 : 0,
  y: 400,
};
const aboutPosition = {
  x: typeof window !== "undefined" ? window.innerWidth - 800 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 + 100 : 0,
};

export default function HomepageFeatures(): JSX.Element {
  const [position, setPosition] = useState(initialPosition);

  // 방향키 입력을 감지하여 캐릭터를 이동시키는 함수 (데스크탑)
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - 10,
        }));
        break;
      case "ArrowRight":
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x + 10,
        }));
        break;
      case "ArrowUp":
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y - 10,
        }));
        break;
      case "ArrowDown":
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 10,
        }));
        break;
      default:
        break;
    }
  };

  // 터치 시작 시 실행되는 함수
  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    setPosition({ x: touch.clientX - 50, y: touch.clientY - 50 });
  };

  // 특정 페이지 영역에 도달했을 때 해당 페이지로 이동하는 함수
  const handlePageNavigation = () => {
    const distance = (
      pos1: { x: number; y: number },
      pos2: { x: number; y: number }
    ) => Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));

    if (distance(position, docsPosition) < 100) {
      window.location.href = "/docs/intro"; // Docs 페이지로 이동
    } else if (distance(position, blogPosition) < 90) {
      window.location.href = "/blog"; // Blog 페이지로 이동
    } else if (distance(position, aboutPosition) < 120) {
      window.location.href = "/about"; // About 페이지로 이동
    }
  };

  // 키보드 및 터치 이벤트 핸들러 등록
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    handlePageNavigation(); // 캐릭터 위치에 따른 페이지 이동 처리

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [position]);

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div>
          {/* 캐릭터 */}
          <div
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              transition: "top 1s, left 1s", // 움직임 부드럽게 처리
            }}
          >
            <img
              src="/img/main_game/mac3.jpeg" // 캐릭터 이미지
              alt="맥북 캐릭터"
              width={100}
              height={100}
            />
          </div>

          {/* Docs 이미지 */}
          <div
            style={{
              position: "absolute",
              top: docsPosition.y,
              left: docsPosition.x,
            }}
          >
            <img
              src="/img/main_game/docs.jpeg" // Docs 페이지로 이동하는 이미지
              alt="Docs"
              width={100}
              height={100}
            />
          </div>

          {/* Blog 이미지 */}
          <div
            style={{
              position: "absolute",
              top: blogPosition.y,
              left: blogPosition.x,
            }}
          >
            <img
              src="/img/main_game/blog.png" // Blog 페이지로 이동하는 이미지
              alt="Blog"
              width={50}
              height={50}
            />
          </div>

          {/* About 이미지 */}
          <div
            style={{
              position: "absolute",
              top: aboutPosition.y,
              left: aboutPosition.x,
            }}
          >
            <img
              src="/img/main_game/about.png" // About 페이지로 이동하는 이미지
              alt="About"
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
    </BrowserOnly>
  );
}
