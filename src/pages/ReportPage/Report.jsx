import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Toggle from "../../components/Toggle/Toggle";
import before from "../../assets/before.svg";
import next from "../../assets/next.svg";
import learningback from"../../assets/learningback.svg";
import TopicReportCard from "../../components/Report/TopicReportCard";
import AllReportCard from "../../components/Report/AllReportCard";
import SaveIn from "../../components/Report/SaveIn";
import SaveOut from "../../components/Report/SaveOut";
import LearningReportPage from "./LearningReportPage";

const Report = () => {
    const moitopics = ["React Hooks", "async/await", "에러 핸들링"];
    const allTitle = `${moitopics.join(", ")} 통합 학습 리포트`;

    const navigate = useNavigate();

    const handleView = (title) => {
        navigate(`/report/${encodeURIComponent(title)}`, {
            state: {title},
        });
    };
    
    const [isIntegrated, setIsIntegrated] = useState(false); //false=주제별, true=통합
    return (
        <R_BackColor>
            <ReportWrap>
                <ReportTitle>학습 리포트</ReportTitle>
                <ReportSub>주제별 리포트를 자동 생성하거나, 통합 리포트를 한 번에 내보내세요.</ReportSub>
                <Toggle value={isIntegrated} onChange={setIsIntegrated}/>
                
                <ReportBackWrap>
                    <ReportBack src={learningback} />
                    {isIntegrated ? (
                        <AllReportDetailWrap>
                            <AllReportCard learningtitle={allTitle} onView={() => handleView(allTitle)}/>
                        </AllReportDetailWrap>
                        ) : (
                        <ReportDetailWrap>
                            <img src={before} />
                            <LearningReportContain>
                                {moitopics.map((title) => (
                                    <TopicReportCard 
                                        key={title} 
                                        learningtitle={title}
                                        onView={() => handleView(`${title} 학습 리포트`)}                                    />))}
                            </LearningReportContain>
                            <img src={next} />
                        </ReportDetailWrap>
                        )}
                </ReportBackWrap>

                <ReportSaveWrap>
                    <ReportTitle>저장하기</ReportTitle>
                    <ReportSub>주제별 리포트를 자동 생성하거나, 통합 리포트를 한 번에 내보내세요</ReportSub>

                    <R_DetailWrap>
                        <SaveWrap>
                            <SavedTitle>내부에 저장하기</SavedTitle>
                            <SavedSub>저장할 리포트 위치를 선택하거나 새로 만들어 저장할 수 있어요</SavedSub>
                            <SavedWrap>
                                {moitopics.map((title) => (
                                <SaveIn key={title} intitle={title}/>))}
                            </SavedWrap>
                        </SaveWrap>
                        <SaveWrap>
                            <SavedTitle>외부로 내보내기</SavedTitle>
                            <SavedSub>파일로 다운로드하거나 다른 서비스로 전송해요</SavedSub>
                            <SavedWrap>
                                {moitopics.map((title) => (
                                <SaveOut key={title} outtitle={title} />))}
                            </SavedWrap>
                        </SaveWrap>
                    </R_DetailWrap>
                </ReportSaveWrap>
            </ReportWrap>
        </R_BackColor>
    )
}

export default Report;

const StyledReportWrap = css`
    margin-top: 111px;
    display: flex;
    align-items: center;
    width: 1134px;
    height: 320px;
    border-radius: 20px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    background-color: #D9F58A;
`

const R_BackColor = styled.div`
    background: linear-gradient(#f2f2f2, #DBF596);
    min-height: 100vh;
    padding-bottom: 4px;
`

const ReportWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 150px;
    margin-bottom: 41px;
`;

const ReportTitle = styled.div`
    font-family: "Noto Sans", Bold;
    font-weight: 700;
    font-size: 64px;
`;

const ReportSub = styled.div`
    font-family: "Noto Sans", Medium;
    font-size: 20px;
    font-weight: 500;
    color: #868686;

    margin-bottom: 51px;
`;

const AllReportDetailWrap = styled.div`
    ${StyledReportWrap};
    padding: 67px 150px 54px 123px;
`
const ReportDetailWrap = styled.div`
    ${StyledReportWrap};
    padding: 67px 29px 54px 28px;

    >img {
        width: 16px;
        height: 16px;
    }
`
const LearningReportContain = styled.div`
    display: flex;
    gap: 44px;
    margin: auto 54px auto 21px;
`;
const ReportBack = styled.div`

`

const ReportBackWrap = styled.div`

`;

const ReportSaveWrap = styled.div`
    margin-top: 297px;
`;



const R_DetailWrap = styled.div`
    margin-top: 155px;
    display: flex;
    gap: 49px;
`;

const SavedWrap = styled.div`
    padding: 42px 43px;
    display: flex;
    flex-direction: column;
    background-color: #E6E6E8;

    gap: 17px;

    width: 521px;
    min-height: 384px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SavedTitle = styled.div`
    font-family: "Noto Sans", SemiBold;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 15px;
`;
const SavedSub = styled.div`
    font-family: "Noto Sans", Medium;
    font-size: 20px;
    font-weight: 500;
    color: #868686;
    margin-bottom: 19px;
`;

const SaveWrap = styled.div`
    
`;