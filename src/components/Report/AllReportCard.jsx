import styled from "styled-components";
import { useState } from "react";
import TagSelect from "./TagSelect";

const AllReportCard = ({ learningtitle, onView }) => {
  const [showTip, setShowTip] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [selectedTag, setSelectedTag] = useState("POST");


  const fullText = `${learningtitle}`;

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

      {showTip && <Tooltip style={{ left: tipPos.x, top: tipPos.y }}>{fullText}</Tooltip>}

      <Content>
        <TagSelect className="tag" onChange={(val) => setSelectedTag(val)} />

        <ViewBtn onClick={() => onView?.(selectedTag)}>보기</ViewBtn>
      </Content>
    </Card>
  );
};

export default AllReportCard;

/* ---------------- Styled ---------------- */

const Card = styled.div`
  width: 46vw;
  min-width: 520px;
  background: #ffffff;

  padding: 26px 32px;
  border-radius: 16px;
  border: 1px solid #EFF0F3;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.15);

  display: flex;
  flex-direction: column;
  gap: 24px;

  transition: 0.2s ease;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0,0,0,0.25);
  }
`;

const Title = styled.div`
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tooltip = styled.div`
  position: fixed;
  pointer-events: none;

  padding: 6px 9px;
  background: black;
  color: white;
  border-radius: 6px;
  font-size: 14px;

  opacity: 0;
  animation: fadeIn 0.1s forwards;
  z-index: 2000;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .tag {
    width: fit-content;
  }
`;

const ViewBtn = styled.button`
  background: #000;
  color: #fff;

  width: 100%;
  padding: 14px 0;
  border-radius: 12px;

  font-size: 17px;
  font-weight: 600;
  cursor: pointer;

  transition: 0.2s ease;
  &:hover {
    background: #444;
  }
`;
