import { createGlobalStyle } from 'styled-components'

import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
      //색상,폰트 정의하기
      --logo--color: #ac2828;
      --nav--color: #fcca02;
      --button--color: #2C2C2C;
      --hover--color: #3c3c3c;
      --border--color: #d3d3d3;
  }
  
@font-face {
    font-family: 'KCC-Ahnchangho';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/KCC-Ahnchangho.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  * {
    // box sizing 리셋하기
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`

export default GlobalStyle
