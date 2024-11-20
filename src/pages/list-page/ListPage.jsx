import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import ListCard from '../../components/ui/list/ListCard'
import ListLoading from '../../components/ui/list/ListLoading'
import useFetchPosts from '../../hooks/useFetchPosts'

const ListPage = () => {
  const { data, loading, hasMore, fetchData } = useFetchPosts()
  // useInView 훅을 사용하여 마지막 요소가 화면에 들어왔을 때 추가 데이터를 불러오기
  const { ref: lastElementRef, inView } = useInView({
    triggerOnce: false, // 여러 번 트리거할 수 있도록 설정한다.
    threshold: 1.0 // 화면 하단 100%까지 스크롤이 내려가면 호출
  })

  useEffect(() => {
    // inView가 true일 때만 데이터를 불러온다.
    if (inView && !loading && hasMore) {
      fetchData()
    }
  }, [inView, loading, hasMore])

  if (loading && data.length === 0) return <p>Loading...</p>

  return (
    <>
      <ListContainer>
        {data.map((post) => (
          <ListCard key={post.id} post={post} />
        ))}
        <ListLoading loading={loading} />
        <div ref={lastElementRef}></div>
      </ListContainer>
    </>
  )
}

export default ListPage

const ListContainer = styled.div`
  padding: 20px;
`
