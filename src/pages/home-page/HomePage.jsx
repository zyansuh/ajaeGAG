import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import supabase from '../../supabase/supabaseClient'

const HomePage = () => {
  const navigate = useNavigate()
  const [joke, setJoke] = useState('') // API에서 가져온 농담 저장
  const [translatedJoke, setTranslatedJoke] = useState('') // 번역된 농담 저장
  const [reviews, setReviews] = useState([]) // Supabase에서 가져온 리뷰 데이터 저장
  const [showAnswers, setShowAnswers] = useState({}) // 특정 리뷰의 답변 표시 여부를 저장하는 상태
  const [data, setData] = useState(null)

  // 농담 가져오는 함수

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json' // JSON 응답 형식 요청
        }
      })
      const data = await response.json()
      setJoke(data.joke) // 농담 상태 업데이트
      translateJoke(data.joke) // 가져온 농담 번역 요청
    } catch (error) {
      console.error('Error fetching joke:', error)
      setJoke('농담을 가져오는 중 오류가 발생했습니다.')
      setTranslatedJoke('')
    }
  }

  // 농담 번역하는 함수
  const translateJoke = async (text) => {
    const apiKey = 'AIzaSyDnXVgSV8caN1mWYHNmfyy0T4_1gR_eXqg' // Google Translate API Key
    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: 'ko' }) // 한국어로 번역
      })
      const data = await response.json()
      setTranslatedJoke(data?.data?.translations?.[0]?.translatedText || '번역 오류가 발생했습니다.')
    } catch (error) {
      console.error('Error translating joke:', error)
      setTranslatedJoke('번역 중 오류가 발생했습니다.')
    }
  }

  // Supabase에서 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          id,
          question,
          created_at,
          users (nickname, url_img)
        `
        )
        .order('created_at', { ascending: false }) // 최신순 정렬

      if (error) throw error
      setReviews(data.slice(0, 6)) // 최대 6개의 리뷰만 저장
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  // 답변 표시/숨기기 토글 함수
  const toggleAnswerVisibility = (id) => {
    setShowAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id] // 해당 리뷰 ID의 답변 표시 여부를 반전
    }))
  }

  // 컴포넌트 로드 시 Supabase 데이터 및 농담 가져오기
  useEffect(() => {
    fetchReviews()
    fetchJoke()
  }, [])

  return (
    <Main>
      {/* Hero 섹션 */}
      <Section>
        <Hero>
          <h1>아재슐랭</h1>
          <p>{translatedJoke || joke || 'AI 추천! 오늘의 아재개그'}</p>
          <button onClick={fetchJoke}>오늘의 AI 추천보기</button>
        </Hero>
      </Section>

      {/* 리뷰 카드 섹션 */}
      <Reviews>
        {reviews.map((review) => (
          <Card key={review.id}>
            {' '}
            {/* 카드 헤더: 사용자 프로필 이미지와 닉네임 */}
            <Header>
              <img src={review.users?.url_img || '/default-avatar.png'} alt="프로필" />
              <span>{review.users?.nickname || '익명'}</span>
            </Header>
            {/* 질문 */}
            <h3>{review.question}</h3>
            {/* 자세히 보기 버튼: Detail Page로 이동 */}
            <button onClick={() => navigate(`/detail/${review.id}`)}>자세히 보기</button>
          </Card>
        ))}
      </Reviews>

      {/* 추가 CTA 섹션 */}
      <CTASection>
        <h2>당신의 아재개그를 뽐내보세요!</h2>
        <button onClick={() => navigate('/post')}>개그 작성하기</button>
      </CTASection>
    </Main>
  )
}

export default HomePage

// ===================
// 스타일 정의
// ===================

const Main = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`

const Section = styled.section`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`

const Hero = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    color: var(--button--color);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--hover--color);
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: var(--logo--color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--hover--color);
    }
  }
`

const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 고정 */
  gap: 1.5rem; /* 카드 간격 */
  margin-top: 2rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
`

const Card = styled.div`
  border: 1px solid var(--border--color); /* 카드 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 콘텐츠를 중앙으로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */

  h3 {
    margin: 0.5rem 0;
    color: var(--button--color);
  }

  p {
    color: var(--hover--color);
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: var(--logo--color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--hover--color);
    }
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  span {
    font-weight: bold;
    color: var(--button--color);
  }
`

const CTASection = styled.div`
  margin-top: 3rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: var(--logo--color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--hover--color);
    }
  }
`
