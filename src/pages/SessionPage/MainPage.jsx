import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import { useState } from "react";

const MainPage = () => {
  return (
    <Container>
      <Title>분석할 대화 링크를 붙여넣어주세요</Title>
      <Description>
        AI 대화의 공유 링크를 입력하면 내용을 불러와 분석을 준비합니다.
      </Description>

      <InputWrapper>
        <Input placeholder="AI 대화 공유 링크를 붙여넣어주세요" />
      </InputWrapper>

      <Button variant="primary">분석하기</Button>
    </Container>
  );
};

export default MainPage;

// styled-components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 위쪽 정렬 */
  padding-top: 18vh; /* 화면의 18% 지점부터 시작 (디자인 시각적 균형) */
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.2rem;
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.64px;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3rem;
  color: #000000;
  text-align: center;
  line-height: 160%;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin-bottom: 2rem;
`;
