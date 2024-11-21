import { useState, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import styled from 'styled-components'

import ProfileImageUpload from '../../components/features/login/ProfileImageUpload'

import supabase from '../../supabase/supabaseClient'

import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassWord] = useState('')
  const [nickname, setNickName] = useState('')
  const [img, setImg] = useState()
  const [user, setUser] = useState()

  const emailFocus = useRef()
  const passwordFocus = useRef()
  const checkPasswordFocus = useRef()
  const nicknameFocus = useRef()

  const handleImageSelect = (file) => {
    setImg(file)
  }

  //auth에 회원가입을 하기 위한 코드
  const signUpNewUser = async (e) => {
    e.preventDefault()

    // 필수 입력 항목 검사
    if (!email.trim()) {
      toast.warning('이메일을 입력해주세요.') // 이메일 입력을 요구하는 알림
      emailFocus.current.focus()
      return // 이메일 입력란에 포커스
    }

    if (!password.trim()) {
      toast.warning('비밀번호를 입력해주세요.') // 비밀번호 입력을 요구하는 알림
      passwordFocus.current.focus()
      return // 비밀번호 입력란에 포커스
    }

    if (!checkPassword.trim()) {
      toast.warning('비밀번호 확인을 입력해주세요.') // 비밀번호 확인을 요구하는 알림
      checkPasswordFocus.current.focus()
      return // 비밀번호 확인 입력란에 포커스
    }

    if (!nickname.trim()) {
      toast.warning('닉네임을 입력해주세요.') // 이메일 입력을 요구하는 알림
      nicknameFocus.current.focus()
      return // 닉네임 입력란에 포커스
    }

    if (password !== checkPassword) {
      toast.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    //supabase auth에 사용자 등록
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: nickname
        }
      }
    })

    if (error) {
      if (error.message.includes('already registered')) {
        toast.error('이미 가입된 이메일입니다. 다른 이메일을 사용해 주세요.')
      } else {
        console.log(error)
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
      return
    }

    // 이미지 업로드 처리
    let profileImageUrl
    if (img) {
      console.log(img)
      // Supabase Storage에 이미지 업로드
      const fileExt = img.name.split('.').pop()
      const filePath = `url_img/${data.user.id}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars') // 'avatars'는 파일이 저장될 버킷 이름(storage내에 있는 avatars file)
        .upload(filePath, img)

      if (uploadError) {
        console.log(uploadError)
        return
      }

      // 업로드된 이미지 URL 가져오기
      console.log(filePath)
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath)

      console.log({ data: urlData })

      profileImageUrl = urlData.publicUrl
    }

    //users table에 회원가입을 하기 위한 코드
    const { data: userData } = await supabase.from('users').insert({
      email: data.user.user_metadata.email,
      id: data.user.id,
      nickname: nickname,
      url_img: profileImageUrl
    })

    setUser(userData) // userData 저장
    navigate('/login') // 회원가입 완료 후 로그인 페이지로 이동
    toast.success('회원가입이 완료되었습니다.!')
  }

  // user가 없을때 회원가입이 가능하도록 설정
  if (!user) {
    return (
      <SignUpContainer>
        <SignUpForm onSubmit={signUpNewUser}>
          <Title>회원가입</Title>

          <ProfileImageUpload onImageSelect={handleImageSelect} />

          <FormGroup>
            <Label>
              <FaEnvelope size={24} style={{ marginRight: '10px' }} />
              이메일
            </Label>
            <Input ref={emailFocus} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLock size={24} style={{ marginRight: '10px' }} />
              비밀번호
            </Label>
            <Input ref={passwordFocus} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLock size={24} style={{ marginRight: '10px' }} />
              비밀번호 확인
            </Label>
            <Input
              ref={checkPasswordFocus}
              type="password"
              value={checkPassword}
              onChange={(e) => setCheckPassWord(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaUser size={24} style={{ marginRight: '10px' }} />
              닉네임
            </Label>
            <Input ref={nicknameFocus} type="text" value={nickname} onChange={(e) => setNickName(e.target.value)} />
          </FormGroup>

          <SubmitButton type="submit">가입하기</SubmitButton>
        </SignUpForm>
      </SignUpContainer>
    )
  }
}
export default SignUpPage

// 스타일 컴포넌트
const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SignUpForm = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: #d3d3d3;
    outline: none;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3c3c3c;
  }
`
