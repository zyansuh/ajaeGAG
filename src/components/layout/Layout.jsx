import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <HeaderContainer>
      <nav>
        <img src="/images/logo.png" alt="Logo" />
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
  );
}

function Footer() {
  return (
    <FooterContainer>
      <span>© 2024 아재슐랭. All rights reserved.</span>
    </FooterContainer>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <LayoutContainer>{children}</LayoutContainer>
      <Footer />
    </div>
  );
}

export default Layout;

const HeaderContainer = styled.header`
  width: 100%;
  background: gray;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: white;
  font-weight: 600;
  gap: 20px;

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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  background: gray;
  padding-left: 20px;
  color: white;
  align-items: center;
  justify-content: start;
  font-size: 12px;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;
