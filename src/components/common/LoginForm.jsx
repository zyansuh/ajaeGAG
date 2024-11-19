import styled from 'styled-components'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabaseClient'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailFocus = useRef(null)
  const passwordFocus = useRef(null)

  const [user, setUser] = useState(null)

  // 로그인 처리 함수 (SupaBase인증)
  const handleLogin = async (email, password) => {
    try {
      // Supabase 인증을 이용하여 로그인 시도
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // 로그인 실패 시 오류 처리
        toast.error('이메일 또는 비밀번호가 잘못되었습니다.')
        return
      }

      // 로그인 성공 시
      toast.success('로그인 성공!')
      navigate('/') // 로그인 후 홈 페이지로 이동
    } catch (err) {
      console.log(err)
      toast.error('로그인 중 오류가 발생했습니다.')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // 이메일 또는 비밀번호가 비어있을 경우 별도의 알림 처리
    if (!email.trim()) {
      toast.warning('이메일을 입력해주세요.') // 이메일 입력을 요구하는 알림
      emailFocus.current.focus()
      return
    }

    if (!password.trim()) {
      toast.warning('비밀번호를 입력해주세요.') // 비밀번호 입력을 요구하는 알림
      passwordFocus.current.focus()
      return
    }

    // 이메일과 비밀번호가 모두 입력되었을 때 로그인 처리
    handleLogin(email, password)
  }

  const moveSignUP = () => {
    navigate('/signup')
  }

  if (!user) {
    return (
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">이메일</Label>
          <InputField
            ref={emailFocus}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />

          <Label htmlFor="password">비밀번호</Label>
          <InputField
            ref={passwordFocus}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          <Label htmlFor="username" />

          <Button type="submit">로그인</Button>
          <Button type="button" onClick={moveSignUP}>
            회원가입
          </Button>
        </form>
        <ImageWrapper>
          <img src="/images/logo.png" alt="Login Illustration" />
        </ImageWrapper>
      </LoginContainer>
    )
  }
}

export default LoginForm

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`

const InputField = styled.input`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  font-size: 20px;
  border: 1px #ddd;
  border-radius: 4px;
`
const Button = styled.button`
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #131313;
  }
`
const ImageWrapper = styled.div`
  width: 100%;
  margin: 30px;
  display: flex;
  align-items: right;
`
