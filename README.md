```
project-root/
│
├── src/                                # 애플리케이션 소스 코드 디렉토리
│   ├── service/                        # 서비스 관련 파일 (예: API 클라이언트, 유틸리티)
│   │   └── supabaseClient.js           # Supabase 클라이언트를 생성하고 내보내는 파일
│   │
│   ├── pages/                          # 페이지 단위 컴포넌트
│   │   ├── home-page/                  # 홈 페이지 관련 파일
│   │   │   └── HomePage.jsx            # 메인 홈 페이지 컴포넌트
│   │   │
│   │   ├── list-page/                  # 리스트 페이지 관련 파일
│   │   │   └── ListPage.jsx            # 리스트 페이지 컴포넌트
│   │   │
│   │   ├── post-page/                  # 게시물 작성 페이지 관련 파일
│   │   │   └── PostPage.jsx            # 게시물 작성 페이지 컴포넌트
│   │   │
│   │   ├── signup-page/                # 회원가입 페이지 관련 파일
│   │   │   └── SignupPage.jsx          # 회원가입 페이지 컴포넌트
│   │   │
│   │   ├── my-page/                    # 마이페이지 관련 파일
│   │   │   └── MyPage.jsx              # 마이페이지 컴포넌트
│   │   │
│   │   └── about-page/                 # 정보 페이지 관련 파일
│   │       └── AboutPage.jsx           # 정보 페이지 컴포넌트
│   │
│   ├── components/                     # 재사용 가능한 UI 컴포넌트 디렉토리
│   │   ├── layout/                     # 레이아웃 관련 컴포넌트
│   │   │   └── Layout.jsx              # 페이지 공통 레이아웃 컴포넌트
│   │   │
│   │   ├── router/                     # 라우터 관련 파일
│   │   │   └── Router.jsx              # 라우터 설정 파일
│   │   │
│   │   ├── styled-component/           # 전역 스타일 관련 파일
│   │   │   └── GlobalStyle.jsx         # styled-components로 작성한 글로벌 스타일
│   │   │
│   │   └── ...                         # 기타 재사용 가능한 컴포넌트들
│   │
│   ├── assets/                         # 이미지, 아이콘, 폰트와 같은 정적 자산
│   │   ├── images/                     # 프로젝트에서 사용하는 이미지
│   │   │   ├── logo.png                # 로고 이미지
│   │   │   └── ...                     # 기타 이미지 파일
│   │   └── react.svg                   # React 로고 (예제 파일)
│   │
│   └── context/                        # 전역 상태 관리(Context API 사용 시)
│       └── ...                         # 상태 관리 관련 파일들
│
├── public/                             # 정적 파일들 (빌드 시 복사됨)
│   ├── vite.svg                        # Vite 로고
│   ├── favicon.ico                     # 브라우저 탭에 표시되는 파비콘
│   └── index.html                      # React 앱이 주입되는 HTML 파일
│
├── .env                                # 환경 변수 파일 (API 키 및 URL 저장)
├── .gitignore                          # Git 버전 관리에서 제외할 파일 및 디렉토리
├── package.json                        # 프로젝트 메타데이터 및 의존성 관리 파일
├── README.md                           # 프로젝트 설명 파일
├── yarn.lock / package-lock.json       # 의존성 고정 파일 (Yarn 또는 NPM 사용 시 생성)
├── vite.config.js                      # Vite 설정 파일
└── index.html                          # 애플리케이션의 기본 HTML 파일

```
각 디렉토리 및 파일 역할
1. src/ (소스 코드 디렉토리)
service/

supabaseClient.js
Supabase API 클라이언트를 생성하고 내보냄.
다른 파일에서 쉽게 import하여 사용할 수 있도록 함.
pages/

각 페이지 컴포넌트를 관리.
페이지별 디렉토리를 만들어 컴포넌트 파일을 저장.
예: HomePage.jsx는 홈 페이지를 구성, ListPage.jsx는 리스트 페이지를 구성.
components/

재사용 가능한 컴포넌트를 저장.
layout/
페이지 공통 레이아웃 컴포넌트.
styled-component/
글로벌 스타일 설정 파일.
assets/

프로젝트에서 사용하는 정적 자산 저장.
images/
로고, 배경 이미지, 기타 디자인 요소.
context/

React Context API를 사용한 전역 상태 관리 파일 저장.
2. public/ (정적 파일)
앱이 빌드될 때 정적 파일이 그대로 복사되는 디렉토리.
index.html
React 애플리케이션이 삽입되는 HTML 파일.
3. 루트 디렉토리
.env
API 키 및 프로젝트 URL을 저장.
예: VITE_SUPABASE_KEY, VITE_SUPABASE_URL.
.gitignore
Git 버전 관리에서 제외할 파일.
.env, node_modules, build 디렉토리 등이 포함됨.
package.json
프로젝트의 종속성과 스크립트를 관리.
vite.config.js
Vite 프로젝트 설정 파일.

