import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import styled from 'styled-components'

import supabase from '../../../supabase/supabaseClient'

import { useUserContext } from '../../../context/userContext'

import changeTime from '../../../utils/changeTime'

const DetailPost = ({ postItem }) => {
  const { user } = useUserContext()

  console.log(postItem)
  const [likesCount, setLikesCount] = useState(postItem.likes.length)
  const [isLiked, setIsLiked] = useState(false)

  // console.log(session)
  // provider로 현재 유저정보 가져오기
  const navigate = useNavigate()

  // 포스트 삭제
  const handleDeletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      toast.warning('데이터를 삭제할 수 없습니다. 다시 시도 해주세요.')
      return
    }

    toast.success('포스트를 정상적으로 삭제 했습니다.')
    navigate('/list')
  }

  useEffect(() => {
    const getLikedData = async () => {
      // 해당글에 있는 좋아요 배열을 모두 가져옴
      const { data, error } = await supabase.from('likes').select('*').eq('post_id', postItem.id)

      if (error) {
        toast.error('에러가 발생했습니다.')
      }

      // 현재 유저와 게시글에 좋아요를 누른 유저가 있는지 여부 확인
      const isSameUser = data.some((like) => like.user_id === user.id)

      setIsLiked(isSameUser)
    }

    getLikedData()
  }, [postItem.id, user.id])

  // 좋아요 추가
  const handlePostLike = async (id) => {
    const { error } = await supabase.from('likes').select('*')

    if (error) throw error

    if (isLiked) {
      const { error } = await supabase.from('likes').delete().eq('user_id', user.id)

      if (error) {
        toast.error('좋아요를 취소할 수 없습니다.')
      }

      setLikesCount((pre) => pre - 1)
      setIsLiked(false)
      toast.success('좋아요를 취소했습니다.')
    } else {
      const { error } = await supabase
        .from('likes')
        .insert([
          {
            user_id: user.id,
            post_id: id,
            created_at: new Date()
          }
        ])
        .select()

      if (error) {
        toast.error('게시글에 좋아요를 누를 수 없습니다.')
      }

      setIsLiked(true)
      setLikesCount((pre) => pre + 1)
      toast.success('게시글에 좋아요를 눌렀습니다!')
    }
  }

  return (
    <DetailPostContainer>
      <DetailPostTitleContainer>
        <DetailPostTitle>{postItem.question}</DetailPostTitle>
        <DetailPostBtnGroup>
          {postItem.user_id === user.id && (
            <>
              <button onClick={() => navigate(`/post/${postItem.id}`)}>수정</button>
              <button onClick={() => handleDeletePost(postItem.id)}>삭제</button>
            </>
          )}
        </DetailPostBtnGroup>
      </DetailPostTitleContainer>
      <DetailPostUersContainer>
        <DetailPostUserImg src={postItem.users.url_img ? postItem.users.url_img : null} alt="user Profile" />
        <DetailPostUserName>
          {postItem.users.nickname ? postItem.users.nickname : postItem.users.email}
        </DetailPostUserName>
        <DetailPostDate>{changeTime(postItem.created_at)}</DetailPostDate>
      </DetailPostUersContainer>
      <DetailPostAnswerContainer>
        <DetailPostAnswer>{postItem.answer}</DetailPostAnswer>
        <div>
          <DetailPostLikeBtn onClick={() => handlePostLike(postItem.id)}>
            <Like />
            <DetailPostLikeCount>{likesCount}</DetailPostLikeCount>
          </DetailPostLikeBtn>
        </div>
      </DetailPostAnswerContainer>
    </DetailPostContainer>
  )
}

export default DetailPost

const DetailPostContainer = styled.div`
  margin-top: 100px;
  padding: 10px 15px;
`

const DetailPostTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DetailPostTitle = styled.h3`
  font-size: 50px;
  font-weight: 500;
  letter-spacing: 1px;
  word-break: keep-all;
`

const DetailPostBtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const DetailPostUersContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const DetailPostUserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: orange;
`

const DetailPostUserName = styled.p`
  font-weight: 500;
`

const DetailPostDate = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #a1a1a1;
`

const DetailPostAnswerContainer = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DetailPostAnswer = styled.p`
  font-size: 40px;
  letter-spacing: 1px;
`

const DetailPostLikeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid;
  outline: none;
  background: inherit;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
`

const DetailPostLikeCount = styled.span`
  font-size: 20px;
  font-weight: 500;
`

const Like = () => {
  return (
    <svg
      fill="#000000"
      height="50px"
      width="50px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194
		s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38
		C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64
		c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484
		c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8
		s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8
		s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452
		c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295
		c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64
		c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947
		c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194
		c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631
		c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032
		c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079
		C482.323,308.985,475.927,319.848,465.561,325.727z"
        />
        <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z" />
        <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z" />
        <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z" />
        <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z" />
      </g>
    </svg>
  )
}
