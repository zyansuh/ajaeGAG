import { useEffect, useState } from "react";
import styled from "styled-components"
import { createClient } from '@supabase/supabase-js';

const UpdatePage = () => {


  // 본인 것 사용하기
  const supabaseUrl = 'https://flbaynnqwzzeweliqljp.supabase.co'; 
  // vite에서 env 사용하는 법
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsYmF5bm5xd3p6ZXdlbGlxbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTA1MDAsImV4cCI6MjA0NzQ4NjUwMH0.mmsWEYRFehZLotB8v8OcIuzX8vR2gynr1sD3q47wf5U"; 
  const supabase = createClient(supabaseUrl, supabaseKey);
  


  const [post, setPost] = useState([]);
  // input에 입력한 값을 저장하는 state
  const [titleName, setTitleName] = useState("");
  const [correct, setCorrect] = useState("");
  
  const [editingTitle, setEditingTitle] = useState(0);
  const [editingCorrect, setEditingCorrect] = useState(0);
  // 수정할 국가 id
  const [editingId, setEditingId] = useState(null);



	// useEffect 내에서 외부 데이터 조회 (API 요청)
  useEffect(() => {
    const fetchPost = async () => {
	    // supabase 데이터베이스에서 Post 테이블 조회
      const { data, error } = await supabase.from("post").select("*");

      if (error) {
        return alert(error.message);
      }
      // 성공 시 데이터를 Post state에 저장 
      setPost(data);
    };  
    // 함수 실행
    fetchPost(); 
  }, []); // 한 번만 실행하도록 dependency array 를 빈 배열로 둠

//추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("post")
      .insert({ title: titleName, correct })
      .select();
    if (error) {
      return alert(error.message);
    }
    setPost([...post, ...data]);
  
  };

	// countryName state 변경 함수
  const handleTitleNameChange = (e) => {
    setTitleName(e.target.value);
  };

	// Correct state 변경 함수
  const handleCorrectChange = (e) => {
    setCorrect(e.target.value);
  };




// 수정
const handleEditClick = (post) => {
  setEditingId(post.id);
  setEditingTitle(post.title)
  setEditingCorrect(post.correct);
};

const handleCancelEdit = () => {
  setEditingId(null);
  setEditingTitle(null);
  setEditingCorrect(null);
};

const handleEditCorrectChange = (e) => {
  setEditingCorrect(e.target.value);
};
const handleEditTitleChange = (e) => {
  setEditingTitle(e.target.value);
};

const handleSaveEdit = async () => {
  const { data, error } = await supabase
    .from("post")
    .update({ correct: editingCorrect })
    .eq("id", editingId)
    .select();
  if (error) {
    return alert(error.message);
  }
  setPost(
    post.map((post) => (post.id === editingId ? data[0] : post))
  );
  setEditingId(null);
  setEditingCorrect(null);
};




// 삭제
const handleDeleteClick = async (id) => {
  const { error } = await supabase.from("post").delete().eq("id", id);
  if (error) {
    return alert(error.message);
  }
  setPost(post.filter((post) => post.id !== id));
};








  return ( <div>
    <PostForm onSubmit={handleSubmit}>
      <PostUl>
          {post.map((post) => (
            <PostLi key={post.id}>
              <div>이름: {post.title}</div>
              {editingId === post.id ? (
                <>
                <PostInput
                    type="text"
                    value={editingTitle}
                    onChange={handleEditTitleChange}
                  />
                  <PostInput
                    type="text"
                    value={editingCorrect}
                    onChange={handleEditCorrectChange}
                  />
                  <PostBtn onClick={handleSaveEdit}>저장</PostBtn>
                  <PostBtn onClick={handleCancelEdit}>취소</PostBtn>
                </>
              ) : (
                <>
                  <div>인구: {post.correct}</div>
                  <PostBtn onClick={() => handleEditClick(post)}>수정</PostBtn>
                  <PostBtn onClick={() => handleDeleteClick(post.id)}>
                    삭제
                  </PostBtn>
                </>
              )}
            </PostLi>
          ))}
        </PostUl>
      {/* <PostUl>
        <PostLi key={post.id}>
      <label htmlFor="title"> 제목  </label>
      <PostInput 
      type="text" 
      placeholder={post.title}
      size={150} 
      value={editingCorrect}
      onChange={handleEditCorrectChange}/>
      </PostLi>
      <PostLi>
      <label htmlFor="answer"> 정답  </label>
      <PostInput 
      type="text" 
      size={150}
      value={editingCorrect}
      onChange={handleEditCorrectChange}
      />
      </PostLi>
      </PostUl>
      <PostBtn type="submit">수정하기</PostBtn> */}
    </PostForm>



 </div>
  )
}

export default UpdatePage


const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto; /* 중앙 정렬 */
  width: 100%;
  max-width: 600px; /* 최대 너비 고정 */
  gap: 20px; /* 항목 간격 */
  padding: 20px;
  
`;

const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 리스트 항목 간격 */
  width: 100%;
`;

const PostLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 항목이 가득 차도록 */
`;

const PostInput = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%; /* 입력 필드의 너비를 부모에 맞춤 */
  font-size: 16px; /* 가독성을 위한 폰트 크기 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 5px;
  box-sizing: border-box; /* 패딩 포함 크기 */
`;

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
`;