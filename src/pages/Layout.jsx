import styled from "styled-components";
import Header from "../components/Layouts/Header";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet /> {/* 여기에 각 페이지가 들어감 */}
      </Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  padding-top: 90px; /* Header 높이만큼 여백 */
  min-height: calc(100vh - 180px); /* Header+Footer 제외 영역 */
`;
