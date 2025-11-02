// 라우팅용 임시 페이지!! 삭제 예정입니다.

import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../components/Layouts/Header";

const Home = () => {

  return (
      <Container>
        <Title>AI 대화를 나만의 학습 리포트로,<br/>대화의 기록이 곧 당신의 지식이 됩니다</Title>
        <Description>AI가 대화를 스스로 분류하고, 몰랐던 개념과 이해 과정을 시각화합니다<br/>기록할수록 학습의 패턴이 드러납니다</Description>
        <StyledLink to="/designsystem">Design System</StyledLink>
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
  text-align: center;
`;

const Description = styled.p`
  font-size: 2;
  color: #000000;
  text-align: center;
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