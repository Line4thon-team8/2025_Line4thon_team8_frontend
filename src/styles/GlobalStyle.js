import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    background-color: #fff;
    color: #222;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
  }

  #root {
    width: 100%;
    max-width: 1200px; /* 전체 페이지 최대 폭 */
    padding: 0 20px;   /* 좌우 여백 */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
