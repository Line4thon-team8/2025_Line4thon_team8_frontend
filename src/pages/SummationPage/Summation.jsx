import { useState } from "react";
import styled, { css, StyleSheetManager } from "styled-components";
import { useNavigate } from "react-router-dom";
import TopicBtn from "../../components/Buttons/TopicButton";
import Concept from "../../components/Summation/Concept";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import MetallicRingImg from "../../assets/metallicRing.svg";

const Summation = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const topics = ["React Hooks", "async/await", "에러 핸들링"];

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
      <MainContent>
        {/* 왼쪽 패널 - 전체 요약 */}
        <LeftPanel>
          <TitleRow>
            <S_Title>전체 요약</S_Title>
            <ReportButton onClick={() => navigate("/report")}>
              학습 리포트 보기 &gt;
            </ReportButton>
          </TitleRow>
          <S_SubTitle>클릭 시 해당 주제의 요약을 바로 볼 수 있어요</S_SubTitle>

          <TopicVisualization>
            <StyledMetallicRing src={MetallicRingImg} alt="metallic ring" />

            {/* 주제 버튼들 */}
            <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
              <TopicButton
                position="top-right"
                $active={selected === 0}
                onClick={() => {
                  setSelected(0);
                  toConcept(0);
                }}
              >
                {topics[0]}
              </TopicButton>

              <TopicButton
                position="left"
                $active={selected === 1}
                onClick={() => {
                  setSelected(1);
                  toConcept(1);
                }}
              >
                {topics[1]}
              </TopicButton>

              <TopicButton
                position="bottom-right"
                $active={selected === 2}
                onClick={() => {
                  setSelected(2);
                  toConcept(2);
                }}
              >
                {topics[2]}
              </TopicButton>
            </StyleSheetManager>
          </TopicVisualization>
        </LeftPanel>

        {/* 오른쪽 패널 - 주제별 학습 인사이트 */}
        <RightPanel>
          <InsightTitle>주제별 학습 인사이트</InsightTitle>
          <InsightSub>
            버블이 오른쪽 위로 갈수록 더 익숙하지 않은 주제를 의미해요
          </InsightSub>
          <InsightWrap>
            <BubbleChart />
          </InsightWrap>
        </RightPanel>
      </MainContent>

      <S_ConceptWrap>
        <Concept />
      </S_ConceptWrap>
    </SummationWrap>
  );
};

export default Summation;

const SummationWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 108px;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 89px;
  padding: 0 130px;
  align-items: flex-start;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const S_Title = styled.div`
  font-family: "Noto Sans", Bold;
  font-weight: 700;
  font-size: 64px;
`;

const S_SubTitle = styled.div`
  font-family: "Noto Sans", Medium;
  font-size: 20px;
  color: #868686;
  margin-bottom: 20px;
`;

const TopicVisualization = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  margin-top: 40px;
`;

const StyledMetallicRing = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 450px;
  z-index: 1;
`;

const TopicButton = styled(({ position, $active, ...rest }) => {
  void $active;
  void position;
  return <TopicBtn {...rest} />;
})`
  position: absolute;
  width: 211px;
  height: 139px;
  padding: 0;
  z-index: 2;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-family: "Noto Sans";
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 48px */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  /* 기본 배경색 */
  background-color: #E6E6E8 !important;
  border: none;

  ${({ position }) => {
    switch (position) {
      case "top-right":
        return css`
          top: 10px;
          left: 5px;
        `;
      case "left":
        return css`
          top: 150px;
          left: 200px;
        `;
      case "bottom-right":
        return css`
          top: 290px;
          left: 5px;
        `;
      default:
        return css``;
    }
  }}

  /* 호버 시 배경색 변경 */
  &&:hover {
    background-color: #D0D0D1 !important;
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
        border-color: #226cff !important;
      }
    `}
`;

const InsightTitle = styled.div`
  font-family: "Noto Sans", SemiBold;
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 10px;
`;

const InsightSub = styled.div`
  font-family: "Noto Sans", SemiBold;
  font-weight: 500;
  font-size: 20px;
  color: #868686;
  margin-bottom: 30px;
`;

const InsightWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 456px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
`;

const ReportButton = styled.button`
  padding: 10px 20px;
  background: #e6e6e8;
  border-radius: 20px;
  border: none;
  font-family: "Noto Sans", Medium;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: opacity 0.2s ease;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
`;

const S_ConceptWrap = styled.div`
  margin-top: 182px;
  margin-left: 130px;

  display: flex;
  flex-direction: column;

  gap: 48px;
  align-items: stretch;
`;
