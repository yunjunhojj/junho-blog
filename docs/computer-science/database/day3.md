# Day 3: 정규화와 DB 설계

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

데이터베이스를 효율적으로 운영하기 위해서는 **중복 최소화**, **무결성 유지**, **데이터 일관성**을 보장할 수 있도록 테이블을 설계해야 한다. 이를 위해 **정규화** 과정을 거치고, **ERD**를 통해 데이터 모델을 체계적으로 표현한다. 또한 실무 환경에 맞춰 예시를 살펴봄으로써 각 단계를 구체적으로 이해할 수 있다.

## 1. 정규화(Normalization)

정규화는 테이블 설계를 체계적으로 다듬어 **데이터 중복(중복 저장)**과 **이상 현상(Anomalies)**을 최소화하기 위한 일련의 규칙이다. 대표적으로 아래 단계를 거쳐 설계를 개선한다.

### 1.1 1NF (제1정규형)

- **원자성(Atomicity)**: 컬럼(속성) 값이 더 이상 분해할 수 없는 원자 값(Scalar)만 가져야 한다.
  - 예) `주소` 컬럼에 시·도·도로명·우편번호 등 여러 정보를 합쳐 저장하면 안 된다.
- **반복 그룹(Repeated Group) 제거**: 여러 값이 한 컬럼에 묶여 있지 않도록 설계.

### 1.2 2NF (제2정규형)

- **부분 함수 종속(Partial Dependency) 제거**:
  - 복합 키(두 개 이상의 컬럼으로 구성된 PK)가 존재할 경우, PK의 일부 컬럼에만 종속되는 속성을 분리한다.
  - 1NF를 만족한 테이블 중, 기본 키 전체가 아닌 일부만으로 함수 종속이 발생하는 경우를 제거.

### 1.3 3NF (제3정규형)

- **이행적 함수 종속(Transitive Dependency) 제거**:
  - 기본 키가 아닌 다른 컬럼이 또 다른 비키(Non-key) 컬럼을 결정(종속)해서는 안 된다.
  - 예) `회원(회원ID, 이름, 부서ID, 부서명)` 테이블에서 `부서명`은 `회원ID`가 아니라 `부서ID`에 종속. → 부서 정보를 별도 테이블로 분리.

### 1.4 BCNF (Boyce-Codd Normal Form)

- **결정자(Determinant)가 후보키(Candidate Key)가 아닌 함수 종속 제거**:
  - 3NF보다 조금 더 엄격한 조건
  - 모든 결정자가 후보 키가 되도록 설계하는 것이 이상적

### 1.5 이상현상(Anomalies) 방지

- **삽입 이상 (Insertion Anomaly)**
  - 일부 컬럼만 먼저 입력이 불가능하여, 불필요한 데이터를 같이 입력해야 하는 문제
- **갱신 이상 (Update Anomaly)**
  - 한 정보를 여러 곳에 중복 저장할 경우, 일부만 업데이트 시 데이터 불일치 발생
- **삭제 이상 (Deletion Anomaly)**
  - 일부 데이터만 삭제하려고 했는데, 함께 저장되어 있는 다른 정보까지 소실

정규화를 통해 이러한 이상현상을 예방함으로써 데이터 무결성과 일관성을 유지할 수 있다.

---

## 2. ERD(Entity Relationship Diagram) 작성

### 2.1 엔티티(Entity), 관계(Relationship), 속성(Attribute)

- **엔티티(Entity)**: 데이터베이스에서 관리가 필요한 실체(테이블 대상). 예) _회원_, _주문_, _상품_
- **속성(Attribute)**: 엔티티가 가지는 특성(컬럼). 예) _회원_ 엔티티의 _회원ID_, _이름_, _이메일_
- **관계(Relationship)**: 엔티티 간 연관성을 나타냄(1:1, 1:N, N:M 등)

### 2.2 식별자(Primary Key), 외래키(Foreign Key)

- **기본 키(Primary Key)**: 테이블에서 레코드를 유일하게 식별하는 컬럼(또는 컬럼 조합)
- **외래 키(Foreign Key)**: 다른 테이블의 기본 키를 참조하여, 테이블 간 관계를 연결
  - 예) _주문_ 테이블의 `회원ID`는 _회원_ 테이블의 `회원ID`를 참조

#### ERD 예시

[회원] ––––< [주문] >–––– [상품]
^ (N:M 관계를 중간 테이블로 표현할 수도 있음)

- 회원(회원ID PK, 이름, 이메일, 가입일 등), 주문(주문ID PK, 회원ID FK, 주문일시), 상품(상품ID PK, 상품명, 가격 등)

---

## 3. 실무 설계 예시

### 3.1 고객, 주문, 상품 테이블 설계

1. **고객(Customer) 테이블**

```sql
CREATE TABLE Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

2. 상품(Product) 테이블

```sql
CREATE TABLE Product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

3. 주문(Order) 테이블

```sql
CREATE TABLE `Order` (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
```

4. 주문 상세(OrderItem) 테이블
   - 다대다(N:M) 구조를 중간 테이블로 풀어내는 전형적인 사례 (주문 1건에 여러 상품, 상품도 여러 주문)

```sql
CREATE TABLE OrderItem (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES `Order`(order_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
```

3.2 정규화 단계별 적용 사례

- 1NF: - 모든 컬럼은 원자값으로 구성.
  예) address를 city, street, zipcode 등으로 분할
- 2NF: - 복합키로 구성된 테이블에서 부분 종속 제거.
  예) OrderItem에서 (order_id, product_id)가 PK이고, 다른 속성 quantity는 전체 PK에 종속
- 3NF: - 주문에 customer_email을 직접 두면, 고객 테이블의 email과 중복되어 변경 시 혼동. → customer_id 만 참조해서 고객 정보는 고객 테이블에서 관리 - (추가)BCNF: - 모든 결정자가 후보 키인 상태로 설계.
  예) customer_id가 결정자일 때, 해당 후보 키가 아닌 어떤 속성이 다른 컬럼을 결정해서는 안 됨
