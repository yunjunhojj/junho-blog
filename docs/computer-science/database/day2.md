# Day 2: SQL 기초

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

## 1. DDL (Data Definition Language)

DDL은 데이터베이스 스키마를 정의·변경·삭제하기 위한 언어다. 스키마 구조(테이블, 인덱스, 뷰, 시퀀스 등)의 생성, 수정, 삭제에 관여한다.

1. **CREATE**
   - 테이블이나 데이터베이스 개체(스키마, 인덱스, 뷰 등)를 생성
   - 예:
     ```sql
     CREATE TABLE users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(50) NOT NULL,
       created_at DATETIME
     );
     ```
2. **DROP**
   - 기존에 생성된 스키마(테이블, 인덱스, 뷰 등)를 완전히 제거
   - 예:
     ```sql
     DROP TABLE users;
     ```
3. **ALTER**
   - 이미 존재하는 스키마 구조를 수정(컬럼 추가·삭제, 데이터타입 변경 등)
   - 예:
     ```sql
     ALTER TABLE users
     ADD COLUMN email VARCHAR(100) AFTER username;
     ```
     ```sql
     ALTER TABLE users
     MODIFY COLUMN username VARCHAR(100);
     ```

> **주의**: DDL 명령은 기본적으로 **오토 커밋**(Auto Commit) 된다. 즉, 실행 즉시 변경 사항이 확정되어 롤백이 불가능한 경우가 많다.

---

## 2. DML (Data Manipulation Language)

DML은 실제 테이블에 저장된 데이터를 조작(추가, 수정, 삭제)하는 데 사용한다.

1. **INSERT**
   - 새로운 레코드(행)을 테이블에 추가
   - 예:
     ```sql
     INSERT INTO users (username, email, created_at)
     VALUES ('alice', 'alice@example.com', NOW());
     ```
2. **UPDATE**
   - 기존 레코드를 수정
   - 예:
     ```sql
     UPDATE users
     SET email = 'alice_new@example.com'
     WHERE id = 1;
     ```
3. **DELETE**
   - 테이블에서 특정 레코드를 삭제
   - 예:
     ```sql
     DELETE FROM users
     WHERE id = 1;
     ```

> DML을 통해 변경된 내용은 트랜잭션(TCL) 내에서 **커밋(Commit)** 되기 전까지 실제 반영이 확정되지 않는다.

---

## 3. DQL, DCL, TCL

### 3.1 DQL (Data Query Language)

일부 분류 체계에서는 **SELECT** 구문을 **DQL**로 별도 구분하기도 한다.

- **SELECT**: 테이블 데이터를 조회한다.
  - 예:
    ```sql
    SELECT username, email
    FROM users
    WHERE created_at >= '2024-01-01 00:00:00'
    ORDER BY created_at DESC;
    ```
  - **JOIN**: 여러 테이블을 연결해 데이터를 조회
    ```sql
    SELECT u.username, p.post_title
    FROM users AS u
    JOIN posts AS p ON u.id = p.user_id
    WHERE u.username = 'alice';
    ```
  - 다양한 집계 함수(AVG, SUM, COUNT 등)와 `GROUP BY`, `HAVING` 구문 등을 통해 통계 조회 가능

### 3.2 DCL (Data Control Language)

데이터베이스 **권한(Privilege)**과 관련된 제어를 담당한다.

1. **GRANT**
   - 특정 사용자/역할(Role)에게 DB 객체 접근권한을 부여
   - 예:
     ```sql
     GRANT SELECT, INSERT ON users TO 'bob'@'%';
     ```
2. **REVOKE**
   - 기존에 부여된 권한을 회수
   - 예:
     ```sql
     REVOKE INSERT ON users FROM 'bob'@'%';
     ```

### 3.3 TCL (Transaction Control Language)

트랜잭션(논리적 작업 단위) 관련 동작을 제어한다.

1. **COMMIT**
   - 현재 트랜잭션에서 이루어진 DML 작업을 확정(영구 반영)
   - 예:
     ```sql
     COMMIT;
     ```
2. **ROLLBACK**
   - 현재 트랜잭션 범위 내의 변경 사항을 취소
   - 예:
     ```sql
     ROLLBACK;
     ```
3. **SAVEPOINT**
   - 트랜잭션 내 특정 지점을 표시해두고, 그 지점 이후의 작업만 롤백할 수 있게 함
   - 예:
     ```sql
     SAVEPOINT sp1;
     -- 뭔가 작업...
     ROLLBACK TO sp1;
     ```

> **트랜잭션**: 한 번에 여러 DML이 실행될 때, 모두 성공 또는 모두 실패를 보장해야 하는 경우 사용. 예를 들어 이체 작업(계좌 A 출금 + 계좌 B 입금)이 원자성(Atomicity) 있게 수행되어야 한다.

---

## 4. 기본 SQL 예제와 실습 아이디어

### 4.1 샘플 테이블 생성

```sql
CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

```

```sql
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

```

### 4.2 데이터 삽입

```sql
INSERT INTO products (product_name, price)
VALUES ('Apple', 1000),
       ('Banana', 500),
       ('Cherry', 1500);
```

```sql
INSERT INTO orders (product_id, quantity)
VALUES (1, 3),
       (2, 2),
       (3, 1);
```

### 4.3 데이터 조회

```sql
SELECT p.product_name, p.price, o.quantity, o.order_date
FROM products AS p
JOIN orders AS o ON p.product_id = o.product_id;
```

### 4.4 데이터 수정

```sql
UPDATE products
SET price = 1200
WHERE product_id = 1;
```

### 4.5 데이터 삭제

```sql
DELETE FROM products
WHERE product_id = 3;
```

### 4.6 트랜잭션 활용

```sql
START TRANSACTION;

UPDATE products
SET price = 1100
WHERE product_id = 2;

INSERT INTO orders (product_id, quantity)
VALUES (2, 1);

COMMIT;
```

> **참고**: SQL은 데이터베이스 종류에 따라 문법이나 지원하는 기능이 다를 수 있다. MySQL, PostgreSQL, Oracle, SQL Server 등 각 DBMS에 맞게 문법을 사용해야 한다.

---

## 용어 정리

    1.	DDL: 테이블 및 스키마 구조 정의(생성/수정/삭제). 보통 오토 커밋
    2.	DML: 데이터에 대한 CRUD(INSERT/UPDATE/DELETE 등), 트랜잭션 내부에서 실행
    3.	DQL: SELECT를 통해 원하는 데이터를 조회, JOIN/집계함수/GROUP BY 등 활용
    4.	DCL: 사용자/역할에 권한을 부여(GRANT), 회수(REVOKE)
    5.	TCL: 트랜잭션 제어(COMMIT, ROLLBACK, SAVEPOINT)로 원자성 보장
