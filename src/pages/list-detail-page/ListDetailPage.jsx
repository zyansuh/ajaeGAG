// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

// import supabase from '../../suapbase/supabaseClient'
import useFetchDetail from '../../hooks/useFetchDetail'

import Comment from '../../components/ui/detail/Comment'
import DetailPost from '../../components/ui/detail/DetailPost'
import CommentForm from '../../components/features/detail/CommentForm'

const ListDetailPage = () => {
  // dev 시에 사용
  const { id } = useParams()

  const { loading, error, post, comments } = useFetchDetail(id)

  const ListDetailPage = () => {
    const { id } = useParams();
  
    return <div>상세 페이지 ID: {id}</div>;
  };

  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')
  // const [post, setPost] = useState([])
  // const [comments, setComments] = useState([])

  // useEffect(() => {
  //   const getPostData = async () => {
  //     try {
  //       setLoading(true)
  //       const { data, error: supabaseError } = await supabase
  //         .from('posts')
  //         .select('*, comments(*, users(*)), likes(*), users(*)')
  //         .eq('id', '2f891c85-d1e0-4004-8bb2-19eac02aa3c6') //id 값으로 변경해서 확인

  //       if (supabaseError) {
  //         setError(supabaseError)
  //         return
  //       }

  //       setPost(data)
  //       setComments(data[0].comments)
  //       console.log(data)
  //       console.log('post', post)
  //       console.log('comments', comments)
  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   getPostData()
  // }, [])

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
          <p>등록된 데이터가 없습니다.</p>
        )}
      </ListDetailPostContainer>

      <CommentForm />

      <ListDetailCommentContainer>
        {comments ? (
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
          <p>등록된 댓글이 없습니다. 댓글을 입력하세요</p>
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
