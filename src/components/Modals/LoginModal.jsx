import { useState } from "react";
import styled from "styled-components";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { X } from "lucide-react";
import { loginUser } from "../../api/user"; // ✅ user.js 함수 불러오기
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await loginUser(email, password);
      alert(`로그인 성공! 사용자 ID: ${res.id}`);
      navigate("/main");
      setMessage("로그인 성공!");
      onClose();
    } catch (err) {
      if (err.response?.status === 400)
        setMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      else setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        <Title>로그인</Title>
        <InputGroup>
          <Input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleLogin}>
          계속
        </Button>
        {message && <p style={{ marginTop: "16px" }}>{message}</p>}

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
