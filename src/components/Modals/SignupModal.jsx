import styled from "styled-components";
import Input from "../Inputs/Input";
import InputWithButton from "../Inputs/InputWithButton";
import Button from "../Buttons/Button";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { checkNickname, checkEmail } from "../../api/user";

const SignupModal = ({ onClose }) => {
  //console.log("✅ BASE_URL:", import.meta.env.VITE_API_BASE_URL);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !nickname) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user`,
        {
          email,
          nickname,
          password,
        }
      );
      console.log("✅ 회원가입 성공:", res.data);
      setMessage("회원가입 성공! 🎉");
    } catch (err) {
      console.error("❌ 회원가입 실패:", err.response);
      if (err.response?.status === 400) {
        setMessage("중복된 이메일 또는 닉네임입니다.");
      } else {
        setMessage("서버 오류가 발생했습니다.");
      }
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            buttonText="중복확인"
            onButtonClick={async () => {
              if (!email) return alert("이메일을 입력해주세요");
              try {
                const res = await checkEmail(email);
                // true/false 반대 예상
                if (res.available === false || res.additionalProp1 === false) {
                  alert("사용 가능한 이메일입니다");
                } else {
                  alert("이미 사용 중인 이메일입니다");
                }
              } catch (err) {
                alert("서버 오류가 발생했습니다.");
              }
            }}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputWithButton
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            buttonText="중복확인"
            onButtonClick={async () => {
              if (!nickname) return alert("닉네임을 입력해주세요");
              try {
                const res = await checkNickname(nickname);
                // true/false 반대 예상
                if (res.available === false || res.additionalProp1 === false) {
                  alert("사용 가능한 닉네임입니다");
                } else {
                  alert("이미 사용 중인 닉네임입니다");
                }
              } catch (err) {
                alert("서버 오류가 발생했습니다.");
              }
            }}
          />
        </InputGroup>

        <Button variant="primary" onClick={handleSignup}>
          완료
        </Button>

        {message && <p style={{ marginTop: "16px", color: "#555" }}>{message}</p>}
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
