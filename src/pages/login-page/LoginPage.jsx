import styled from 'styled-components'
import LoginForm from '../../components/features/login/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <LoginContainer>
      <StyledLink to="/">
        <h1>Ajae CheLin</h1>
      </StyledLink>
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
  height: 100vh;

  h1 {
    font-size: 60px; /* 제목 크기 */
    margin-bottom: 10px;
    color: #ac2828;
    cursor: pointer;
    text-align: center;
    font-family: 'KCC-Ahnchangho';
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #2c2c2c;
`
