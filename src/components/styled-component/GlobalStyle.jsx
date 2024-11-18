import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}



    :root {
        //색상,폰트 정의하기
        --logo--color: #ac2828;
    }

    * {
        // box sizing 리셋하기
    box-sizing: border-box;
  }

`

export default GlobalStyle
