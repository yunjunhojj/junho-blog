# 일주일만에 훑어보는 네트워크

> 네트워크라는 주제는 현대 개발자에게 매우 중요한 주제입니다. 클라우드, 모바일, 웹 서비스 등 다양한 분야에서 네트워크 지식이 필요하기 때문입니다. 대부분이 웹에서 정보를 상호작용하기 때문에 개발자라면 네트워크에 대한 기본적인 이해가 필요합니다.

# 일주일만에 훑어보는 운영체제

## Day 1: 네트워크 기본 개념

- 네트워크의 정의: 컴퓨터 간 데이터 송수신의 기초 이해
- OSI 7계층 모델
  - 계층별 역할과 특징
  - 실제 TCP/IP 모델과의 비교
- TCP/IP 4계층 구조
  - 네트워크 인터페이스, 인터넷, 전송, 애플리케이션 계층
- IP 주소와 서브넷
  - IPv4/IPv6 개념과 주소 체계
  - 서브넷마스크, 게이트웨이, 라우팅 기초

---

## Day 2: 전송 계층과 응용 계층 프로토콜

- TCP vs UDP
  - 특징, 연결 설정(3-Way Handshake, 4-Way Handshake)
  - TCP 흐름/혼잡 제어 기법
- HTTP/HTTPS
  - 요청/응답 구조, HTTP 메서드, 상태코드
  - TLS/SSL을 이용한 암호화
- SMTP, FTP, DNS 개념 살펴보기
  - 메일 전송, 파일 전송, 도메인 이름 시스템의 기본 원리

---

## Day 3: 라우팅과 네트워크 장비

- 라우팅(Routing) 기초
  - 정적 라우팅 vs 동적 라우팅
  - 대표적인 라우팅 프로토콜: RIP, OSPF, BGP
- 네트워크 장비
  - 허브(Hub), 스위치(Switch), 라우터(Router), 게이트웨이(Gateway)
  - L2 스위치 vs L3 스위치
- NAT(Network Address Translation)
  - NAT 동작 방식과 장단점
  - 사설 IP와 공인 IP

---

## Day 4: 네트워크 보안

- 보안 기초
  - 암호화(Encryption) 개념
  - 대칭키, 공개키 암호화 방식
- 웹 보안
  - SSL/TLS 프로토콜
  - HTTPS 동작 원리
  - XSS, CSRF, SQL Injection 등 웹 공격 유형
- 네트워크 보안 기초
  - 방화벽(Firewall), IDS, IPS
  - VPN(Virtual Private Network)
  - DDoS 원리와 방어 전략

---

## Day 5: CDN, 로드 밸런싱, 고가용성

- CDN(Content Delivery Network)
  - 콘텐츠 배포 원리
  - 엣지 서버(Edge Server), 캐싱(Cache) 메커니즘
- 로드 밸런서(Load Balancer)
  - L4/L7 로드 밸런싱 차이점
  - 라운드 로빈, 가중치 기반 분산, 해시 기반 분산
- 고가용성(High Availability) 구성
  - 이중화(Active-Standby, Active-Active)
  - 장애 감지와 Failover 처리

---

## Day 6: 클라우드 네트워킹과 가상화

- 클라우드 네트워크 모델
  - IaaS, PaaS, SaaS 개념과 차이
  - 가상 머신(VM)과 컨테이너(Container)
- 가상 네트워크(Virtual Network)
  - VPC(Virtual Private Cloud) 개념
  - Overlay Network, SDN(Software Defined Network)
- 서버리스(Serverless) 아키텍처 기초
  - 람다(Lambda) 등 이벤트 기반 컴퓨팅
  - 네트워크 레벨에서의 서버리스 운영 방식

---

## Day 7: 종합 정리 및 면접/실무 팁

- 네트워크 트러블슈팅 사례
  - ping, traceroute, netstat, tcpdump 등의 활용
  - 실제 문제 해결 과정 예시
- 면접 대비 정리
  - 자주 나오는 질문 유형과 답변 팁
  - 주요 프로토콜 개념 한 줄 요약
- 실무에서의 응용
  - 시스템 설계 시 네트워크 구조 고려
  - API 서버, 마이크로서비스, 분산 시스템에서의 통신 전략
