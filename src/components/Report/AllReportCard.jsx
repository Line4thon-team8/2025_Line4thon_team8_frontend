import styled from "styled-components";
import { useState } from "react";
import TagSelect from "./TagSelect";

const AllReportCard = ({learningtitle, onView}) => {
    const [showTip, setShowTip] = useState(false);
    const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

    const fullText = `${learningtitle}`;

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
    return(
        <LearningWrap>
            <LearningTitle
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >{fullText}</LearningTitle>

            {showTip && (
                <Tooltip style={{ left: tipPos.x, top: tipPos.y }}>
                {fullText}
                </Tooltip>
            )}

            <StyledPadding>
                <StyledTagSelect/>
                <LearningCheck
                    as="button"
                    type="button"
                    onClick={()=>onView?.(learningtitle)}
                >보기</LearningCheck>
            </StyledPadding>
        </LearningWrap>
    )
}

export default AllReportCard;

const LearningWrap = styled.div`
  min-width: 44.84vw;          /* 861px */
  min-height: 18.43vh;         /* 199px */
  background: #fff;
  padding: 2.22vh 1.93vw;      /* 24px 37px */

  border-radius: 1.85vh;       /* 20px */
  border: 1px solid #EFF0F3;
  box-shadow: 0px 0.37vh 0.37vh rgba(0, 0, 0, 0.25);  /* 4px */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.22vh;                 /* 24px */
`;

const LearningTitle = styled.div`
  font-family: "Noto Sans", 500;
  font-weight: 500;
  font-size: 1.85vh;           /* 20px */
  max-width: 36.3vw;           /* 697px */

  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Tooltip = styled.div`
  position: fixed;               /* 화면(뷰포트) 기준 */
  white-space: nowrap;
  background: transparent;       /* 투명 배경 */
  color: #000;
  z-index: 1000;
  pointer-events: none;          /* 툴팁 위에 마우스 가도 무시 */

  font-size: 1.67vh;             /* 18px */
  padding: 0.18vh 0.21vw;        /* 대충 2px 4px 정도 비율로 */

  opacity: 0;
  animation: fadeIn 0.08s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-4px);
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

  width: 36.3vw;              /* 697px */
  height: 3.61vh;             /* 39px */
  padding: 1.39vh 4.38vw;     /* 15px 84px */
  border-radius: 1.11vh;      /* 12px */

  font-family: "Noto Sans", SemiBold;
  font-weight: 600;
  font-size: 1.67vh;          /* 18px */

  display:flex;
  align-items: center;
  justify-content: center;
`;

const StyledPadding = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.22vh;                /* 24px */
`;

const StyledTagSelect = styled(TagSelect)`
    .ts-btn{
        background: #D9F58A !important;
    }   
    .ts-item{ 
        background: #D9F58A !important;
    } 
`;