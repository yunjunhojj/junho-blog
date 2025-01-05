# SAA 자격증으로 학습하는 AWS 클라우드

## 계획

- 강의 : [Udemy SAA 한글자막](https://www.udemy.com/course/best-aws-certified-solutions-architect-associate/learn/lecture/29388682?start=0#content)

## SAA 시험 소개

- 시험 시간 : 130분
- 문제 수 : 65문제
- 합격 기준 : 72% 이상
- 시험 비용 : 150달러

## SAA 시험 범위 (도메인)

- 도메인 1: 보안 아키텍처 설계 (30%)
- 도메인 2: 복원력을 갖춘 아키텍처 설계 (26%)
- 도메인 3: 고성능 아키텍처 설계 (24%)
- 도메인 4: 비용 최적화 아키텍처 설계 (20%)

## 회원가입

- [AWS 계정 생성](https://signin.aws.amazon.com/signup?request_type=register)
- 신용카드 등록 > 1달러 결제 (신용카드 인증용) > 자동 취소 (1달러 환불)
- support plan 선택 > basic plan 선택

## AWS 시작하기

### AWS Region : 지역 선택 > 각 이름을 갖고 있으며, 글로벌 서비스를 제공하는 지역

**Region 선택 시 고려할 사항**

- 법률 : 데이터 보호법, 데이터 이전법 등 지역 법률에 따라 선택
- 성능 : 사용자와 가까운 지역 선택 (지연 시간 최소화)
- 서비스 : 지역마다 제공하는 서비스가 다를 수 있음 (예를 들어, 최신 서비스가 미국 서부에 먼저 제공될 수 있음)
- 비용 : 지역마다 가격이 다를 수 있음

**availability zone : 데이터 센터의 물리적인 위 치(하나의 region에 여러 availability zone이 존재)**

- 독립된 전원, 네트워크, 물리적인 구조를 가지고 있음 > 서로 상호 독립적
- 하나의 availability zone이 다운되더라도 다른 availability zone으로 서비스를 이전할 수 있음
- 서로 다른 availability zone으로 데이터를 복제하여 안전성을 높일 수 있음

**Edge Location : CloudFront의 캐시 서버 위치**

- CloudFront : 콘텐츠 전송 네트워크 서비스 (CDN 서비스)
- Edge Location : 사용자에게 가장 가까운 위치에 캐시 서버를 두어 콘텐츠를 빠르게 전송
- CloudFront를 사용하면 전 세계 사용자에게 빠르게 콘텐츠를 전송할 수 있음

## IAM (Identity and Access Management) 및 AWS CLI

IAM은 글로벌 서비스이며, 모든 region에서 사용 가능

- Root 계정 : AWS 계정 생성 시 생성되는 계정 (모든 권한을 가지고 있음)
- IAM : AWS Identity and Access Management (사용자, 그룹, 역할을 생성하여 권한을 관리)
- MFA : Multi-Factor Authentication (2단계 인증)
- AWS CLI : AWS Command Line Interface (터미널에서 AWS 서비스를 사용할 수 있음)

**IAM: Permission**

- IAM 정책 : JSON 형식으로 작성되며, 특정 리소스에 대한 특정 작업을 허용 또는 거부

```json
{
  "Version": "2012-10-17",
  "id": "Policy1234567890123", // optional
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::mybucket/*"
    }
  ] // 여러 개의 정책을 작성할 수 있음, required
}
```

- Effect : Allow 또는 Deny
- Action : 허용 또는 거부할 작업
- Resource : 허용 또는 거부할 리소스 (optional)

AWS에서는 최소 권한 원칙을 따라, 필요한 권한만 부여하는 것이 좋음

### todo : IAM 실습

- IAM 사용자 생성
- IAM 그룹 생성
- IAM 정책 생성
- 사용자에 그룹 및 정책 부여
- MFA 설정
- AWS CLI 설치 및 설정

- account alias : 계정에 대한 사용자 지정 이름 (대시보드 우측 상단에 표시됨)

> account alias를 설정하면, 로그인 URL이 `https://account_alias.signin.aws.amazon.com/console`로 변경됨 (기본값은 숫자로 된 계정 ID)

**IAM Polices inheritance: 권한 상속**

- 사용자에게 직접 정책을 부여할 수도 있고, 그룹에 정책을 부여하고 사용자를 그룹에 추가할 수도 있음
- 사용자에게 직접 정책을 부여하면, 사용자에게만 적용되고 그룹에 정책을 부여하면 그룹에 속한 모든 사용자에게 적용됨

**IAM - Password Policy**

- 비밀번호 정책을 설정하여, 사용자가 안전한 비밀번호를 사용하도록 유도할 수 있음
- 비밀번호 정책을 설정하면, 비밀번호 길이, 대문자, 특수문자 등을 요구할 수 있음

**IAM - MFA (Multi-Factor Authentication)**

- 2단계 인증을 사용하여 계정 보안을 강화할 수 있음
- MFA를 사용하면, 사용자는 비밀번호와 함께 MFA 코드를 입력하여 로그인할 수 있음

MFA device : MFA 코드를 생성하는 디바이스 (가상 MFA 디바이스 또는 하드웨어 MFA 디바이스)

- 가상 MFA 디바이스 : Google Authenticator, Authy 등의 앱을 사용하여 MFA 코드를 생성
- 하드웨어 MFA 디바이스 : 물리적인 MFA 디바이스를 사용하여 MFA 코드를 생성 (예: YubiKey)

**MFA 실습**

- MFA 활성화
- MFA 디바이스 등록
- MFA 코드 입력
- MFA 비활성화 및 MFA 디바이스 삭제

**AWS CLI (Command Line Interface)와 access key 그리고 sdk**

- CLI란: Command Line Interface (터미널에서 명령어를 사용하여 서비스를 제어) - AWS CLI는 다운로드 필요
- AWS CLI를 사용하면, 터미널에서 AWS 서비스를 사용할 수 있음
- AWS CLI를 사용하려면, access key를 생성하여 설정해야 함

- SDK란: Software Development Kit (프로그래밍 언어로 AWS 서비스를 사용할 수 있도록 지원하는 라이브러리)
- AWS SDK를 사용하면, 프로그래밍 언어로 AWS 서비스를 사용할 수 있음 (예: Python, Java, JavaScript 등)

**AWS CLI 실습**

- AWS CLI 설치
- access key 생성
- AWS CLI 설정 -> aws configure -> access key 입력 -> region 입력 -> output format 입력
- user 확인 -> aws iam list-users
- AWS CLI 명령어 사용

**AWS cloud shell**

- AWS 콘솔에서 터미널을 사용할 수 있는 서비스
- AWS CLI를 설치하지 않고도 AWS 서비스를 사용할 수 있음
- 구성이 가능하며, 사용자 지정 명령어를 추가할 수 있음
- 파일 업로드 및 다운로드 가능
- 우측 상단의 cloud shell 아이콘을 클릭하여 사용

**IAM - Roles**

- IAM 역할 : AWS 서비스 또는 다른 AWS 계정에 권한을 부여하는 방법
- 역할을 사용하면, 사용자가 다른 AWS 서비스 또는 다른 AWS 계정에 접근할 수 있음
- 역할을 사용하면, access key를 사용하지 않고도 다른 AWS 서비스에 접근할 수 있음

**IAM - Roles 실습**

- 역할 생성
- 역할에 정책 부여
- 역할을 사용하여 다른 AWS 서비스에 접근

**IAM - Security Tools**

- IAM Credential Report : IAM 사용자의 자격 증명 보고서를 생성
- IAM Access Advisor : 사용자의 권한을 분석하여 사용하지 않는 권한을 식별

**IAM - best practices**

- 최소 권한 원칙 : 필요한 권한만 부여
- one pyschical user : 하나의 물리적인 사용자에게 하나의 IAM 사용자를 부여
- IAM password policy : 비밀번호 정책을 설정하여 안전한 비밀번호를 사용하도록 유도
- MFA : 2단계 인증을 사용하여 계정 보안을 강화
- IAM roles : 역할을 사용하여 다른 AWS 서비스 또는 다른 AWS 계정에 접근
- root account : root 계정을 사용하지 않고, IAM 사용자를 생성하여 사용

## EC2 (Elastic Compute Cloud)

**예산 설정**

- AWS 비용을 관리하기 위해 예산을 설정할 수 있음
- 예산을 설정하면, 예산을 초과할 경우 알림을 받을 수 있음
- 예산을 초과할 경우, 서비스가 중단되지 않도록 조치를 취할 수 있음

**EC2 (Elastic Compute Cloud) - infrastructure as a service**

- EC2는 가상 서버를 제공하는 서비스
- EC2 인스턴스를 사용하여 서버를 생성하고, 사용자가 원하는 운영 체제를 설치할 수 있음
- EC2 인스턴스를 사용하여 웹 서버, 데이터베이스 서버, 애플리케이션 서버 등을 생성할 수 있음

**EC2 - instance types**

- EBS: Elastic Block Store (EC2 인스턴스에 연결하여 사용하는 스토리지)
- ELB: Elastic Load Balancer (트래픽을 분산하여 EC2 인스턴스에 전달)
- ASG: Auto Scaling Group (트래픽에 따라 EC2 인스턴스를 자동으로 조정)
- EC2: Renting virtual machines

sizing & configuration options

- instance type : 인스턴스 유형 (예: t2.micro, t2.small, m5.large 등)
- AMI : Amazon Machine Image (운영 체제 및 소프트웨어가 설치된 이미지)
- storage : 스토리지 유형 및 크기 (예: EBS, SSD, HDD 등)
- security group : 보안 그룹 (인바운드 및 아웃바운드 트래픽을 제어)
- key pair : 키페어 (인스턴스에 접속하기 위한 키페어)

부트스트랩 스크립트 : 인스턴스가 시작될 때 실행되는 스크립트

instance types의 이름 규칙과 예시 사용 케이스

- t2 : burstable performance 인스턴스 (ex. 웹 서버)
- m5 : general purpose 인스턴스(ex. 애플리케이션 서버)
- c5 : compute optimized 인스턴스(ex. 배치 처리, 머신러닝)
- r5 : memory optimized 인스턴스(ex. 데이터베이스 서버)
- p3 : GPU 인스턴스(ex. 머신러닝, 딥러닝)
- i3 : high I/O 인스턴스(ex. NoSQL 데이터베이스)
- d2 : dense storage 인스턴스(ex. 데이터 웨어하우스)

**Security Group**

- 보안 그룹은 인바운드 및 아웃바운드 트래픽을 제어하는 방화벽 역할을 함
- 보안 그룹은 인스턴스에 연결되며, 여러 인스턴스에 동일한 보안 그룹을 적용할 수 있음
- 보안 그룹은 stateful이며, 인바운드 규칙과 아웃바운드 규칙을 설정할 수 있음

인바운드 규칙 : 트래픽이 인스턴스로 들어오는 규칙
아웃바운드 규칙 : 트래픽이 인스턴스에서 나가는 규칙

**Classic Port to Know**

- 22 : SSH (Secure Shell) - 원격 접속
- 21 : FTP (File Transfer Protocol) - 파일 전송
- 22 : SFTP (Secure File Transfer Protocol) - 파일 전송
- 80 : HTTP (HyperText Transfer Protocol) - 웹 서버
- 443 : HTTPS (HyperText Transfer Protocol Secure) - 보안 웹 서버
- 3389 : RDP (Remote Desktop Protocol) - 원격 데스크톱

**SSH (Secure Shell)**

- SSH는 원격 접속을 위한 프로토콜
- SSH를 사용하면, 원격 서버에 접속하여 명령어를 실행할 수 있음
- SSH는 22번 포트를 사용하며, 보안을 위해 키페어를 사용함

**EC2 - spot instances**

- spot instances는 저렴한 가격에 EC2 인스턴스를 사용할 수 있는 방법
- spot instances는 AWS의 미사용 자원을 사용하여 저렴한 가격에 인스턴스를 사용할 수 있음
- spot instances는 가격이 변동하며, 시간당 가격이 변동할 수 있음
- spot instances는 최대 가격을 설정하여, 설정한 가격 이하에서만 인스턴스를 사용할 수 있음
- 단점 : 언제든지 인스턴스가 종료될 수 있음

- spot fleet는 여러 spot instances를 한 번에 관리할 수 있는 방법
- spot fleet를 사용하면, 여러 spot instances를 한 번에 시작하고, 관리할 수 있음

**private vs public IP vs elastic IP**

- private IP : 인스턴스 내부에서 사용하는 IP 주소
- public IP : 인터넷에서 사용하는 IP 주소
- elastic IP : 고정된 IP 주소 (인스턴스를 중지하고 다시 시작해도 IP 주소가 유지됨)

**EC2 - placement groups**

- placement groups는 EC2 인스턴스를 물리적으로 가깝게 배치하는 방법
- placement groups를 사용하면, 인스턴스 간 네트워크 지연 시간을 최소화할 수 있음

- cluster : 같은 availability zone 내에서 인스턴스를 물리적으로 가깝게 배치 > HPC (High Performance Computing) 애플리케이션에 적합
- partition : 인스턴스를 논리적인 파티션으로 분산 > 대규모 분산 및 복제 워크로드에 적합 > 여러 파티션을 사용하여 장애를 줄일 수 있음
- spread : 인스턴스를 다른 하드웨어에 분산 배치 > 상호 연관된 장애를 줄이기 위해 사용 > 가용성에 중점을 둔 애플리케이션에 적합

**EC2 - ENI (Elastic Network Interface)**

- ENI는 EC2 인스턴스에 연결되는 가상 네트워크 인터페이스
- ENI를 사용하면, 인스턴스에 여러 개의 네트워크 인터페이스를 연결할 수 있음
- ENI를 사용하면, 인스턴스에 여러 개의 IP 주소를 할당할 수 있음

상황 예시: A 서버가 멈췄을 때, B 서버로 트래픽을 전달하려면? (A 서버의 IP 주소를 B 서버로 전달)

**EC2 - Hibernation**

- hibernation은 인스턴스의 상태를 저장하고, 인스턴스를 중지할 수 있는 기능
- hibernation을 사용하면, 인스턴스를 중지하고 다시 시작할 때 상태를 유지할 수 있음
- hibernation을 사용하면, 인스턴스를 중지하고 다시 시작할 때 시간이 단축됨

**EC2 - EBS (Elastic Block Store)**

- EBS는 EC2 인스턴스에 연결하여 사용하는 스토리지
- EBS는 EC2 인스턴스를 중지하고 다시 시작해도 데이터가 유지됨
- EBS는 스냅샷을 생성하여 데이터를 백업할 수 있음
- 단, EBS는 특정 availability zone에만 연결할 수 있음

EBS Snapshots 의 활용

- EBS 스냅샷은 EBS 볼륨의 데이터를 백업하는 방법
- EBS 스냅샷을 사용하면, EBS 볼륨을 다른 availability zone으로 복제할 수 있음
- EBS 스냅샷을 사용하면, EBS 볼륨을 다른 region으로 복제할 수 있음
- EBS 스냅샷을 사용하면, EBS 볼륨을 다른 계정으로 공유할 수 있음

**EC2 - AMI (Amazon Machine Image)**

- AMI는 EC2 인스턴스를 생성하는 템플릿
- AMI를 사용하면, EC2 인스턴스를 빠르게 생성할 수 있음
- AMI를 사용하면, 운영 체제, 소프트웨어, 설정 등을 포함한 이미지를 사용할 수 있음
- AMI를 사용하면, 여러 인스턴스를 동일한 설정으로 생성할 수 있음

process to create an AMI

- EC2 인스턴스를 시작
- 인스턴스에 필요한 소프트웨어를 설치
- 인스턴스를 중지
- AMI를 생성
- AMI를 사용하여 인스턴스를 생성

**EC2 - instance store**

- instance store는 EC2 인스턴스에 연결하여 사용하는 스토리지
- instance store는 EC2 인스턴스를 중지하고 다시 시작하면 데이터가 삭제됨
- instance store는 EBS보다 빠르지만, 데이터가 영구적이지 않음

**EC2 - EBS Volume Types**

- EBS는 다양한 유형의 볼륨을 제공
- EBS 볼륨 유형에 따라 성능, 가격, 용량 등이 다름

- gp2 : General Purpose SSD (일반용도 SSD) - 범용적으로 사용
- io1 : Provisioned IOPS SSD (IOPS 프로비저닝 SSD) - IOPS가 중요한 애플리케이션에 사용
- st1 : Throughput Optimized HDD (처리량 최적화 HDD) - 처리량이 중요한 애플리케이션에 사용
- sc1 : Cold HDD (저온 HDD) - 저비용 스토리지에 사용

IOPS : Input/Output Operations Per Second (초당 입출력 작업 수)

**EC2 - Multi-Attach**

- EBS 볼륨을 여러 EC2 인스턴스에 연결하는 기능
- Multi-Attach를 사용하면, 여러 인스턴스에서 동시에 EBS 볼륨을 사용할 수 있음
- Multi-Attach를 사용하면, 여러 인스턴스에서 동시에 데이터를 읽고 쓸 수 있음

**EC2 - EBS Encryption**

- EBS 볼륨을 암호화하여 데이터를 보호할 수 있음
- EBS 암호화를 사용하면, EBS 볼륨을 생성할 때 암호화를 설정할 수 있음
- EBS 암호화를 사용하면, 데이터를 암호화하여 저장할 수 있음
- 암호화 방식: AES-256 (Advanced Encryption Standard)

**EC2 - EFS (Elastic File System)**

- EFS는 여러 EC2 인스턴스에서 공유할 수 있는 파일 시스템
- EFS를 사용하면, 여러 EC2 인스턴스에서 동시에 파일을 읽고 쓸 수 있음
- EFS를 사용하면, EC2 인스턴스를 추가하거나 제거할 수 있음
- EFS를 사용하면, 데이터를 안전하게 보관할 수 있음
- 용량을 자동으로 조정하며, 사용한 만큼만 비용을 지불
- EFS는 여러 availability zone에 걸쳐 데이터를 저장하여 가용성을 높일 수 있음

Storage Classes: Standard, Infrequent Access, One Zone Infrequent Access, Intelligent Tiering, Glacier, Glacier Deep Archive

- Standard : 자주 액세스하는 데이터에 사용
- Infrequent Access : 가끔 액세스하는 데이터에 사용
- One Zone Infrequent Access : 한 availability zone에 데이터를 저장
- Intelligent Tiering : 자동으로 데이터를 분류하여 저장
- Glacier : 아카이브 데이터에 사용
- Glacier Deep Archive : 장기 보존 데이터에 사용
- Archive : 장기 보존 데이터에 사용, 매우 가끔 액세스하는 데이터에 사용
