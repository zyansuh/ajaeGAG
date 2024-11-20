import styled from 'styled-components'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import supabase from '../../../supabase/supabaseClient'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailFocus = useRef(null)
  const passwordFocus = useRef(null)

  const [user, setUser] = useState(null)
  const [skipEmailCheck, setSkipEmailCheck] = useState(false)

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

    if (skipEmailCheck) {
      setSkipEmailCheck(false) // 체크 후 초기화
      return handleLogin(email, password) // 이메일이 제대로 입력된 상태에서 로그인 처리
    }

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

  const googleLogin = async () => {
    setSkipEmailCheck(true)
    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
    } catch (err) {
      console.log(err)
      toast.error('구글 로그인 중 오류가 발생했습니다.')
    }
  }

  if (!user) {
    return (
      <LoginContainer>
        <LogoWrapper>
          <img src="/images/logo.png" alt="Login Illustration" />
        </LogoWrapper>

        <FormTitle>로그인</FormTitle>

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label htmlFor="email">이메일</Label>
            <InputField
              ref={emailFocus}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password">비밀번호</Label>
            <InputField
              ref={passwordFocus}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </InputWrapper>

          <Button type="submit">로그인</Button>

          <LinkText onClick={moveSignUP}>회원가입</LinkText>
          <LinkText onClick={googleLogin}>구글 로그인</LinkText>
        </form>
      </LoginContainer>
    )
  }
}

export default LoginForm

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  img {
    width: 60%;
    object-fit: contain;
  }
`

const FormTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
`

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  font-weight: 600;
`

const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: #fafafa;
  box-sizing: border-box;
  transition: 0.3s ease;
  &:focus {
    border-color: #2c2c2c;
    outline: none;
    background-color: #fff;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
  transition: 0.3s ease;

  &:hover {
    background-color: #333;
  }
`

const LinkText = styled.button`
  font-size: 14px;
  color: #2c2c2c;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  &:hover {
    color: #007bff;
  }
`
