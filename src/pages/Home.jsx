// 라우팅용 임시 페이지!! 삭제 예정입니다.

import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Container>
      <Title>임시 메인페이지 🍀</Title>
      <Description>4호선톤 FE</Description>
      <StyledLink to="/designsystem">DesignSystem</StyledLink>
    </Container>
  );
};

export default Home;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const StyledLink = styled(Link)`
  padding: 8px 16px;
  margin: 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background-color: #45a049;
  }
`;