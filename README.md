# 아재슐랭

---

## 📚 프로젝트 개요
**아재슐랭**은 유저가 아재개그를 작성하고, 공유하며 평가할 수 있는 플랫폼입니다. 본 프로젝트는 **React**와 **Supabase**를 기반으로 제작되었으며, 소셜 로그인을 통해 간편한 인증 및 다양한 유저 간 상호작용을 제공합니다.

---

## 🚀 주요 기능
1. **유저 인증 및 관리**
   - 소셜 로그인 (Google)
   - 프로필 이미지 업로드 및 회원 정보 수정
2. **게시글 관리**
   - 게시글 작성, 수정, 삭제
   - 게시글 목록 조회 및 무한 스크롤
3. **댓글 기능**
   - 댓글 작성, 수정, 삭제
   - 실시간 업데이트
4. **좋아요 기능**
   - 게시글 좋아요 및 취소
5. **홈 화면 AI 농담 추천**
   - 농담 API 연동 및 번역 기능

---

## 🛠️ 기술 스택
- **Frontend**: React, Styled-components
- **Backend**: Supabase (인증 및 데이터베이스 관리)
- **Routing**: React-Router
- **배포**: Vercel

---

## 📁 폴더 구조

```
📦 AjaeGAG
├── 📂 .vscode/           # VSCode 환경 설정 파일
├── 📂 node_modules/      # 프로젝트 종속성
├── 📂 public/            # 정적 파일
│   ├── 📂 images/        # 이미지 파일 (로고 등)
│   └── vite.svg          # Vite 기본 파일
├── 📂 src/               # 소스 코드
│   ├── 📂 assets/        # 공통 자산
│   │   └── react.svg
│   ├── 📂 components/    # UI 컴포넌트 및 기능
│   │   ├── 📂 common/    # 재사용 가능한 컴포넌트 (프로필 이미지 등)
│   │   ├── 📂 features/  # 주요 기능 관련 컴포넌트
│   │   │   ├── about/
│   │   │   ├── detail/
│   │   │   ├── login/
│   │   │   ├── router/
│   │   │   └── styled-component/
│   │   └── 📂 ui/        # UI 레이아웃 및 디자인
│   │       ├── about/
│   │       ├── detail/
│   │       └── list/
│   ├── 📂 context/       # 전역 상태 관리 (UserContext)
│   ├── 📂 data/          # 정적 데이터
│   ├── 📂 hooks/         # 커스텀 React Hooks
│   ├── 📂 pages/         # 각 페이지 컴포넌트
│   │   ├── about-page/
│   │   ├── home-page/
│   │   ├── list-detail-page/
│   │   ├── list-page/
│   │   ├── login-page/
│   │   ├── my-page/
│   │   ├── post-page/
│   │   ├── signup-page/
│   │   └── update-page/
│   ├── 📂 service/       # 서비스 관련 유틸리티 (예: Supabase 클라이언트)
│   ├── 📂 supabase/      # Supabase 초기화 파일
│   ├── 📂 utils/         # 유틸리티 함수
│   ├── App.jsx           # 최상위 React 컴포넌트
│   └── main.jsx          # 엔트리 포인트
├── .env                  # 환경 변수
├── .eslintrc.js          # ESLint 설정
├── .gitignore            # Git 무시 파일
├── index.html            # HTML 템플릿
├── package.json          # 프로젝트 정보 및 종속성
├── README.md             # 프로젝트 설명 파일
├── vite.config.js        # Vite 설정
└── yarn.lock             # Yarn 종속성 버전 고정
```

---

## 🛠️ 주요 설정 파일
### `.env`
```plaintext
VITE_SUPABASE_URL=<Supabase URL>
VITE_SUPABASE_KEY=<Supabase Key>
```

### `vite.config.js`
Vite 기본 설정으로 React 환경에 최적화된 빌드 설정.

---

## 📖 주요 코드 설명
### **UserContext (전역 상태 관리)**
- **파일**: `src/context/userContext.jsx`
- **역할**: 유저 인증 및 로그인 상태 관리.

### **Supabase 클라이언트**
- **파일**: `src/supabase/supabaseClient.js`
- **역할**: Supabase API와의 상호작용 초기화.

---


## 🧩 설치 및 실행 방법
1. **프로젝트 클론**
   ```bash
   git clone https://github.com/username/AjaeGAG.git
   cd AjaeGAG
   ```

2. **종속성 설치**
   ```bash
   yarn install
   ```

3. **환경 변수 설정**
   `.env` 파일에 Supabase URL과 Key 추가.

4. **개발 서버 실행**
   ```bash
   yarn dev
   ```

5. **빌드**
   ```bash
   yarn build
   ```

6. **배포**
   Vercel 또는 기타 호스팅 서비스 이용.

---

## 📞 문의
- **작성자** : [4조참치](https://conscious-resonance-3c4.notion.site/12f22ab31f438094a549f09010acd64f?pvs=4)
- **GitHub** : [프로젝트 링크](https://github.com/zyansuh/ajaeGAG)
- **배포사이트** : [아재슐랭](https://ajae-gag-final.vercel.app/)
---

