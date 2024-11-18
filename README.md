```
AjaeGAG
├── public                  # 정적 파일이 위치하는 폴더 (예: favicon, images)
│   └── vite.svg            # Vite 기본 로고 파일
├── src                     # 소스 코드 폴더
│   ├── assets              # 정적 자산 (이미지, 아이콘 등)
│   │   └── react.svg       # React 아이콘
│   ├── components          # 공통 컴포넌트
│   │   ├── layout          # 레이아웃 관련 컴포넌트
│   │   │   └── Layout.jsx  # 앱 전체를 감싸는 레이아웃 컴포넌트
│   │   └── router          # 라우팅 관련 컴포넌트
│   │       └── Router.jsx  # React Router 설정 파일
│   ├── styled-component    # 글로벌 스타일 설정
│   │   └── GlobalStyle.jsx # Styled-components로 작성된 글로벌 스타일
│   ├── context             # 전역 상태 관리를 위한 Context API (현재 빈 폴더)
│   ├── pages               # 페이지 컴포넌트
│   │   ├── about-page      # About 페이지
│   │   │   └── AboutPage.jsx
│   │   ├── home-page       # Home 페이지
│   │   │   └── HomePage.jsx
│   │   ├── list-detail-page # 리스트 상세 페이지
│   │   │   └── ListDetailPage.jsx
│   │   ├── list-page       # 리스트 페이지
│   │   │   └── ListPage.jsx
│   │   ├── login-page      # 로그인 페이지
│   │   │   └── LoginPage.jsx
│   │   ├── my-page         # 마이 페이지
│   │   │   └── MyPage.jsx
│   │   ├── post-page       # 게시물 작성 페이지
│   │   │   └── PostPage.jsx
│   │   └── signup-page     # 회원가입 페이지
│   │       └── SignUpPage.jsx
│   ├── service             # API 호출 또는 비즈니스 로직 처리 파일 (현재 빈 폴더)
│   ├── main.jsx            # React 진입점 파일
│   ├── App.jsx             # 최상위 앱 컴포넌트
│   └── supabaseClient.js   # Supabase 클라이언트 설정 파일
├── .env                    # 환경 변수 설정 파일
├── .eslint.config.js       # ESLint 설정 파일
├── .gitignore              # Git에서 추적하지 않을 파일 및 폴더
├── index.html              # HTML 진입점 파일
├── package.json            # 프로젝트 의존성과 스크립트 정의
├── README.md               # 프로젝트 설명 파일
├── vite.config.js          # Vite 설정 파일
└── yarn.lock               # Yarn 종속성 관리 파일

```
주요 기능
React Router를 사용한 페이지 라우팅
Styled-components를 사용한 스타일링
Supabase 연동
기술 스택
React
Vite
React Router
Styled-components
Supabase
프로젝트 구조
components: 재사용 가능한 컴포넌트들이 위치
pages: 라우트와 연결된 개별 페이지 컴포넌트
styled-component: 전역 스타일 정의
service: API 통신 및 비즈니스 로직 처리 (추후 추가)
