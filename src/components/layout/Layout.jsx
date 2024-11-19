import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

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
          <LoginLink to="/login">로그인</LoginLink>
          <SignupLink to="/signup">회원가입</SignupLink>
        </div>
      </nav>
    </HeaderContainer>
  )
}

function Footer() {
  return (
    <FooterContainer>
      <span>© 2024 아재슐랭. All rights reserved.</span>
      <div>
        <p>Team: 4조참치🐟</p>
        <p>Members: 서지안, 조동희, 김민후, 정은혜, 이경민</p>
      </div>
    </FooterContainer>
  )
}

function Layout({ children }) {
  const location = useLocation()
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <LayoutContainer>{children}</LayoutContainer>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default Layout

const HeaderContainer = styled.header`
  max-width: 1200px;
  background-color: var(--nav-color);
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
  gap: 20px;
  margin: 0 auto;
  /* border-bottom: 1px solid var(--border--color); */

  nav {
    display: flex;
    align-items: center;
    width: 100%;
  }

  img {
    width: 100px;
    margin-right: 30px;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .nav-links {
    margin-left: auto;
    padding-right: 30px;
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
  color: var(--logo--color);
  /* color: var(--button--color); */
`

const LoginLink = styled(StyledLink)`
  padding: 5px 10px;
  border: 1px solid var(--logo--color);
  border-radius: 20px;
`

const SignupLink = styled(StyledLink)`
  padding: 5px 10px;
  background-color: var(--logo--color);
  color: white;
  border-radius: 20px;

  &:hover {
    border-color: var(--logo--color);
  }
`

const FooterContainer = styled.footer`
  max-width: 1200px;
  height: 70px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  font-weight: bold;
  margin: 0 auto;
  color: var(--logo--color);
  background-color: var(--nav-color);

  div {
    display: flex;
    gap: 20px;
    margin-left: auto;
    margin-right: 20px;
  }
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
