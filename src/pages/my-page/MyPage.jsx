import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabase/supabaseClient'
import ProfileImageUpload from '../../components/features/login/ProfileImageUpload'
import { toast } from 'react-toastify'
import { useUserContext } from '../../components/features/userContext/UserContextProvider'
import styled from 'styled-components'

function MyPage() {
  const { user, updateUser } = useUserContext() // useUserContext로 사용자 정보 받아오기
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [newPassword, setNewPassword] = useState('') // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('') // 새 비밀번호 확인
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 포커스를 위해 참조를 설정
  const newPasswordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  // useEffect 내부에서 상태 업데이트를 처리
  useEffect(() => {
    if (user) {
      setEmail(user.email) // 유저 이메일 설정
      setNickname(user.user_metadata?.nickname || user.user_metadata?.name) // 구글 로그인 시 이름 설정
      setUrlImg(user.user_metadata?.url_img) // 유저 프로필 이미지 설정
    }
  }, [user])

  // 프로필 이미지 업로드 핸들러
  const handleImageSelect = async (file) => {
    if (!file) return

    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('avatars') // 'avatars'라는 Storage 버킷에 업로드
      .upload(fileName, file)

    if (data) {
      const { publicURL } = supabase.storage.from('avatars').getPublicUrl(fileName)
      setUrlImg(publicURL) // 업로드한 이미지의 URL을 상태에 저장
    } else {
      toast.error('이미지 업로드 실패')
    }
  }

  // 프로필 정보 업데이트
  const handleProfileUpdate = async () => {
    // 비밀번호 검증
    if (!newPassword.trim()) {
      toast.error('새 비밀번호를 입력해주세요.')
      newPasswordRef.current.focus() // 새 비밀번호 입력란에 포커스
      return
    }

    if (!confirmPassword.trim()) {
      toast.error('비밀번호 확인을 입력해주세요.')
      confirmPasswordRef.current.focus() // 새 비밀번호 입력란에 포커스
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.')
      confirmPasswordRef.current.focus() // 비밀번호 확인 입력란에 포커스
      return
    }

    setLoading(true)

    if (!user) {
      toast.error('사용자 정보를 불러올 수 없습니다.')
      setLoading(false)
      return
    }

    // 구글 로그인 사용자일 경우 닉네임, 이메일은 수정 불가
    if (user.user?.provider !== 'google') {
      try {
        // 이메일 또는 닉네임 업데이트 (user_metadata에 저장)
        const { data, error } = await supabase.auth.updateUser({
          data: {
            nickname, // nickname을 user_metadata에 저장
            url_img: urlImg // url_img도 user_metadata에 저장
          }
        })

        if (error) {
          console.error('Error updating profile:', error)
          toast.error('프로필 업데이트 실패')
        } else {
          toast.success('프로필이 업데이트되었습니다.')

          // 업데이트가 성공하면 user 데이터를 Context에 반영
          updateUser({ ...user, user_metadata: { ...user.user_metadata, nickname, url_img: urlImg } })
        }
      } catch (error) {
        console.error('Error updating user metadata:', error)
        toast.error('프로필 업데이트 중 문제가 발생했습니다.')
      }
    }

    // 비밀번호 수정
    if (newPassword) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (passwordError) {
        console.error('Error updating password:', passwordError)
        toast.error('비밀번호 변경 실패')
      }
    }

    setLoading(false)
  }

  // 회원 탈퇴 처리
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')
    if (!confirmation) return

    setLoading(true)

    try {
      // 1. Supabase의 `users` 테이블에서 사용자 정보 삭제
      const { error: deleteUserError } = await supabase.from('users').delete().eq('id', user.id) // 사용자 ID로 삭제

      if (deleteUserError) {
        console.error('Error deleting user from database:', deleteUserError)
        toast.error('회원 탈퇴에 실패했습니다.')
        setLoading(false)
        return
      }

      // 2. Supabase 인증 시스템에서 사용자 로그아웃
      const { error: logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        console.error('Error logging out:', logoutError)
        toast.error('로그아웃에 실패했습니다.')
      }
      // 3. React Context에서 사용자 정보 초기화
      updateUser(null)

      toast.success('회원 탈퇴가 완료되었습니다.')
      navigate('/')
    } catch (error) {
      // 회원 탈퇴 중 발생한 오류 처리
      console.error('Error during account deletion process:', error)
      toast.error('회원 탈퇴 처리 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileCard>
        <ProfileImageUpload onImageSelect={handleImageSelect} currentImage={urlImg} />

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Label>이메일</Label>
            <Input type="email" value={email} disabled />
          </InputGroup>

          <InputGroup>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={user?.app_metadata.provider === 'google'}
            />
          </InputGroup>

          <InputGroup>
            <Label>새 비밀번호</Label>
            <Input
              ref={newPasswordRef} // 새 비밀번호 입력란에 ref 추가
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>새 비밀번호 확인</Label>
            <Input
              ref={confirmPasswordRef} // 비밀번호 확인 입력란에 ref 추가
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>

          <Button onClick={handleProfileUpdate} disabled={loading}>
            {loading ? '업데이트 중...' : '프로필 업데이트'}
          </Button>
        </Form>

        <DeleteButton onClick={handleDeleteAccount} disabled={loading}>
          {loading ? '탈퇴 중...' : '회원 탈퇴'}
        </DeleteButton>
      </ProfileCard>
    </Container>
  )
}

export default MyPage

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`

const ProfileCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputGroup = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;

  &:disabled {
    background-color: #f1f1f1;
  }

  &:focus {
    border-color: #ddd;
    outline: none;
  }
`

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  width: 360px;
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3c3c3c;
  }

  &:disabled {
    background-color: #4c4c4c;
    cursor: not-allowed;
  }
`

const DeleteButton = styled.button`
  padding: 12px;
  font-size: 16px;
  width: 360px;
  background-color: #ac2828;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }

  &:disabled {
    background-color: #f5b7b1;
    cursor: not-allowed;
  }
`
