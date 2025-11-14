import styled from "styled-components";
import { useState } from "react";
import TagSelect from "./TagSelect";

const TopicReportCard = ({ learningtitle, onView }) => {
  const [showTip, setShowTip] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [selectedTag, setSelectedTag] = useState("POST");

  const fullText = `${learningtitle} 학습 리포트`;

  return (
    <Card>
      {/* 제목 */}
      <Title
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onMouseMove={(e) => setTipPos({ x: e.clientX + 8, y: e.clientY - 60 })}
      >
        {fullText}
      </Title>

      {/* Tooltip */}
      {showTip && <Tooltip style={{ left: tipPos.x, top: tipPos.y }}>{fullText}</Tooltip>}

      <TagSelectWrap>
        <TagSelect onChange={(val) => setSelectedTag(val)} />
      </TagSelectWrap>

      <ViewBtn onClick={() => onView?.(learningtitle, selectedTag)}>보기</ViewBtn>
    </Card>
  );
};

export default TopicReportCard;

/* ---------------- Styled ---------------- */

const Card = styled.div`
  width: 18vw;
  min-width: 240px;
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #EFF0F3;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.15);

  display: flex;
  flex-direction: column;
  gap: 18px;

  transition: 0.2s ease;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0,0,0,0.2);
  }
`;

const Title = styled.div`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tooltip = styled.div`
  position: fixed;
  pointer-events: none;

  padding: 5px 8px;
  background: black;
  color: white;
  border-radius: 6px;
  font-size: 14px;

  z-index: 2000;
  opacity: 0;
  animation: fadeIn 0.1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const TagSelectWrap = styled.div`
  display: flex;
`;

const ViewBtn = styled.button`
  background: #000;
  color: #fff;
  width: 100%;
  padding: 12px 0;
  border-radius: 10px;

  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  transition: 0.2s ease;
  &:hover {
    background: #444;
  }
`;
