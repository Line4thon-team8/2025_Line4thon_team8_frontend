import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { css, StyleSheetManager } from "styled-components";

import TopicBtn from "../../components/Buttons/TopicButton";
import Concept from "../../components/Summation/Concept";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import { getResultSummary } from "../../api/result";

const Summation = () => {
  const location = useLocation();
  const { entranceId, userId } = location.state || {};

  const [selected, setSelected] = useState(null);
  const [summary, setSummary] = useState(null);

  const topics = ["React Hooks", "async/await", "에러 핸들링"];

  // 🔥 요약 데이터 불러오기
  useEffect(() => {
    if (!entranceId || !userId) return;

    (async () => {
      try {
        const data = await getResultSummary(entranceId, userId);
        console.log("🔥 요약 데이터:", data);
        setSummary(data);
      } catch (err) {
        console.error("요약 조회 실패", err);
      }
    })();
  }, [entranceId, userId]);

  const toConcept = (index) => {
    const el = document.getElementById(`concept-${index}`);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <SummationWrap>
      <S_Title>전체 요약</S_Title>
      <S_SubTitle>클릭 시 해당 주제의 요약을 바로 볼 수 있어요</S_SubTitle>

      <S_TopicBtnWrap>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
          {topics.map((topic, i) => (
            <StyledTopicBtn
              key={i}
              $active={selected === i}
              onClick={() => {
                setSelected(i);
                toConcept(i);
              }}
            >
              {topic}
            </StyledTopicBtn>
          ))}
        </StyleSheetManager>
      </S_TopicBtnWrap>

      <InsightTitle>주제별 학습 인사이트</InsightTitle>
      <InsightSub>버블이 오른쪽 위로 갈수록 더 익숙하지 않은 주제를 의미해요</InsightSub>
      <InsightWrap>
        <BubbleChart />
      </InsightWrap>

      {/* 🔥 summary 내용은 여기서 Concept 컴포넌트로 내려 줄 예정 */}
      <S_ConceptWrap>
        <Concept summary={summary} />
      </S_ConceptWrap>
    </SummationWrap>
  );
};

export default Summation;

/* 스타일 그대로 */
const SummationWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 108px;
`;

const S_Title = styled.div`
  font-family: "Noto Sans", Bold;
  font-weight: 700;
  font-size: 64px;
  margin-top: 89px;
  margin-left: 594px;
`;

const S_SubTitle = styled.div`
  margin-top: 20px;
  margin-left: 534px;
  font-family: "Noto Sans", Medium;
  font-size: 20px;
  color: #868686;
`;

const S_TopicBtnWrap = styled.div`
  margin-top: 20px;
  margin-left: 512px;
  display: flex;
  gap: 28px;
`;

const StyledTopicBtn = styled(({ $active, ...rest }) => <TopicBtn {...rest} />)`
  width: 121px;
  height: 41px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-family: "Noto Sans", Regular;
  font-weight: 400;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &&:hover {
    background-color: inherit !important;
    color: inherit !important;
    border-color: inherit !important;
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: #226cff;
      color: #ffffff;
      border-color: #226cff;

      &&:hover {
        background-color: #226cff !important;
        color: #ffffff !important;
      }
    `}
`;

const InsightTitle = styled.div`
  margin-top: 27px;
  margin-left: 578px;
  font-family: "Noto Sans", SemiBold;
  font-size: 32px;
`;

const InsightSub = styled.div`
  margin-left: 468px;
  font-family: "Noto Sans", SemiBold;
  font-weight: 500;
  font-size: 20px;
  color: #868686;
`;

const InsightWrap = styled.div`
  margin-top: 30px;
  margin-left: 407px;
  width: 626px;
  height: 456px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const S_ConceptWrap = styled.div`
  margin-top: 182px;
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
