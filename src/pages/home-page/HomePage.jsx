import styled, { createGlobalStyle } from 'styled-components'

// ===================
// 글로벌 스타일 정의
// ===================
const GlobalStyle = createGlobalStyle`
  /* 기본 스타일 초기화 */
  body {
    margin: 0;
    font-family: Arial, sans-serif; /* 폰트 설정 */
    background-color: #f8f9fa; /* 배경 색상 */
    color: #212529; /* 텍스트 기본 색상 */
    display: flex;
    flex-direction: column; /* 푸터를 아래로 밀기 위한 설정 */
    min-height: 100vh; /* 화면 높이를 최소 높이로 설정 */
  }

  /* 링크 스타일 */
  a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
  }

  /* 박스 모델 초기화 */
  *, *::before, *::after {
    box-sizing: border-box;
  }
`

// ===================
// HomePage 컴포넌트
// ===================
const HomePage = () => {
  // 목업 데이터: 리뷰 카드 정보
  const reviews = Array(6).fill({
    rating: 5, // 별점 5개
    title: '도둑이 훔친 커피는?', // 리뷰 제목
    subtitle: '리뷰내용', // 리뷰 내용
    author: '서지안' // 작성자 이름
  })

  return (
    <>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      <Wrapper>
        {/* 헤더 섹션 */}
        <Header>
          {/* 왼쪽 섹션: 로고와 네비게이션 메뉴 */}
          <LeftSection>
            <Logo>
              <img src="/images/logo.png" alt="로고" /> {/* 로고 이미지 */}
            </Logo>
            <Nav>
              <a href="#">소개</a> {/* 소개 링크 */}
              <a href="#">목록</a> {/* 목록 링크 */}
            </Nav>
          </LeftSection>

          {/* 오른쪽 섹션: 로그인 및 회원가입 버튼 */}
          <Auth>
            <button>로그인</button>
            <button>회원가입</button>
          </Auth>
        </Header>

        {/* 메인 섹션 */}
        <Main>
          {/* Hero 섹션 */}
          <Section>
            <Hero>
              <h1>아재슐랭</h1> {/* 메인 타이틀 */}
              <p>AI 추천! 오늘의 아재개그</p> {/* 부제목 */}
              <button>오늘의 AI 추천보기</button> {/* 추천 보기 버튼 */}
            </Hero>
          </Section>

          {/* 리뷰 카드 섹션 */}
          <Reviews>
            {reviews.map((review, index) => (
              <Card key={index}>
                {/* 별점 섹션 */}
                <Stars>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} /> // 별점 표시
                  ))}
                </Stars>
                {/* 리뷰 제목과 내용 */}
                <h3>{review.title}</h3>
                <p>{review.subtitle}</p>
                {/* 작성자 정보 */}
                <Profile>
                  <span>{review.author}</span>
                </Profile>
                <button>Button</button>
              </Card>
            ))}
          </Reviews>
        </Main>

        {/* 하단 섹션 (푸터) */}
        <Footer>
          <h2>당신의 아재개그를 뽐내보세요!</h2> {/* 타이틀 */}
          <button>Button</button> {/* 버튼 */}
          <p>© 2024 아재슐랭. All rights reserved.</p> {/* 저작권 정보 */}
        </Footer>
      </Wrapper>
    </>
  )
}

export default HomePage

// ===================
// 스타일 정의
// ===================

/* 전체 페이지 래퍼 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  min-height: 100vh; /* 전체 화면 높이를 차지 */
`

/* 헤더 */
const Header = styled.header`
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  padding: 1rem 2rem; /* 내부 여백 */
  border-bottom: 1px solid #ddd; /* 하단 경계선 */
`

/* 로고와 메뉴를 묶는 왼쪽 섹션 */
const LeftSection = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 2rem; /* 로고와 메뉴 사이 간격 */
`

/* 로고 */
const Logo = styled.div`
  img {
    height: 40px; /* 로고 높이 */
  }
`

/* 네비게이션 메뉴 */
const Nav = styled.nav`
  display: flex;
  gap: 1.5rem; /* 메뉴 사이 간격 */

  a {
    font-size: 1rem; /* 메뉴 텍스트 크기 */
    color: #333;
  }
`

/* 오른쪽 섹션 (로그인/회원가입 버튼) */
const Auth = styled.div`
  button {
    margin-left: 1rem; /* 버튼 사이 간격 */
    padding: 0.5rem 1rem;
    background-color: #007bff; /* 버튼 배경색 */
    color: white; /* 버튼 텍스트 색상 */
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3; /* 호버 시 배경색 */
    }
  }
`

/* 메인 섹션 */
const Main = styled.main`
  flex: 1; /* 메인이 화면 대부분을 차지 */
  padding: 2rem;
`

/* Hero 섹션 */
const Section = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`

/* Hero 스타일 */
const Hero = styled.div`
  width: 100%; /* Hero 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 3rem 2rem; /* Hero 내부 여백 */
  background-color: #ffffff89; /* 회색 배경 */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */

  h1 {
    font-size: 2.5rem; /* 메인 타이틀 크기 */
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: #666; /* 부제목 색상 */
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #007bff; /* 버튼 배경 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3; /* 호버 시 배경 */
    }
  }
`

/* 리뷰 카드 컨테이너 */
const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 고정 */
  gap: 1.5rem; /* 카드 간격 */
  margin-top: 2rem;
`

/* 리뷰 카드 */
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;

  h3 {
    margin: 0.5rem 0;
  }

  p {
    color: #666; /* 내용 텍스트 색상 */
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #007bff; /* 버튼 색상 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

/* 별점 */
const Stars = styled.div`
  display: flex;
`

const Star = styled.div`
  width: 16px;
  height: 16px;
  background-color: #ff0; /* 노란색 별 */
  margin-right: 4px;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
`

/* 작성자 프로필 */
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`

/* 푸터 */
const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  border-top: 1px solid #ddd;
  margin-top: auto; /* 푸터를 화면 하단으로 고정 */

  h2 {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  p {
    margin-top: 2rem;
    font-size: 0.8rem;
    color: #666;
  }
`              
