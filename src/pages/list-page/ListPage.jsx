import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ListPage = () => {
  const navigate = useNavigate()

  const goToDetail = (data) => {
    navigate(`/list/${data.id}`)
  }

  const goToUpdate = (e, data) => {
    e.stopPropagation()
    //해당 수정 페이지로 가야할 때 어떻게 찾아가는지?
    // 여기도 추가 링크 필요할 듯
    navigate(`/post/${data.id}`)
  }

  return (
    <>
      <ListContainer>
        {MOCK_DATA.map((data) => (
          <Article key={data.id} onClick={() => goToDetail(data.id)}>
            <Button type="button" onClick={(e) => goToUpdate(e, data.id)}>
              수정
            </Button>
            <h3>
              <h2>{data.name}</h2>
            </h3>
            <section>
              <p>{data.title}</p>
            </section>
          </Article>
        ))}
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
  border: 1px solid #d3d3d3;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;
  margin: 30px;
  font-size: 20px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  h3 {
    display: flex;
    margin-bottom: 20px;
  }

  section {
    font-size: 25px;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    
    h3 {
      font-size: 14px;
    }

    section {
      font-size: 16px;
    }
  }
`

const Button = styled.button`
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px;
  margin-left: auto;
  margin-top: 0;

  &:hover {
    cursor: pointer;
    background-color: #3c3c3c;
  }
`

const MOCK_DATA = [
  {
    id: 1,
    name: '고은채',
    title: '왕이 넘어지면?',
    date: '24-11-18'
  },
  {
    id: 2,
    name: '신상용',
    title: '12345678을 네글자로?',
    date: '24-11-18'
  },
  {
    id: 3,
    name: '예병수',
    title: '호박을 때리는 여자는?',
    date: '24-11-18'
  },
  {
    id: 4,
    name: '류제천',
    title: '바나나가 웃으면?',
    date: '24-11-18'
  },
  {
    id: 5,
    name: '이강민',
    title: '누룽지를 영어로?',
    date: '24-11-18'
  },
  {
    id: 6,
    name: '최원장',
    title: '사과를 한 입 베어먹으면?',
    date: '24-11-18'
  },
  {
    id: 7,
    name: '이세영',
    title: '아홉마리 강아지가 알을 낳으면?',
    date: '24-11-18'
  },
  {
    id: 8,
    name: '김영범',
    title: '너는 진짜 미남이다를 4글자로 줄이면?',
    date: '24-11-18'
  }
]
