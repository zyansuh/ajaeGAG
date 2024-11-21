import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import styled from 'styled-components'

import supabase from '../../../supabase/supabaseClient'

import { useUserContext } from '../../../context/userContext'

const CommentForm = ({ modify, setModify }) => {
  const session = useUserContext()

  const { id } = useParams()

  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          user_id: session.user.id,
          post_id: id,
          content
        }
      ])
      .select()

    if (error) {
      toast.error('댓글을 작성할 수 없습니다.')
      return
    }

    setContent('')
    setModify(!modify)
    toast.success('댓글을 작성했습니다.')
    console.log('data', data)
  }

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <CommentFormContainer>
      <form onSubmit={handleSubmit}>
        <CommentFormBox>
          <CommentFormLabel>댓글을 입력하세요.</CommentFormLabel>
          <CommentFormTextArea value={content} onChange={handleChange} placeholder="댓글을 입력하세요!" rows={5} />
          <CommentForSubmitBtn type="submit">제출하기</CommentForSubmitBtn>
        </CommentFormBox>
      </form>
    </CommentFormContainer>
  )
}

export default CommentForm

const CommentFormContainer = styled.div`
  padding: 10px 15px;
`

const CommentFormBox = styled.div`
  margin: 20px 0px;
  position: relative;
`

const CommentFormLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 10px;
`

const CommentFormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 8px;
  outline-color: orange;
  resize: none;
`

const CommentForSubmitBtn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
`
