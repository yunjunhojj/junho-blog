# 일주일만에 훑어보는 운영체제

> 운영체제라는 과목은 대학교에서도 많은 시간을 들여 공부하는 분야입니다. 일주일 만에 마스터 할 수는 없겠지만, 운영체제의 기본 개념과 운영체제가 하는 일에 대해 간단히 알아보겠습니다.

# 일주일만에 훑어보는 운영체제

## Day 1: 운영체제 개념 이해

1. 운영체제 정의와 역할
   - 운영체제란 무엇인가?
   - 자원 관리(CPU, 메모리, 디스크, 네트워크)
   - 사용자/커널 모드와 특권 명령
   - 시스템 콜과 인터럽트
   - 보안 및 보호 메커니즘, 메모리/CPU 보호
2. 커널(Kernel) 구조 및 인터럽트 처리

   - 커널 개념, 커널모드 vs 사용자모드
   - 인터럽트(하드웨어/소프트웨어), IRQ
   - 타이머를 통한 CPU 보호

3. 메모리 계층 구조
   - 레지스터, 캐시, 메인 메모리, 보조기억장치
   - 메모리 계층 활용과 성능 최적화

---

## Day 2: 프로세스와 스레드

1. 프로세스 개념

   - 프로세스 상태(new, ready, running, waiting, terminated)
   - PCB(Process Control Block), 컨텍스트 스위칭

2. 프로세스 생성과 종료

   - fork(), exec(), exit(), wait() 시스템 콜
   - 부모-자식 관계, 자발적/비자발적 종료

3. 스케줄러와 스케줄링 알고리즘

   - 장기/중기/단기 스케줄러 개념
   - FCFS, SJF, Priority, Round Robin, Multilevel Queue, Multilevel Feedback Queue

4. 스레드(Thread) 개념 및 동기화 기법 소개
   - 스레드와 멀티스레딩
   - IPC(파이프, 메시지 큐, 공유 메모리 등) 및 동기화 기법(뮤텍스, 세마포어, 모니터)

---

## Day 3: 메모리 관리

1. 메모리 할당 기법과 단편화

   - First-Fit, Best-Fit, Worst-Fit
   - 내부/외부 단편화, 스와핑

2. 가상 메모리(Virtual Memory)

   - 요구 페이징(Demand Paging)
   - 페이지 테이블, Valid-Invalid Bit
   - 페이지 폴트 처리 과정

3. 페이지 교체 알고리즘

   - FIFO, LRU, LFU, Optimal
   - Clock 알고리즘, Belady’s Anomaly

4. 메모리 관리 기법 비교
   - 논리/물리 주소, MMU
   - 페이징(Paging), 세그멘테이션(Segmentation) 비교

---

## Day 4: 프로세스 동기화와 데드락

1. 동시성(Concurrency)과 경쟁 조건(Race Condition)

   - 임계구역(Critical Section) 문제
   - 상호 배제(Mutual Exclusion), 진행, 한정 대기 조건

2. 동기화 도구

   - 뮤텍스(Mutex), 세마포어(Semaphore), 모니터(Monitor)
   - 조건변수(Condition Variable)를 통한 조건 대기/신호

3. 데드락(Deadlock)
   - 데드락 발생 조건(상호 배제, 점유 대기, 비선점, 순환대기)
   - 데드락 예방, 회피(은행원 알고리즘), 탐지 및 회복 기법

---

## Day 5: 파일 시스템

1. 파일 시스템 구조

   - 파일/디렉토리 개념
   - 디렉토리 구조(단일, 2단계, 트리, 비순환 그래프)
   - Inode 구조 및 파일명/인덱스 매핑

2. 파일 접근 방식

   - 순차 접근, 직접 접근, 인덱스 접근

3. 디스크 스케줄링
   - FCFS, SSTF, SCAN, C-SCAN, LOOK 등 디스크 접근 최적화 기법
