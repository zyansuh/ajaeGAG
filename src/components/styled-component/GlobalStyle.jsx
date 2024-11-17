import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        //색상,폰트 정의하기
        --logo--color: #ac2828;
    }
`;

export default GlobalStyle;