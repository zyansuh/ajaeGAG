import styled from 'styled-components'

import changeTime from '../../../utils/changeTime'

const Comment = ({ comment }) => {
  const handleDeleteComment = async () => {}

  return (
    <CommentContainer>
      <CommentInforContainer>
        <CommentInfoBox>
          <CommentProfile src={comment.users.url_img ? comment.users.url_img : null} alt="comment user profile" />
          <div>
            <CommentUserName>{comment.users.nickname ? comment.users.nickname : comment.users.email}</CommentUserName>
            <CommentDate>{changeTime(comment.created_at)}</CommentDate>
          </div>
        </CommentInfoBox>
        <CommentBtnGroup>
          <button>수정</button>
          <button onClick={() => handleDeleteComment()}>삭제</button>
        </CommentBtnGroup>
      </CommentInforContainer>
      <CommentContent>{comment.content}</CommentContent>
    </CommentContainer>
  )
}

export default Comment

const CommentContainer = styled.div`
  background: #f1f1f1;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin: 20px 0px;
`

const CommentInforContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`
const CommentContent = styled.p`
  margin-top: 20px;
  padding: 10px 15px;
`

const CommentProfile = styled.img`
  width: 35px;
  height: 35px;
  background: orange;
  border-radius: 50%;
`

const CommentUserName = styled.p`
  font-weight: 500;
`

const CommentDate = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #9b9b9b;
  margin-top: 5px;
`

const CommentInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CommentBtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
