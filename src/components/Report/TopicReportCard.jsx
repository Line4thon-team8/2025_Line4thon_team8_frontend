import styled from "styled-components";
import { useState } from "react";
import TagSelect from "./TagSelect";

const TopicReportCard = ({ learningtitle, onView }) => {
  const [showTip, setShowTip] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const fullText = `${learningtitle} 학습 리포트`;

  const handleMouseEnter = () => {
    setShowTip(true);
  };

  const handleMouseLeave = () => {
    setShowTip(false);
  };

  const handleMouseMove = (e) => {
    // 화면 기준(mouse pointer) 좌표 그대로 사용
    const x = e.clientX + 8;   // 마우스 오른쪽 약간
    const y = e.clientY - 60;   // 마우스 바로 위쪽 느낌

    setTipPos({ x, y });
  };

  return (
    <LearningWrap>
      <LearningTitle
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {fullText}
      </LearningTitle>

      {showTip && (
        <Tooltip style={{ left: tipPos.x, top: tipPos.y }}>
          {fullText}
        </Tooltip>
      )}

      <TagSelect />
      <LearningCheck as="button" onClick={() => onView?.(learningtitle)}>
        보기
      </LearningCheck>
    </LearningWrap>
  );
};

export default TopicReportCard;

const LearningWrap = styled.div`
  width: 15.41vw;
  height: 18.43vh;
  background: #fff;
  padding: 2.22vh 1.93vw;

  border-radius: 1.85vh;
  border: 1px solid #EFF0F3;
  box-shadow: 0px 0.37vh 0.37vh rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  gap: 2.22vh;
`;

const LearningTitle = styled.div`
  font-family: "Noto Sans", 500;
  font-weight: 500;
  font-size: 1.85vh;          /* 20px → 20/1080 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 100%;
  display: block;
`;

const Tooltip = styled.div`
  position: fixed;
  white-space: nowrap;
  background: transparent;
  color: #000;
  z-index: 1000;
  pointer-events: none;

  font-size: 1.66vh;          /* 18px → 18/1080 */
  padding: 0.18vh 0.20vw;

  opacity: 0;
  animation: fadeIn 0.08s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-0.20vw);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const LearningCheck = styled.div`
  background: #000;
  color: #fff;

  width: 11.5vw;
  height: 3.61vh;
  padding: 1.38vh 4.37vw;
  border-radius: 1.11vh;

  font-family: "Noto Sans", SemiBold;
  font-weight: 600;
  font-size: 1.66vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;