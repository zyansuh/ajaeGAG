import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify' // Toastify 임포트
import 'react-toastify/dist/ReactToastify.css' // Toastify 스타일 임포트

// Mock 데이터
const mockUserData = {
  email: 'test@naver.com',
  password: '123456' // 실제 연동 시에는 안전한 방식으로 처리해야 합니다
}

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPwd, setUserPwd] = useState('')

  const navigate = useNavigate()

  // 로그인 처리 함수 (Mock 데이터)
  const handleLogin = (email, password) => {
    if (email === mockUserData.email && password === mockUserData.password) {
      toast.success('로그인 성공!')
      navigate('/') // 로그인 후 홈 페이지로 이동
    } else {
      toast.error('이메일 또는 비밀번호가 잘못되었습니다.')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // 이메일 또는 비밀번호가 비어있을 경우 별도의 알림 처리
    if (!userEmail.trim()) {
      toast.warning('이메일을 입력해주세요.') // 이메일 입력을 요구하는 알림
      return
    }

    if (!userPwd.trim()) {
      toast.warning('비밀번호를 입력해주세요.') // 비밀번호 입력을 요구하는 알림
      return
    }

    // 이메일과 비밀번호가 모두 입력되었을 때 로그인 처리
    handleLogin(userEmail, userPwd)
  }

  const moveSignUP = () => {
    navigate('/signup-page') // 경로 수정
  }

  return (
    <div>
      <h1>Ajae Gag</h1>
      <h2>Sign in</h2>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일 : </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            required
          />
        </div>

        <button type="submit">로그인</button>
        <button type="button" onClick={moveSignUP}>
          회원가입
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default LoginPage
