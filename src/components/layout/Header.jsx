import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import styled from 'styled-components'

import { useUserContext } from '../../context/userContext'

import supabase from '../../supabase/supabaseClient'

import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
  const { session, user, updateUser } = useUserContext()

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('로그아웃 중 오류 발생')
    } else {
      toast.success('로그아웃되었습니다')
      updateUser(null)
    }
  }

  return (
    <HeaderContainer>
      <nav>
        <StyledLink to="/">
          <img src="/images/logo.png" alt="아재슐랭 로고" />
        </StyledLink>
        <ul>
          <li>
            <StyledLink to="/about">소개</StyledLink>
          </li>
          <li>
            <StyledLink to="/list">목록</StyledLink>
          </li>
        </ul>

        <div className="nav-links">
          {session ? (
            <>
              <span>
                {user?.user_metadata?.nickname ? (
                  <GreetLogin>{user.user_metadata.nickname}님, 환영합니다!</GreetLogin>
                ) : user?.user_metadata.name ? (
                  <GreetLogin>{user.user_metadata.name}님 환영합니다!</GreetLogin>
                ) : (
                  <GreetLogin>환영합니다.</GreetLogin>
                )}
              </span>
              <MypageLink to="/mypage">
                <FaUserCircle size={26} />
              </MypageLink>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt size={18} />
              </LogoutButton>
            </>
          ) : (
            <>
              <LoginLink to="/login">로그인</LoginLink>
              <SignupLink to="/signup">회원가입</SignupLink>
            </>
          )}
        </div>
      </nav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  max-width: 1200px;
  background-color: var(--nav--color);
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
    align-items: center;
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

const GreetLogin = styled.p`
  color: var(--logo--color);
`

const MypageLink = styled(Link)`
  margin-left: 5px;
  border-radius: 100px;
  color: var(--logo--color);

  &:hover {
    cursor: pointer;
  }
`

const LogoutButton = styled.button`
  margin-left: 5px;
  background-color: var(--logo--color);
  color: var(--nav--color);
  border: none;
  padding: 2px 4px;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`
