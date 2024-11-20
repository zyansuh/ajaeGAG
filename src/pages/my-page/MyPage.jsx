import { useEffect, useState } from 'react'
import supabase from '../../supabase/supabaseClient'

const MyPage = () => {
  const [user, setUser] = useState()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = supabase.auth.user()

      console.log(user)

      if (user) {
        setUser(user)
        const { data, error } = await supabase
          .from('users')
          .select('nickname, email, url_img')
          .eq('id', user.id)
          .single()
      }
    }

    fetchUserProfile()
  }, [])

  return <div>My Page</div>
}

export default MyPage
