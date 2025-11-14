import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../../components/Buttons/Button";
import LoginModal from "../../components/Modals/LoginModal";
import SignupModal from "../../components/Modals/SignupModal";
import { useState } from "react";
import LandingBG from "../../assets/landingpage.svg";


const LandingPage = () => {

  const [activeModal, setActiveModal] = useState(null);
  //const { isOpen, openModal, closeModal } = useModal();

  return (
      <Container>

        <BackgroundImage src={LandingBG} alt="landing-bg" />
        <Title>AI 대화를 나만의 학습 리포트로,<br/>대화의 기록이 곧 당신의 지식이 됩니다</Title>
        <Description>AI가 대화를 스스로 분류하고, 몰랐던 개념과 이해 과정을 시각화합니다<br/>기록할수록 학습의 패턴이 드러납니다</Description>
        
        <Button variant="primary" onClick={() => setActiveModal("login")}>
          시작하기
        </Button>
        
        {/*<StyledLink to="/designsystem">Design System</StyledLink>*/}

        {activeModal === "login" && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSignupClick={() => setActiveModal("signup")}
        />
      )}
      {activeModal === "signup" && (
        <SignupModal
          onClose={() => setActiveModal(null)}
          onLoginClick={() => setActiveModal("login")}
        />
      )}
      </Container>
  );
};

export default LandingPage;

// styled-components

const Container = styled.div`
  position: relative;   /* z-index 컨텍스트 생성 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const BackgroundImage = styled.img`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-60%);
  width: 550px;
  opacity: 0.5;
  z-index: 0;
  pointer-events: none;   /* 클릭 막힘 → 버튼 클릭 가능 */
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.64px;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4rem;
  color: #000000;
  text-align: center;
  line-height: 160%;
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