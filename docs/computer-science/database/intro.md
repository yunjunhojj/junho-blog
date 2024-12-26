# 일주일만에 훑어보는 데이터베이스

> 데이터베이스는 데이터를 효율적으로 저장하고 관리하는 기술이다. 데이터베이스는 데이터를 구조화하여 저장하고, 검색, 갱신, 삭제하는 기능을 제공한다. 적절한 데이터베이스 설계와 관리는 데이터 중복을 방지하고 데이터 무결성을 유지하는데 중요한 역할을 한다.

# 일주일만에 훑어보는 데이터베이스

## Day 1: 데이터베이스 기본 개념

- **데이터베이스 정의 및 필요성**
  - 파일 시스템과의 비교
  - 데이터 무결성, 중복 최소화
- **RDBMS vs NoSQL 개요**
  - 관계형 데이터베이스의 특성
  - 다양한 NoSQL 모델(Key-Value, Document, Column, Graph)
- **데이터 모델링의 기초**
  - 개념적/논리적/물리적 모델 설계 과정

---

## Day 2: SQL 기초

- **DDL (Data Definition Language)**
  - CREATE, DROP, ALTER
- **DML (Data Manipulation Language)**
  - SELECT, INSERT, UPDATE, DELETE
- **DQL, DCL, TCL**
  - SELECT문의 세부 옵션과 JOIN
  - 권한 제어(GRANT, REVOKE)
  - 트랜잭션 제어(COMMIT, ROLLBACK, SAVEPOINT)
- **기본 SQL 예제와 실습 아이디어**

---

## Day 3: 정규화와 DB 설계

- **정규화(Normalization)**
  - 1NF, 2NF, 3NF, BCNF
  - 이상현상(Anomalies) 방지
- **ERD(Entity Relationship Diagram) 작성**
  - 엔티티(Entity), 관계(Relationship), 속성(Attribute)
  - 식별자(Primary Key), 외래키(Foreign Key)
- **실무 설계 예시**
  - 고객, 주문, 상품 테이블 설계
  - 정규화 단계별 적용 사례

---

## Day 4: 인덱스와 쿼리 최적화

- **인덱스(Index) 기본 개념**
  - B-Tree 인덱스, 해시 인덱스
  - 클러스터드/논클러스터드 인덱스 차이
- **쿼리 실행 계획(Execution Plan) 분석**
  - COST 기반 최적화 개념
  - EXPLAIN 사용법(MySQL 등)
- **쿼리 튜닝 기법**
  - 적절한 인덱스 설계
  - JOIN 방식(중첩 루프, 해시, 머지)
  - 뷰(View), 서브쿼리, 파티셔닝(Partitioning)

---

## Day 5: 트랜잭션 & 동시성 제어

- **ACID 특성**
  - Atomicity, Consistency, Isolation, Durability
- **동시성 제어 메커니즘**
  - Locking (Shared, Exclusive), Lock Escalation
  - MVCC(Multi-Version Concurrency Control)
- **트랜잭션 격리 수준**
  - READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE
- **데드락(Deadlock) 및 해결 방안**
  - 교착 상태 조건 & 회피/탐지/복구 기법

---

## Day 6: 확장성과 분산 데이터베이스

- **수직적 확장 vs 수평적 확장**
  - Scale-Up과 Scale-Out 개념
- **샤딩(Sharding) & 레플리케이션(Replication)**
  - 데이터 파티셔닝 전략
  - 마스터-슬레이브 복제, 멀티 마스터
- **NoSQL 상세**
  - Key-Value Stores (Redis, DynamoDB)
  - Document DB (MongoDB), Column Store (Cassandra)
- **분산 트랜잭션 & CAP 이론**
  - 일관성(Consistency), 가용성(Availability), 파티션 내성(Partition Tolerance)

---

## Day 7: 면접 대비 & 실무 활용 팁

- **면접 대비 핵심 키워드**
  - SQL 최적화, 인덱스 설계, 정규화/반정규화
  - 트랜잭션 격리와 동시성 문제
- **DB 트러블슈팅 시나리오**
  - 쿼리 성능 저하 분석
  - 락 경합 및 데드락 사례
- **실무 응용 전략**
  - 대규모 트래픽 환경에서 DB 설계 시 고려 사항
  - 마이크로서비스 아키텍처(DB 분산, 데이터 동기화)
  - 모니터링 툴 & 로깅(메트릭 수집, 알림 시스템)
