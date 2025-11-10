import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Inputs/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeChat } from "../../api/session";

  const MainPage = () => {
    const [chatLink, setChatLink] = useState("");
    const navigate = useNavigate();

  const handleAnalyze = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("로그인 후 이용해주세요!");
    if (!chatLink) return alert("대화 링크를 입력해주세요!");

    try {
      // 1️⃣ 링크 분석 요청
      const { extract_id, content } = await analyzeChat(userId, chatLink);
      console.log("링크 분석 결과:", extract_id, content);

      // 2️⃣ 토픽 리스트로 변환
      const topics = content.split("\n").map((line) => {
        const [namePart, valuePart] = line.split("-");
        return {
          name: namePart?.replace(/^\d+\.\s*/, "").trim(),
          value: parseFloat(valuePart) || 0,
        };
      });

      // 3️⃣ 다음 페이지로 이동
      navigate(`/select-topic?extractId=${extract_id}`, { state: { topics } });
    } catch (err) {
      console.error(err);
      alert("링크 분석 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>분석할 대화 링크를 붙여넣어주세요</Title>
      <Description>
        AI 대화의 공유 링크를 입력하면 내용을 불러와 분석을 준비합니다.
      </Description>

      <InputWrapper>
        <Input
          placeholder="AI 대화 공유 링크를 붙여넣어주세요"
          value={chatLink}
          onChange={(e) => setChatLink(e.target.value)}
        />
      </InputWrapper>

      <Button variant="primary" onClick={handleAnalyze}>
        확인
      </Button>
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
