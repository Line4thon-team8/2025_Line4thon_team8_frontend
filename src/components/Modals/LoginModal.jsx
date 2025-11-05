import styled from "styled-components";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { X } from "lucide-react";

const LoginModal = ({ onClose, onSignupClick }) => {
  // 배경 클릭 시 닫힘 처리
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleBackgroundClick}>
      <ModalBox>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <Title>로그인</Title>
        <SubText>학습 기록을 저장하려면 로그인이 필요합니다.</SubText>

        <InputGroup>
          <Input type="email" placeholder="이메일 주소" />
          <Input type="password" placeholder="비밀번호" />
        </InputGroup>

        <Button variant="primary">계속</Button>

        <Footer>
          <span>아직 계정이 없으신가요?</span>
          <SignupLink onClick={onSignupClick}>회원가입하기</SignupLink>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default LoginModal;

// ---------- styled-components ---------- //

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: relative;
  width: 360px;
  padding: 40px 48px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #555;
  transition: 0.2s;

  &:hover {
    color: #000;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  color: #555;
`;

const SignupLink = styled.a`
  margin-left: 4px;
  font-weight: 600;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;
