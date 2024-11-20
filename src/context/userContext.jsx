import { createContext, useContext, useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import supabase from '../supabase/supabaseClient'

const userContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [session, setSession] = useState()

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null)
      } else {
        setSession(session)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <userContext.Provider value={session}>{children}</userContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(userContext)

  if (!context) {
    toast.warning('콘테스트 내부에서만 사용이 가능합니다.')
  }

  return context
}
