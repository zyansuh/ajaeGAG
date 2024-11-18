import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <HeaderContainer>
      <nav>
        <img src="/images/logo.png" alt="아재슐랭 로고" />
        <ul>
          <li>
            <StyledLink to="/about">소개</StyledLink>
          </li>
          <li>
            <StyledLink to="/list">목록</StyledLink>
          </li>
        </ul>
        <div className="nav-links">
          <StyledLink to="/login">로그인</StyledLink>
          <StyledLink to="/signup">회원가입</StyledLink>
        </div>
      </nav>
    </HeaderContainer>
  )
}

function Footer() {
  return (
    <FooterContainer>
      <span>© 2024 아재슐랭. All rights reserved.</span>
    </FooterContainer>
  )
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <LayoutContainer>{children}</LayoutContainer>
      <Footer />
    </div>
  )
}

export default Layout

const HeaderContainer = styled.header`
  max-width: 1200px;
  background: #2C2C2C;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: white;
  font-weight: 600;
  gap: 20px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    width: 100%;
  }

  img {
    width: 50px;
    margin-right: 10px;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .nav-links {
    margin-left: auto;
    padding-right: 20px;
    display: flex;
    gap: 10px;
  }

  /* 미디어 쿼리: 768px 이하일 때 */
  /* 768px 아이패드 태블릿 사이즈 */
  @media (max-width: 768px) {
    height: 50px;
    padding: 10px;

    nav {
      flex-wrap: wrap;
      gap: 10px;
    }

    img {
      width: 50px;
      margin: 0;
    }

    ul {
      flex-wrap: wrap;
      gap: 5px;
    }

    .nav-links {
      flex-wrap: wrap;
      gap: 5px;
      padding: 0;
    }
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const FooterContainer = styled.footer`
  max-width: 1200px;
  height: 50px;
  display: flex;
  background: #2C2C2C;
  padding-left: 20px;
  color: white;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  margin: 0 auto;

  /* 미디어 쿼리: 768px 이하일 때 */
  @media (max-width: 768px) {
    height: 50px;
    padding: 10px;
    text-align: center;
    justify-content: center;
    font-size: 12px;
  }
`

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  min-height: calc(100vh - 100px);
  margin: 0 auto;

  /* 미디어 쿼리: 768px 이하일 때 */
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`
