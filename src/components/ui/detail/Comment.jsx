import styled from 'styled-components'

import changeTime from '../../../utils/changeTime'
import supabase from '../../../supabase/supabaseClient'
import { toast } from 'react-toastify'
import { useUserContext } from '../../../context/userContext'
import { useState } from 'react'

const Comment = ({ comment, modify, setModify }) => {
  const session = useUserContext()

  const [commentModify, setCommnetModify] = useState(false)
  const [modifyContent, setModifyContent] = useState('')

  const handleDeleteComment = async (id) => {
    const { error } = await supabase.from('comments').delete().eq('id', id)

    if (error) {
      toast.error('댓글을 삭제할 수 없습니다.')
    }

    setModify(!modify)
    toast.success('성공적으로 댓글을 삭제했습니다.')
  }

  // 수정 여부
  const handleModifyComnnet = () => {
    setCommnetModify(true)
  }

  // 수정 업데이트
  const commentUpdate = async (id) => {
    const { error } = await supabase.from('comments').update({ content: modifyContent }).eq('id', id).select()

    if (error) {
      toast.error('댓글을 수정할 수 없습니다.')
    }

    setModify(!modify)
    toast.success('댓글을 수정 했습니다.')
    setCommnetModify(false)
  }

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
          {session.user.id === comment.user_id && (
            <>
              {!commentModify && <button onClick={handleModifyComnnet}>수정</button>}
              <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
            </>
          )}
        </CommentBtnGroup>
      </CommentInforContainer>
      {commentModify ? (
        <CommentModifyContainer>
          <CommentModifyInput type="text" onChange={(e) => setModifyContent(e.target.value)} />
          <CommentModifyBtn onClick={() => commentUpdate(comment.id)} disabled={modifyContent ? false : true}>
            수정하기
          </CommentModifyBtn>
        </CommentModifyContainer>
      ) : (
        <CommentContent>{comment.content}</CommentContent>
      )}
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

const CommentModifyContainer = styled.div`
  position: relative;
  margin-top: 20px;
`

const CommentModifyInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 8px;
  padding-left: 10px;
`

const CommentModifyBtn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 6px;
  background: orange;
  color: white;
  cursor: pointer;
`
