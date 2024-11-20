import { useEffect, useState } from 'react'
import styled from 'styled-components'
import supabase from '../../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'

const PostPage = () => {
  const [post, setPost] = useState([])
  // input에 입력한 값을 저장하는 state
  const [titleName, setTitleName] = useState('')
  const [correct, setCorrect] = useState('');
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  


  useEffect(() => {
    const fetchPost = async () => {
      // 유저 정보 가져오기
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("유저 정보를 가져오는 중 에러 발생:", userError.message);
        return;
      }
  
      if (userData && userData.user && userData.user.id) {
        const userId = userData.user.id;
        setUserId(userId); // 유저 ID 설정
        console.log("Fetched User ID:", userId); // 디버깅용
  
        // user_id로 Post 데이터 조회
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", userId);
  
        if (postsError) {
          console.error("Post 데이터를 가져오는 중 에러 발생:", postsError.message);
          return;
        }
  
        setPost(postsData); // Post 데이터 저장
        console.log("Fetched Posts:", postsData); // 디버깅용
      } else {
        console.warn("유효한 유저가 없습니다. 로그인 상태를 확인하세요.");
      }
    };
  
    fetchPost();
  }, []); // 한 번만 실행
  

  //추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("User ID:", userId); // 디버깅용: userId 확인

  if (!userId || userId.trim() === "") {
    return alert("유효한 유저 ID가 없습니다. 다시 로그인하세요.");
  }
    const { data, error } = await supabase
      .from("posts")
      .insert({ question: titleName, answer:correct , user_id: userId})
      .select();
    if (error) {
      return alert(error.message)
    }
    setPost([...post, ...data])
    navigate(`/list`)
    
  }

  // countryName state 변경 함수
  const handleTitleNameChange = (e) => {
    setTitleName(e.target.value)
  }

  // Correct state 변경 함수
  const handleCorrectChange = (e) => {
    setCorrect(e.target.value)
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit}>
        <PostUl>
          <PostLi>
            <label htmlFor="title"> 제목 </label>
            <PostInput
              type="text"
              placeholder="당신의 개그를 입력하세요"
              size={150}
              value={titleName}
              onChange={handleTitleNameChange}
            />
          </PostLi>
          <PostLi>
            <label htmlFor="answer"> 정답 </label>
            <PostInput
              type="text"
              placeholder="당신의 개그에 정답을 입력하세요"
              size={150}
              value={correct}
              onChange={handleCorrectChange}
            />
          </PostLi>
        </PostUl>
        <PostBtn type="submit">제출하기</PostBtn>
      </PostForm>
    </div>
  )
}

export default PostPage

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto; /* 중앙 정렬 */
  width: 100%;
  max-width: 600px; /* 최대 너비 고정 */
  gap: 20px; /* 항목 간격 */
  padding: 20px;
`

const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 리스트 항목 간격 */
  width: 100%;
`

const PostLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 항목이 가득 차도록 */
`

const PostInput = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%; /* 입력 필드의 너비를 부모에 맞춤 */
  font-size: 16px; /* 가독성을 위한 폰트 크기 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 5px;
  box-sizing: border-box; /* 패딩 포함 크기 */
`

const PostBtn = styled.button`
  width: 100%; /* 버튼이 폼 너비를 채우도록 */
  max-width: 200px; /* 버튼의 최대 너비 제한 */
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: black; /* 파란색 버튼 */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #464748; /* 어두운 파란색으로 변경 */
  }

  &:active {
    background-color: #898f91; /* 더 어두운 색상 */
  }
`
