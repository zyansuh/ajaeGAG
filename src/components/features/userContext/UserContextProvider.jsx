import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import supabase from '../../../supabase/supabaseClient'

// Context 생성
const UserContext = createContext(null)

// Context Provider 컴포넌트
export const UserContextProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 로그인 상태 변화 감지
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
      } else {
        setSession(session)
        setUser(session?.user)
      }
    })

    return () => {
      // 컴포넌트가 언마운트될 때 구독 취소
      subscription.unsubscribe()
    }
  }, [])

  const updateUser = (newUser) => {
    setUser(newUser)
    console.log(newUser)
  }

  return <UserContext.Provider value={{ session, user, setUser, updateUser }}>{children}</UserContext.Provider>
}

// Custom Hook: Context 사용을 쉽게 하기 위한 hook
export const useUserContext = () => {
  const context = useContext(UserContext)

  // Context가 없을 경우 warning
  if (!context) {
    toast.warning('UserContext 내부에서만 사용이 가능합니다.')
    return null
  }

  return context
}
