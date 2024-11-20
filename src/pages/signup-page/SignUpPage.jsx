import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileImageUpload from '../../components/common/ProfileImageUpload'
import { toast } from 'react-toastify'
import supabase from '../../supabase/supabaseClient'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassWord] = useState('')
  const [nickname, setNickName] = useState('')
  const [img, setImg] = useState()
  const [user, setUser] = useState()

  const handleImageSelect = (file) => {
    setImg(file)
  }

  //auth에 회원가입을 하기 위한 코드
  const signUpNewUser = async (e) => {
    e.preventDefault()

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

    console.log(data)

    // 이미지 업로드 처리
    let profileImageUrl = ''
    if (img) {
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
      profileImageUrl = supabase.storage.from('avatars').getPublicUrl(filePath).publicURL
    }

    //users table에 회원가입을 하기 위한 코드
    const { data: userData, error: dbError } = await supabase.from('users').insert({
      email: data.user.user_metadata.email,
      id: data.user.id,
      nickname: nickname,
      url_img: profileImageUrl
    })

    if (dbError) {
      console.log(dbError)
      return
    }

    setUser(userData) // userData 저장
    navigate('/login') // 회원가입 완료 후 로그인 페이지로 이동
    toast.success('회원가입이 완료되었습니다.!')
  }

  // user가 없을때 회원가입이 가능하도록 설정
  if (!user) {
    return (
      <div>
        <h1>회원가입 페이지 입니다.</h1>
        <form onSubmit={signUpNewUser}>
          <ProfileImageUpload onImageSelect={handleImageSelect} />

          <div>
            <label>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label>비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label>비밀번호확인</label>
            <input type="password" value={checkPassword} onChange={(e) => setCheckPassWord(e.target.value)} />
          </div>

          <div>
            <label>닉네임</label>
            <input type="text" value={nickname} onChange={(e) => setNickName(e.target.value)} />
          </div>

          <button type="submit">가입하기</button>
        </form>
      </div>
    )
  }
}
export default SignUpPage
