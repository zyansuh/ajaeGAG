import React, { useState, useEffect } from 'react'
import supabase from '../../supabase/supabaseClient'
import ProfileImageUpload from '../../components/features/login/ProfileImageUpload'
import { toast } from 'react-toastify'

function MyPage() {
  const [user, setUser] = useState(null)
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [newPassword, setNewPassword] = useState('') // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('') // 새 비밀번호 확인
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser() // Supabase Auth에서 현재 사용자 정보 가져오기

      console.log(user)
      if (user) {
        setUser(user) // 유저 설정
        setEmail(user.email) //유저의 이메일을 설정

        // 구글 로그인 사용자인 경우 nickname, email을 구글에서 가져오기
        if (user.user?.provider === 'google') {
          setNickname(user.user_metadata.name) // 구글 로그인 시 displayName을 nickname으로 사용
        } else {
          const { data } = await supabase.from('users').select('nickname, email, url_img').eq('id', user.id)

          if (data) {
            setNickname(data.nickname || user.user_metadata.name)
            setEmail(data.email) // 이메일은 수정할 수 없도록
            setUrlImg(data.url_img)
          }
        }
      }
    }

    fetchUserProfile()
  }, [])

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
    }
  }

  // 프로필 정보 업데이트
  const handleProfileUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast('비밀번호가 일치하지 않습니다.')
      return
    }
    const {
      data: { user }
    } = await supabase.auth.getUser()
    setLoading(true)

    if (!user) return
    // 이메일 또는 닉네임 업데이트
    const { error } = await supabase.from('users').update({ nickname, url_img: urlImg }).eq('id', user.id)

    if (error) {
      console.error('Error updating profile:', error)
    } else {
      toast('프로필이 업데이트되었습니다.')
    }

    // 비밀번호 수정
    if (newPassword) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (passwordError) {
        console.error('Error updating password:', passwordError)
      } else {
        toast('비밀번호가 변경되었습니다.')
      }
    }

    setLoading(false)
  }

  if (!user) {
    return <div>로딩 중...</div>
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* 프로필 이미지 업로드 */}
        <ProfileImageUpload onImageSelect={handleImageSelect} />

        <div>
          <label>이메일</label>
          <input type="email" value={email} disabled />
        </div>

        <div>
          <label>닉네임</label>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>

        <div>
          <label>새 비밀번호</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <div>
          <label>새 비밀번호 확인</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button onClick={handleProfileUpdate} disabled={loading}>
          {loading ? '업데이트 중...' : '프로필 업데이트'}
        </button>
      </form>
    </div>
  )
}

export default MyPage
