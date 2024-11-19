import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabaseClient'
import ProfileImageUpload from '../../components/common/ProfileImageUpload'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [img, setImg] = useState()
  const [user, setUser] = useState()

  const handleImageSelect = (file) => {
    setImg(file)
  }

  //auth에 회원가입을 하기 위한 코드
  const signUpNewUser = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName
        }
      }
    })
    if (error) {
      console.log(error)
    }

    console.log(data)

    // 이미지 업로드 처리
    let profileImageUrl = ''
    if (img) {
      // Supabase Storage에 이미지 업로드
      const fileExt = img.name.split('.').pop()
      const filePath = `profile-images/${data.user.id}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars') // 'avatars'는 파일이 저장될 버킷 이름
        .upload(filePath, img)

      if (uploadError) {
        console.log(uploadError)
        return
      }

      // 업로드된 이미지 URL 가져오기
      profileImageUrl = supabase.storage.from('avatars').getPublicUrl(filePath).publicURL
    }

    //users table에 회원가입을 하기 위한 코드
    const { data: userData, error: dbError } = await supabase.from('users').insert({
      email: data.user.email,
      user_id: data.user.id,
      user_name: data.user.user_metadata.user_name
    })

    if (dbError) {
      console.log(dbError)
      return
    }

    setUser(userData) // userData 저장
    navigate('/login') // 회원가입 완료 후 로그인 페이지로 이동
  }

  // user가 없을때 회원가입이 가능하도록 설정
  if (!user) {
    return (
      <div>
        <h1>회원가입 페이지 입니다.</h1>
        <form onSubmit={signUpNewUser}>
          <ProfileImageUpload onImageSelect={handleImageSelect} />

          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label>name :</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>

          <button type="submit">가입하기</button>
        </form>
      </div>
    )
  }
}
export default SignUpPage
