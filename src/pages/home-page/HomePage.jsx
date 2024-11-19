import styled, { createGlobalStyle } from 'styled-components'

// ===================
// 글로벌 스타일 정의
// ===================
const GlobalStyle = createGlobalStyle`
  /* 기본 스타일 초기화 */
  body {
    margin: 0;
    font-family: Arial, sans-serif; /* 폰트 설정 */
    background-color: #f8f9fa; /* 배경 색상 */
    color: #212529; /* 텍스트 기본 색상 */
    display: flex;
    flex-direction: column; /* 푸터를 아래로 밀기 위한 설정 */
    min-height: 100vh; /* 화면 높이를 최소 높이로 설정 */
  }

  /* 링크 스타일 */
  a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
  }

  /* 박스 모델 초기화 */
  *, *::before, *::after {
    box-sizing: border-box;
  }
`

// ===================
// HomePage 컴포넌트
// ===================

