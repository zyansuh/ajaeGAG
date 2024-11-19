import React from 'react'

const userForm = ({ userEmail, setUserEmail, userPwd, setUserPwd, handleSubmit, moveSignUP }) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="이메일 : "
        id="email"
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
      />

      <InputField
        label="비밀번호 : "
        id="password"
        type="password"
        value={userPwd}
        onChange={(e) => setUserPwd(e.target.value)}
        placeholder="비밀번호를 입력하세요"
      />

      <button type="submit">로그인</button>
      <button type="button" onClick={moveSignUP}>
        회원가입
      </button>
    </form>
  )
}

export default userForm
