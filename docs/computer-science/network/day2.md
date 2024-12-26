# Day2: 전송 계층과 응용 계층 프로토콜

- TCP vs UDP
  - 특징, 연결 설정(3-Way Handshake, 4-Way Handshake)
  - TCP 흐름/혼잡 제어 기법
- HTTP/HTTPS
  - 요청/응답 구조, HTTP 메서드, 상태코드
  - TLS/SSL을 이용한 암호화
- SMTP, FTP, DNS 개념 살펴보기
  - 메일 전송, 파일 전송, 도메인 이름 시스템의 기본 원리

---

## 1. TCP vs UDP

### TCP (Transmission Control Protocol)

- **연결 지향적**: 3-Way Handshake를 통해 송신자와 수신자가 가상 연결을 수립한 뒤 데이터를 전송한다.
- **신뢰성 보장**: 데이터가 손실되거나 순서가 뒤바뀌어도 재전송(Retransmission)과 재정렬(Reordering) 과정을 통해 데이터 무결성을 보장한다.
- **흐름 제어(Flow Control) & 혼잡 제어(Congestion Control)**:
  - 흐름 제어는 송신자가 수신자의 처리 속도에 맞춰 전송 속도를 조절하는 것.
  - 혼잡 제어는 네트워크 혼잡 상황에서 패킷 손실을 줄이고 전체 트래픽을 관리하기 위한 알고리즘(Tahoe, Reno, CUBIC 등).
- **3-Way Handshake**
  1. 클라이언트가 서버에게 SYN 패킷 전송 (연결 요청)
  2. 서버가 SYN+ACK 패킷으로 응답 (요청 수락 + 서버도 클라이언트에게 연결 요청)
  3. 클라이언트가 ACK 패킷 전송 (서로 연결 성공)
- **4-Way Handshake** (연결 해제)
  1. 클라이언트가 서버에게 FIN 전송
  2. 서버가 ACK로 응답
  3. 서버가 FIN 전송
  4. 클라이언트가 ACK로 응답 후 연결 종료

### UDP (User Datagram Protocol)

- **비연결성**: 별도의 연결 과정 없이 즉시 전송한다.
- **단순, 빠른 전송**: 헤더가 간단하고 재전송 메커니즘이 없어 오버헤드가 적다.
- **신뢰성 미보장**: 데이터가 손실되거나 순서가 바뀌어도 프로토콜 차원에서 재전송이나 재정렬을 수행하지 않는다.
- **적용 사례**: 실시간 스트리밍(VoIP, 화상 회의), 온라인 게임처럼 전송 지연보다 빠른 전달이 중요한 경우.

---

## 2. HTTP/HTTPS

### HTTP (HyperText Transfer Protocol)

- **요청/응답 구조**: 클라이언트(주로 브라우저)와 서버 간에 Request와 Response를 주고받는다.
- **HTTP 메서드**:
  - GET: 리소스 조회
  - POST: 리소스 생성(주로 Body에 데이터 전송)
  - PUT: 리소스 전체 교체
  - PATCH: 리소스 일부 수정
  - DELETE: 리소스 삭제 등
- **상태코드**:
  - 2xx (성공)
  - 3xx (리다이렉션)
  - 4xx (클라이언트 오류)
  - 5xx (서버 오류)  
    예) 200 OK, 201 Created, 301 Moved Permanently, 401 Unauthorized, 404 Not Found, 500 Internal Server Error
- **Stateless**: 각 요청은 독립적으로 처리되며, 이전 요청 상태 정보를 자동으로 기억하지 않는다. 쿠키나 세션을 통해 상태를 유지할 수 있다.

### HTTPS (HTTP Secure)

- **TLS/SSL**을 이용해 HTTP 통신을 암호화한다.
- **공개키/대칭키 혼합 방식**: 서버 인증서(공개키)로 대칭키를 안전하게 교환한 뒤, 이후 데이터 전송은 대칭키 암호화로 속도를 높인다.
- **보안 강화**: 데이터 도청, 변조, 위장 공격에 대한 방어 가능.

---

## 3. SMTP, FTP, DNS 개념 살펴보기

### SMTP (Simple Mail Transfer Protocol)

- **메일 전송 프로토콜**: 이메일을 발송할 때 사용하는 표준 프로토콜.
- **포트 번호**: 기본 25번(보안이 강화된 경우 465 or 587).
- **동작 과정**:
  1. 클라이언트(메일 사용자)가 SMTP 서버에 메일 전송을 요청
  2. SMTP 서버가 수신자 주소를 보고 상대방 SMTP 서버로 메일을 라우팅
  3. 수신자 메일 서버에서 메일이 도착해, 최종적으로 POP3, IMAP 등을 통해 수신된다.

### FTP (File Transfer Protocol)

- **파일 전송 프로토콜**: 서버와 클라이언트 간에 파일을 업·다운로드할 수 있도록 설계된 프로토콜.
- **모드**: Active/Passive 모드가 있으며, 데이터 연결을 설정하는 방식이 다르다.
- **포트 번호**: 기본 21번(제어), 20번(데이터).

### DNS (Domain Name System)

- **도메인 네임을 IP 주소로 변환**: 예) `www.example.com` → 93.184.216.34
- **분산 계층 구조**: Root → Top-Level Domain(.com, .org 등) → Authoritative DNS로 구분.
- **UDP/TCP 활용**: 일반적으로 UDP 53번 포트를 통해 빠른 조회를 하며, 트래픽이 큰 응답의 경우 TCP를 사용하기도 한다.
- **캐싱**: DNS 서버나 OS가 최근 조회 결과를 일정 기간(Cache TTL) 동안 보관해, 반복 조회 성능을 높인다.
