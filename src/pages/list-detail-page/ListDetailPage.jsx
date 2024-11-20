import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import supabase from '../../supabase/supabaseClient'

import Comment from '../../components/ui/detail/Comment'
import DetailPost from '../../components/ui/detail/DetailPost'
import CommentForm from '../../components/features/detail/CommentForm'

const ListDetailPage = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [modify, setModify] = useState(false)

  useEffect(() => {
    console.log('이펙트 실행')
    const getPostData = async () => {
      try {
        setLoading(true)
        const { data, error: supabaseError } = await supabase
          .from('posts')
          .select('*, comments(*, users(*)), likes(*), users(*)')
          .eq('id', id)

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
  }, [id, modify])

  if (error) {
    return <div>에러 발생</div>
  }

  if (loading) {
    return <div>로딩 중</div>
  }

  return (
    <ListDetailContainer>
      <ListDetailPostContainer>
        {post ? (
          post.map((postItem) => <DetailPost key={postItem.id} postItem={postItem} />)
        ) : (
          <ListDetailNoContent>등록된 데이터가 없습니다.</ListDetailNoContent>
        )}
      </ListDetailPostContainer>

      <CommentForm modify={modify} setModify={setModify} />

      <ListDetailCommentContainer>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} modify={modify} setModify={setModify} />
          ))
        ) : (
          <ListDetailNoContent>등록된 댓글이 없습니다. 댓글을 입력하세요</ListDetailNoContent>
        )}
      </ListDetailCommentContainer>
    </ListDetailContainer>
  )
}

export default ListDetailPage

const ListDetailContainer = styled.div`
  width: 100%;
`

const ListDetailCommentContainer = styled.div`
  margin-top: 50px;
`

const ListDetailPostContainer = styled.div`
  margin-bottom: 100px;
`
const ListDetailNoContent = styled.p`
  text-align: center;
  letter-spacing: 1px;
`
