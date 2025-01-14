# Day 1: 데이터베이스 기본 개념

- **데이터베이스 정의 및 필요성**
  - 파일 시스템과의 비교
  - 데이터 무결성, 중복 최소화
- **RDBMS vs NoSQL 개요**
  - 관계형 데이터베이스의 특성
  - 다양한 NoSQL 모델(Key-Value, Document, Column, Graph)
- **데이터 모델링의 기초**
  - 개념적/논리적/물리적 모델 설계 과정

---

## 1. 데이터베이스 정의 및 필요성

### 1.1 데이터베이스란?

- **데이터베이스(Database)**: 체계적으로 구성되어 다수의 사용자나 애플리케이션이 공유하고 활용할 수 있는 데이터의 집합
- 일반적으로 DBMS(Database Management System)를 통해 데이터베이스를 관리

### 1.2 파일 시스템과의 비교

1. **파일 시스템(File System)**

   - 운영체제에서 제공하는 기본적인 파일 저장·관리 방식
   - 각 프로그램이 독립적으로 파일을 생성·활용하며, 파일 형식이나 구조가 분산되어 있음
   - 중복 저장이 발생하기 쉽고, 무결성이나 동시성 제어가 어려움

2. **데이터베이스(Database)**
   - 중앙 집중된 시스템(DBMS)에서 데이터를 통합 관리
   - 정해진 스키마(구조)에 따라 데이터를 저장하고, 필요 시 SQL 등으로 쉽게 조회·수정
   - 중복 최소화, 데이터 무결성 유지, 동시성 제어, 보안 정책 등 고급 기능 제공

### 1.3 데이터 무결성, 중복 최소화

- **데이터 무결성(Integrity)**:
  - 데이터가 유효하고 일관성 있게 유지되어야 함
  - 예) 외래키 제약, NULL 제약, UNIQUE 제약 등
- **중복 최소화**:
  - 동일 정보를 중복 저장하는 상황을 줄여, 저장 공간 절약 & 데이터 불일치(불일관성) 문제 방지
  - 데이터 정규화 과정을 통해 중복을 최소화할 수 있음

---

## 2. RDBMS vs NoSQL 개요

### 2.1 관계형 데이터베이스(RDBMS)의 특성

1. **테이블 구조**
   - 행(Row, 튜플)과 열(Column, 속성)으로 구성
   - 스키마(Structure)가 명확히 정의되어 있어, 데이터가 이를 준수해야 함
2. **SQL(Structured Query Language)**
   - 표준화된 쿼리 언어
   - 다양한 연산(SELECT, INSERT, UPDATE, DELETE 등)을 통해 데이터 제어
3. **ACID 특성**
   - Atomicity(원자성), Consistency(일관성), Isolation(고립성), Durability(지속성)
   - 트랜잭션 단위로 데이터의 무결성을 강하게 보장
4. **예시**
   - MySQL, PostgreSQL, Oracle, MS SQL Server 등

### 2.2 다양한 NoSQL 모델

1. **Key-Value 스토어**

   - 간단한 `<Key, Value>` 구조로 데이터 저장
   - 예) Redis, DynamoDB
   - 빠른 읽기·쓰기 성능, 단순 데이터 구조에 유리

2. **Document DB**

   - JSON, BSON 형태로 유연하게 문서를 저장
   - 예) MongoDB, CouchDB
   - 스키마가 유연하며, 문서 단위로 직관적인 모델링 가능

3. **Column Family DB**

   - 열(Column) 기반으로 데이터를 묶어 저장, 대규모 분산에 최적화
   - 예) Cassandra, HBase
   - 특정 컬럼(열)만 집중적으로 조회할 때 성능이 좋음

4. **Graph DB**
   - 노드(Node)와 엣지(Edge)로 데이터를 표현, 연결·관계 분석에 특화
   - 예) Neo4j, JanusGraph
   - SNS 친구 관계, 추천 시스템 등 복잡한 관계 탐색에 강점

---

## 3. 데이터 모델링의 기초

### 3.1 개념적 모델링

- **개념적 모델**:
  - 비즈니스 요구사항을 분석해, 가장 추상화된 수준으로 개체(Entity)와 관계(Relationship)를 정의
  - 엔티티 간 관계(1:1, 1:N, N:M)를 식별하고 주요 속성(Attribute)을 포괄적으로 설정
  - 주로 ERD(Entity Relationship Diagram) 등을 사용

### 3.2 논리적 모델링

- **논리적 모델**:
  - 개념적 모델을 실제 RDBMS 또는 특정 데이터베이스의 구조에 맞게 좀 더 세부화
  - 테이블, 컬럼, 데이터타입, 키(Primary Key, Foreign Key) 등을 설계
  - 정규화(Normalization) 과정을 통해 중복을 최소화, 무결성 유지

### 3.3 물리적 모델링

- **물리적 모델**:
  - 논리적 모델을 실제 DBMS에 적용하기 위한 스키마 생성 단계
  - 인덱스, 파티션, 스토리지 엔진(MyISAM, InnoDB, RocksDB 등) 등 구현 세부사항 결정
  - 성능·보안·백업·복구 등 운영 측면 고려

---

## 정리

1. **데이터베이스의 필요성**
   - 파일 시스템 대비 효율적이고 안전한 데이터 관리
   - 무결성과 중복 최소화를 통해 데이터 품질과 안정성을 향상
2. **RDBMS vs NoSQL**
   - RDBMS는 ACID, 스키마 엄격성, SQL의 강력한 기능을 제공
   - NoSQL은 유연한 스키마, 고성능·수평 확장 등에 유리한 모델을 제시
3. **데이터 모델링 기초**
   - 개념적 → 논리적 → 물리적 모델링 단계를 통해 점진적으로 설계
   - ERD를 통한 개념정의부터 테이블·인덱스·스토리지까지 구체화
