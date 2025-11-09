import styled from "styled-components";
import Input from "../Inputs/Input";
import InputWithButton from "../Inputs/InputWithButton";
import Button from "../Buttons/Button";
import { X } from "lucide-react"; // ❗아이콘 (lucide-react 설치 필요)

const SignupModal = ({ onClose }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <Title>회원가입</Title>

        <InputGroup>
          <InputWithButton
            type="email"
            placeholder="이메일 주소"
            buttonText="중복확인"
            onButtonClick={() => alert("이메일 중복확인")}
          />
          <Input type="password" placeholder="비밀번호" />
          <Input type="password" placeholder="비밀번호 확인" />
          <InputWithButton
            placeholder="닉네임 입력"
            buttonText="중복확인"
            onButtonClick={() => alert("닉네임 중복확인")}
          />
        </InputGroup>

        <Button variant="primary">완료</Button>

        <Footer></Footer>
      </ModalBox>
    </ModalContainer>
  );
};

export default SignupModal;

// ---------- styled-components ---------- //

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 40px 48px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  color: #555;
`;

const LoginLink = styled.a`
  margin-left: 4px;
  font-weight: 600;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;
