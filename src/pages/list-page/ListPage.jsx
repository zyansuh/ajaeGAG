import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import changeTime from '../../utils/changeTime'
import { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useInView } from 'react-intersection-observer'

const ListPage = () => {
  const [data, setData] = useState([]) // 데이터 상태
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터 여부
  const limit = 4 // 한 번에 가져올 데이터 수
  const navigate = useNavigate()

  const goToDetail = (post) => {
    navigate(`/list/${post.id}`)
  }

  const goToUpdate = (e, post) => {
    e.stopPropagation()
    navigate(`/post/${post.id}`)
  }

  const fetchData = async () => {
    if (loading || !hasMore) return // 로딩 중이거나 더 이상 불러올 데이터가 없으면 반환

    setLoading(true)

    const { data: newData, error } = await supabase
      .from('posts')
      .select('*, users(nickname, id)') // 전체 데이터 개수를 포함하여 반환
      .range(data.length, data.length + limit - 1) // 데이터 범위 지정
      .order('created_at', { ascending: false }) // 최신 순으로 정렬
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setData((prevData) => [...prevData, ...newData]) // 기존 데이터에 새로운 데이터 추가
      // 데이터가 더 이상 없다면 hasMore를 false로 설정
      if (newData.length > 0) {
        setHasMore(true) // newData.length 추가
      } else {
        setHasMore(false) // 데이터가 없으면 더 이상 데이터를 불러오지 않도록 설정
      }
    }
    setLoading(false)
  }
  // useInView 훅을 사용하여 마지막 요소가 화면에 들어왔을 때 추가 데이터를 불러오기
  const { ref: lastElementRef, inView } = useInView({
    triggerOnce: false, // 여러 번 트리거할 수 있도록 설정
    threshold: 1.0, // 화면 하단 80%까지 스크롤이 내려가면 호출
    onChange: (inView) => {
      // inView가 true일 때만 데이터를 불러오기
      // console.log(inView, hasMore)
      // console.log('trigger됨')
      if (inView && !loading && hasMore) {
        fetchData() // 화면에 마지막 요소가 보이면 fetchData 호출
      }
    }
  })

  useEffect(() => {
    // inView가 true일 때만 데이터를 불러오기
    if (inView && !loading && hasMore) {
      fetchData() // 화면에 마지막 요소가 보이면 fetchData 호출
    }
  }, [inView, loading, hasMore])

  if (loading && data.length === 0) return <p>Loading...</p>

  // supabase.users 값이 null 이나 undefined 일 경우 오류 발생할 수 있다.
  // ? 요렇게 해야 오류를 방지하고 안전하게 가져온다.
  const currentUser = supabase.users?.id

  return (
    <>
      <ListContainer>
        {data.map((data) => (
          <Article key={data.id} onClick={() => goToDetail(data)}>
            {currentUser === data.users.id && <Button onClick={(e) => goToUpdate(e, data)}>수정</Button>}
            <NameContainer>
              <Name>{data.users.nickname}</Name>
              <Date>({changeTime(data.created_at)})</Date>
            </NameContainer>
            <Title>{data.question}</Title>
          </Article>
        ))}
        <div ref={lastElementRef}></div>
        {loading && <Loading>Loading more...</Loading>} {/* 추가 데이터 로딩 중 표시 */}
      </ListContainer>
    </>
  )
}

export default ListPage

const ListContainer = styled.div`
  padding: 20px;
`

const Article = styled.div`
  width: 800px;
  height: 200px;
  border: 1px solid var(--border--color);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: flex-start;
  margin: 50px;
  font-size: 20px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const NameContainer = styled.div`
  display: flex;
`

const Name = styled.h3`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Date = styled.h3`
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const Button = styled.button`
  background-color: var(--button--color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-left: auto;
  margin-top: 0;

  &:hover {
    cursor: pointer;
    background-color: var(--hover--color);
  }
`

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
  color: black;
  margin: 20px 0;
`
