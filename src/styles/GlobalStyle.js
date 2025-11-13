import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    //border : 1px solid;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
    background-color: #F4F4F5;
    color: #222;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
  }

  #root {
    width: 100%;
    max-width: 1440px; /* 전체 페이지 최대 폭 */
    padding: 0 0;   /* 좌우 여백 */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
