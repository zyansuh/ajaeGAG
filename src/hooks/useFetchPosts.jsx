import { useState } from 'react'
import supabase from '../supabase/supabaseClient'

const useFetchPosts = () => {
  const [data, setData] = useState([]) // 데이터 상태
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터 여부
  const limit = 4 // 한 번에 가져올 데이터 수

  const fetchData = async () => {
    if (loading || !hasMore) return

    setLoading(true)

    const { data: newData, error } = await supabase
      .from('posts')
      .select('*, users(nickname, id)') // 전체 데이터 개수를 포함하여 반환한다.
      .range(data.length, data.length + limit - 1) // 데이터 범위 지정
      .order('created_at', { ascending: false }) // 최신 순으로 정렬하기
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setData((prevData) => [...prevData, ...newData]) // 기존 데이터에 새로운 데이터 추가
      if (newData.length > 0) {
        setHasMore(true)
      } else {
        setHasMore(false) // 데이터가 없으면 더 이상 데이터를 불러오지 않도록 설정한다.
      }
    }
    setLoading(false)
  }

  return { data, loading, hasMore, fetchData }
}

export default useFetchPosts
