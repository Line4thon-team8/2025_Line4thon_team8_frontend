// 라우팅용 임시 페이지

import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Title>임시 메인페이지 🍀</Title>
      <Description>4호선톤 FE</Description>
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
