# Day4: 동시성(Concurrency)의 개념

현대 운영체제에서는 동시에 여러 프로세스나 스레드가 실행되는 환경이 일반적이다. CPU가 하나라도 시분할 시스템을 통해 여러 작업이 마치 동시에 실행되는 것처럼 보이게 할 수 있으며, 멀티코어 환경에서는 실제로 여러 스레드가 물리적으로 동시에 실행되기도 한다.

이런 동시성 환경에서 여러 스레드가 같은 메모리 영역이나 공유 자원에 동시 접근하면 예측 불가능한 결과가 발생할 수 있다. 이런 문제가 바로 **경쟁 조건(Race Condition)** 이다.

## 경쟁 조건(Race Condition)

두 개 이상의 스레드나 프로세스가 공유 자원에 접근할 때, 접근 순서나 시점에 따라 결과가 달라지는 상황을 경쟁 조건이라 한다. 예를 들어, 은행 계좌 잔고를 갱신하는 두 개의 스레드가 동시에 작동할 때, 한 스레드의 업데이트가 다른 스레드의 업데이트와 충돌하면 잘못된 최종 잔고가 기록될 수 있다.

경쟁 조건을 제거하기 위해서는 접근 순서를 적절히 제어하는 **동기화(Synchronization)** 메커니즘이 필요하다.

## 임계구역(Critical Section) 문제

여러 스레드가 동시에 접근하면 안 되는 코드 영역을 임계구역이라 한다. 임계구역 문제의 해결책은 다음 세 가지 조건을 만족하는 프로토콜을 디자인하는 것이다.

1. **상호 배제(Mutual Exclusion)**: 한 번에 하나의 스레드만 임계구역에 들어갈 수 있어야 한다.
2. **진행(Progress)**: 임계구역에 들어가려는 스레드가 없으면, 임계구역 진입을 무한정 지연하지 않아야 한다.
3. **한정 대기(Bounded Waiting)**: 특정 스레드가 임계구역 진입을 너무 오래 대기하지 않도록 보장해야 한다.

이러한 조건을 만족하기 위해 다양한 동기화 도구가 개발되었다.

## 2. 동기화 기법

## 락(Lock)과 뮤텍스(Mutex)

**뮤텍스(Mutex)** 는 상호 배제를 위한 가장 기본적인 도구이다. 뮤텍스는 오직 하나의 스레드만 소유할 수 있는 잠금(락)을 제공하고, 다른 스레드는 이미 누군가가 뮤텍스를 획득한 경우 대기하게 된다. 뮤텍스를 사용하면 동시에 공유 자원에 접근하는 스레드를 하나로 제한할 수 있다.

- 획득(Acquire): 잠겨있지 않은 뮤텍스를 얻으면 해당 스레드는 임계구역에 들어갈 수 있다.
- 해제(Release): 임계구역을 다 쓴 후 뮤텍스를 해제하면 다른 대기 중인 스레드가 접근할 수 있다.

## 세마포어(Semaphore)

**세마포어(Semaphore)** 는 정수형 카운터를 통해 접근 가능한 자원의 개수를 제어하는 동기화 도구다. 뮤텍스는 이진(0 또는 1) 형태로 동작하는 세마포어로 볼 수 있다. 세마포어는 프로세스나 스레드가 P(또는 wait) 연산을 통해 자원 획득을 시도하고, V(또는 signal) 연산을 통해 자원을 반환한다.

- **카운팅 세마포어**: N개의 자원이 있을 때, 0 이상 N 이하의 값을 갖는다.
- **이진 세마포어(뮤텍스)**: 값이 0 또는 1만 가능하며, 뮤텍스 용도로 사용.

## 모니터(Monitor)

**모니터(Monitor)** 는 동기화 문제를 추상화한 고급 언어 차원의 동기화 메커니즘이다. 모니터 내에서만 접근 가능한 공유 자원과 함수를 정의하고, 진입 시 자동으로 상호 배제가 보장되도록 언어 차원에서 제공한다. 모니터는 조건변수(Condition Variable)를 통해 스레드 간 신호 전달도 지원한다.

## 조건변수(Condition Variable)

모니터 내부에서 사용되는 조건변수는 특정 조건을 만족할 때까지 스레드를 대기시켰다가, 조건을 만족하면 대기 중인 스레드에게 신호를 보내 재개하는 기법을 제공한다. `wait()` 연산으로 조건이 충족될 때까지 스레드를 재우고, `signal()` 연산으로 조건을 만족시켜 대기 스레드를 깨운다.

## 3. 데드락(Deadlock)

## 데드락의 정의

**데드락(Deadlock)**은 두 개 이상의 프로세스나 스레드가 서로가 가진 자원을 기다리며 무한정 대기하는 상황이다. 결과적으로 시스템은 교착 상태에 빠져 어떤 것도 전진하지 못하게 된다.

## 데드락 발생 조건 (Coffman’s Condition)

데드락이 발생하기 위해서는 다음 네 가지 조건이 동시에 만족해야 한다.

1. **상호 배제(Mutual Exclusion)**: 자원은 한 번에 한 프로세스만 사용할 수 있어야 한다.
2. **점유 대기(Hold and Wait)**: 최소 한 개 이상의 자원을 점유한 상태에서 다른 자원을 추가로 기다린다.
3. **비선점(Non-Preemption)**: 자원을 점유한 프로세스가 그 자원을 강제로 빼앗기지 않는다.
4. **순환 대기(Circular Wait)**: 프로세스들이 자원을 서로 순환 형태로 기다린다. 예를 들어 A는 B가 가진 자원을 기다리고, B는 C가 가진 자원을 기다리며, C는 다시 A가 가진 자원을 기다리는 순환 고리가 형성된다.

이 조건들 중 하나라도 깨뜨리면 데드락은 발생하지 않는다.

## 데드락 처리 기법

데드락을 처리하기 위한 전통적인 방법은 다음과 같다.

1. **데드락 예방(Prevention)**: 데드락 발생 조건 중 하나를 아예 사전에 없애버린다. 예를 들어, 자원을 요청할 때마다 한 번에 모두 요구하게 하거나, 항상 특정 순서에 따라 자원을 획득하도록 하여 순환대기를 막는다.
2. **데드락 회피(Avoidance)**: 프로세스들이 자원을 요청할 때, 시스템은 데드락에 빠지지 않는 안전 상태(Safe State)인지 검증한 뒤 자원을 할당한다. Banker's Algorithm과 같은 알고리즘을 통해 데드락을 회피할 수 있다.

3. **데드락 탐지(Detection)** 와 회복(Recovery): 데드락을 허용한 뒤, 주기적으로 데드락이 발생했는지 검사하고, 데드락 상태를 확인하면 프로세스 중 일부를 중단하거나 자원을 강제 회수하여 회복한다.

4. **무시(Ignore)**: 일부 시스템(예: 데스크톱 OS)은 데드락이 매우 드물게 발생한다고 가정하고, 발생 시 사용자가 강제 종료하는 식으로 무시하기도 한다.

## 4. 요약

- 동시성은 현대 운영체제에서 필수적이지만, 경쟁 조건을 야기한다.
- 임계구역 문제 해결을 위해 뮤텍스, 세마포어, 모니터 등 다양한 동기화 도구를 활용한다.
- 데드락은 자원 대기 상태가 순환 구조를 이루며 발생하는 문제로, 예방, 회피, 탐지 및 회복 전략을 통해 다룰 수 있다.
