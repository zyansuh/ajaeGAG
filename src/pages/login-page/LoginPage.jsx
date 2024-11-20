import styled from 'styled-components'
import LoginForm from '../../components/features/login/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <LoginContainer>
      <StyledLink to="/">
        <h1>Ajae CheLen</h1>
      </StyledLink>
      <h2>로그인</h2>
      <LoginForm />
    </LoginContainer>
  )
}

export default LoginPage
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 3px 3px gray;

  h1 {
    font-size: 36px; /* 수정된 부분: px 단위로 수정 */
    margin-bottom: 10px;
    cursor: pointer;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
