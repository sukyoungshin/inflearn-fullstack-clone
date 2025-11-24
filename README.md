# 🚀 Inflearn 클론 코딩 프로젝트

## 1. 프로젝트 개요 및 핵심 목표 (Overview)

| 구분 | 내용 |
| :--- | :--- |
| **프로젝트 이름** | Inflearn 클론코딩 프로젝트 |
| **핵심 목표** | Next.js와 NestJS를 연동하여 안정적인 분산 환경의 **JWT 기반 인증 시스템**과 **온라인 강의 플랫폼 핵심 기능**을 구현하는 것에 중점을 두었습니다. |
| **주요 기능** | 사용자 인증/인가, 강의(코스) 관리, 섹션/강의 관리, 카테고리 관리, 미디어 업로드(S3), 강사 대시보드 |

---

## 2. 주요 기술 스택 (Tech Stack)

| 영역 | 기술 스택 | 비고 |
| :--- | :--- | :--- |
| **Frontend** | Next.js, TypeScript, NextAuth.js, Tailwind CSS | Turbopack 사용, OpenAPI 클라이언트 자동 생성 |
| **Backend** | NestJS, TypeScript, Passport.js, Swagger | RESTful API, JWT 인증 |
| **Database/ORM** | PostgreSQL, Prisma | Prisma Class Generator 사용 |
| **Storage** | AWS S3 | 미디어 파일 저장 |
| **API 통신** | OpenAPI (Swagger) | 자동 클라이언트 코드 생성 |
<!-- | **Deployment** | AWS (S3, CloudFront, EC2) | (배포 문서 참고) | -->

---

## 3. ⚙️ 프로젝트 실행 방법 (Getting Started)

프로젝트를 로컬 환경에서 실행하기 위한 필수 단계입니다.

### 필수 환경

* Node.js (v22.16.0 이상)
* pnpm (v10.11.0)
<!-- * Docker (PostgreSQL 환경 구성 시)
* PostgreSQL (또는 Docker Compose 사용) -->

### 실행 순서

1.  **레포지토리 클론:**
    ```bash
    git clone [레포지토리 주소]
    cd inflearn
    ```

2.  **의존성 설치:**
    ```bash
    # backend와 frontend 폴더에서 각각 실행
    cd backend && pnpm install
    cd ../frontend && pnpm install
    ```

3.  **환경 변수 설정:**
    
    **Backend (.env):**
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/inflearn"
    AUTH_SECRET="your-secret-key-here"
    PORT=8000
    AWS_ACCESS_KEY_ID="your-aws-access-key"
    AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
    AWS_REGION="ap-northeast-2"
    AWS_S3_BUCKET_NAME="your-bucket-name"
    ```
    
    **Frontend (.env):**
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/inflearn"
    AUTH_SECRET="your-secret-key-here" # Backend와 동일한 값
    API_URL="http://localhost:8000"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **데이터베이스 설정:**
    ```bash
    # Backend에서 Prisma 마이그레이션 실행
    cd backend
    pnpm prisma:generate
    pnpm prisma:push
    pnpm prisma:seed  # 카테고리 시드 데이터 생성
    ```

5.  **OpenAPI 클라이언트 생성 (Frontend):**
    ```bash
    cd frontend
    pnpm openapi:generate
    ```
    > **참고:** Backend 서버가 실행 중이어야 Swagger 문서에서 OpenAPI 스펙을 가져올 수 있습니다.

6.  **백엔드 실행:**
    ```bash
    cd backend
    pnpm run start:dev
    ```
    - 서버 실행: `http://localhost:8000`
    - Swagger 문서: `http://localhost:8000/docs`

7.  **프론트엔드 실행:**
    ```bash
    cd frontend
    pnpm run dev
    ```
    - 애플리케이션 실행: `http://localhost:3000`

---

## 4. 📚 상세 문서 링크 (Docs Navigation)

프로젝트의 설계, 구현 이유, 트러블슈팅 등 상세 내용은 `docs` 폴더를 참고해주세요.

| 문서 | 내용 요약 | 링크 |
| :--- | :--- | :--- |
| **`architecture.md`** | Frontend/Backend 연동 구조 및 **JWT 인증 흐름** (NextAuth.js + Passport.js) | [architecture.md](docs/architecture.md) |
<!-- | **`deployment.md`** | **AWS 기반 배포 파이프라인** 및 인프라 구조 | [deployment.md](docs/deployment.md) | 
| **`tech-stack-details.md`** | **기술 선택 이유** (NestJS, Prisma, NextAuth 등) 및 **폼 관리 장단점** 비교 | [tech-stack-details.md](docs/tech-stack-details.md) |
| **`troubleshooting.md`** | 개발/배포 시 **주요 오류 및 해결 방법** (트러블슈팅) | [troubleshooting.md](docs/troubleshooting.md) |-->

---

## 5. 프로젝트 구조

```
inflearn/
├── backend/              # NestJS 백엔드
│   ├── src/
│   │   ├── auth/        # JWT 인증 (Passport Strategy)
│   │   ├── courses/     # 강의 관리
│   │   ├── sections/    # 섹션 관리
│   │   ├── lectures/    # 강의 관리
│   │   ├── categories/  # 카테고리 관리
│   │   ├── media/       # 미디어 업로드 (S3)
│   │   └── users/       # 사용자 관리
│   └── prisma/          # Prisma 스키마 및 시드
│
├── frontend/            # Next.js 프론트엔드
│   ├── app/             # App Router
│   │   ├── (auth)/      # 인증 페이지
│   │   ├── course/      # 강의 상세/편집
│   │   ├── instructor/  # 강사 대시보드
│   │   └── ...
│   ├── components/      # React 컴포넌트
│   ├── generated/       # OpenAPI 자동 생성 클라이언트
│   └── config/          # OpenAPI 런타임 설정
│
├── README.md            # 프로젝트 간략소개
└── docs/                # 프로젝트 문서
```

---

## 6. 주요 기능

### 인증/인가
- NextAuth.js 기반 JWT 인증
- Passport.js 전략 패턴을 활용한 백엔드 인증
- Bearer 토큰 방식 API 보호

### 강의 관리
- 강의(코스) CRUD
- 섹션 및 강의(레슨) 계층 구조 관리
- 강의 미리보기 설정
- 카테고리 분류

### 미디어 관리
- AWS S3 기반 파일 업로드
- 이미지/동영상 지원 (최대 300MB)

### 강사 기능
- 강사 대시보드
- 강의 생성/편집 인터페이스
- CKEditor 기반 강의 설명 편집

---

## 7. 개발 팁

### OpenAPI 클라이언트 재생성
Backend API 스펙이 변경되면 Frontend에서 클라이언트를 재생성해야 합니다:
```bash
cd frontend
pnpm openapi:generate
```

### Prisma 스튜디오 실행
데이터베이스 데이터를 시각적으로 확인:
```bash
cd backend
pnpm prisma:studio
```

### Swagger 문서 확인
Backend API 문서 확인:
- URL: `http://localhost:8000/docs`
- Bearer 토큰 인증 테스트 가능
