import { ToastContainer } from 'react-toastify' // Toastify 임포트
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css' // Toastify 스타일 임포트
import LoginForm from '../../components/common/LoginForm'

const LoginPage = () => {
  return (
    <LoginContainer>
      <h1>Ajae Gag</h1>
      <h2>Sign in</h2>
      <LoginForm />
      <ToastContainer />
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
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`
