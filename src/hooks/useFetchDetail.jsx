import { useEffect, useState } from 'react'

import supabase from '../supabase/supabaseClient'

const useFetchDetail = (id) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true)
        const { data, error: supabaseError } = await supabase
          .from('posts')
          .select('*, comments(*, users(*)), likes(*), users(*)')
          .eq('id', id) //id 값으로 변경해서 확인

        if (supabaseError) {
          setError(supabaseError)
          return
        }

        setPost(data)
        setComments(data[0].comments)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getPostData()
  }, [id])

  return { loading, error, post, comments }
}

export default useFetchDetail
