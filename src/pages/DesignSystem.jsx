// 디자인시스템 확인용 페이지입니다. 최종 때는 삭제 예정!

import styled from "styled-components";
import Button from "../components/Buttons/Button";
import TopicButton from "../components/Buttons/TopicButton";
import SaveButton from "../components/Buttons/SaveButton";


const DesignSystem = () => {
  return (
    <Container>
      <Title>Design System</Title>

      <h2>Buttons</h2>
      
        <Component>Button : primary</Component>
        <Button variant="primary">분석하기 / 시작하기</Button>
        <Button variant="primary">계속 / 완료</Button>
        <Component>Button : secondary</Component>
        <Button variant="secondary" subVariant="outlined">중복확인 / 보기</Button>
        <Button variant="secondary" subVariant="filled">다운로드</Button>
        <Component>Button : tag</Component>
        <Button variant="tag">ex. React Hooks</Button>

        <Component>Topic Button</Component>
        <TopicButton>Topic</TopicButton>

        <Component>Save Button</Component>
        <SaveButton>저장하기</SaveButton>


    </Container>
  );
};

export default DesignSystem;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 50px 0;
`;

const Component = styled.h3`
    color: #eb9100
`

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
`;
