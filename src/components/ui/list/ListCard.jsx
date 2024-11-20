import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import changeTime from '../../../utils/changeTime'
import supabase from '../../../supabase/supabaseClient'

const ListCard = ({ post }) => {
  const navigate = useNavigate()

  const goToDetail = (post) => {
    navigate(`/list/${post.id}`)
  }

  const goToUpdate = (e, post) => {
    e.stopPropagation()
    navigate(`/post/${post.id}`)
  }

  const currentUser = supabase.users?.id

  return (
    <CardContainer key={post.id} onClick={() => goToDetail(post)}>
      {currentUser === post.users.id && <Button onClick={(e) => goToUpdate(e, post)}>수정</Button>}
      <NameContainer>
        <Name>{post.users.nickname}</Name>
        <Date>({changeTime(post.created_at)})</Date>
      </NameContainer>
      <Title>{post.question}</Title>
    </CardContainer>
  )
}

export default ListCard

const CardContainer = styled.div`
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
    width: 400px;
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
