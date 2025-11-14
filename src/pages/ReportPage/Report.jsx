import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { createReport } from "../../api/report";
import { analyze } from "../../api/analyze";

import Toggle from "../../components/Toggle/Toggle";
import before from "../../assets/before.svg";
import next from "../../assets/next.svg";
import learningback from"../../assets/learningback.svg";
import TopicReportCard from "../../components/Report/TopicReportCard";
import AllReportCard from "../../components/Report/AllReportCard";
import SaveIn from "../../components/Report/SaveIn";
import SaveOut from "../../components/Report/SaveOut";
import SaveButton from "../../components/Buttons/Button";
import reportBack from "../../assets/reportBack.svg";

const Report = () => {
    const [isIntegrated, setIsIntegrated] = useState(false); //false=주제별, true=통합
    const [allTitle, setAllTitle] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        // 페이지 들어왔을 때 body 배경 변경
        document.body.style.background ="linear-gradient(#f2f2f2, #DBF596)";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = 0;

        // 페이지 떠날 때 원래대로 복원
        return () => {
            document.body.style.background = "";
            document.body.style.minHeight = "";
        };
        }, []);

        const handleSaveButtonClick = () => {
            const ok = window.confirm(
                "학습 세션이 종료됩니다. 확인을 누르면 홈 화면으로 돌아갑니다."
            );

            if (ok) {
                navigate("/main");
            }
            };
 
    const navigate = useNavigate();
    const location = useLocation();

    //이전 페이지에서 넘어온 state
    const { 
        entranceId,
        userId,
        topics=[],
    } = location.state || {};

    //topic card
    const totalPages = Math.ceil(topics.length / 3);
    const startIndex = page * 3;
    const currentTopics = topics.slice(startIndex, startIndex + 3);
    
    //리포트 생성 요청
    const handleCreateReport = async ({options, topic}) =>{ //integrated: true -> total | false -> TOPIC
        try{
            const res = await createReport({
                // entranceId,
                // userId,
                options,
                // ...(options === "TOTAL"
                //     ? {tag : "POST"}
                //     : {tags: {[topic]: "POST"}}
                // ),
            });

            const reports = res?.reports || [];
            let target;

            if (options === "TOTAL") {
      // 통합 리포트는 그냥 첫 번째 것 사용
      target = reports[0];
            } else {
            // 1) report.topic 에서 찾기 (혹시 백에서 그렇게 줄 수도 있으니까)
            target =
                reports.find((r) => r.topic === topic) ||

                // 2) report.results[*].topic 안에서 topic 이 있는 report 찾기
                reports.find((r) =>
                Array.isArray(r.results) &&
                r.results.some((it) => it.topic === topic)
                ) ||

                // 3) 그래도 못 찾으면 그냥 첫 번째
                reports[0];
            }
            
            const reportId = target.reportId ?? target.id;
            if (!reportId) {
            console.error("reportId 없음. target / res 확인:", target, res);
            return;
            }

            if(target.title){
                setAllTitle(target.title);
            }

            //reportId로 상세 페이지 이동
            navigate(`/report/${target.reportId}`,{
                state: {
                    entranceId : 7,
                    userId: 2,
                    topic: target.topic,
                    topics,
                }
            });
            }catch(error){
                console.error("리포트 생성 실패 전체 error:", error);
                console.error("status:", error.response?.status);
                console.error("data:", error.response?.data);
            }
    };

    const handleIntegratedView = () =>{ //통합 카드 클릭
        setIsIntegrated(true);
        handleCreateReport({options: "TOTAL"});
    }

    const handleTopicView = (topic) =>{ // 주제별 카드 클릭
        setIsIntegrated(false);
        handleCreateReport({options: "TOPIC", topic});
    }

    //이전 페이지 버튼
    const handlePrevPage = () =>{
        if(page > 0) setPage(page -1);
    }

    //다음 페이지 버튼
    const handleNextPage = () => {
        if(page < totalPages - 1) setPage(page + 1);
    }

    const handleConfirm = () =>{
        setShowAlert(true);
    }

    const handleAlertConfirm = () => {
        setShowAlert(false);
        navigate("/main");
    };

    return (
        <R_BackColor>
            {/* <BackgroundImage src={reportBack} alt="main-bg" /> */}
            <ReportWrap>
                <ReportTitle>학습 리포트</ReportTitle>
                <ReportSub>주제별 리포트를 자동 생성하거나, 통합 리포트를 한 번에 내보내세요.</ReportSub>
                <Toggle value={isIntegrated} onChange={setIsIntegrated}/>
                
                <ReportBackWrap>
                    <ReportBack src={learningback} />
                    {isIntegrated ? (
                        <AllReportDetailWrap>
                            <AllReportCard 
                                learningtitle={
                                    allTitle || (topics.length > 0 
                                    ? `${topics.join(", ")} 통합 학습 리포트` : "통합 학습 리포트")
                                    } 
                                    onView={handleIntegratedView}/>
                        </AllReportDetailWrap>
                        ) : (
                        <ReportDetailWrap>
                            <img src={before} onClick={handlePrevPage}/>
                            <LearningReportContain>
                                {currentTopics.map((title) => (
                                    <TopicReportCard 
                                        key={title} 
                                        learningtitle={title}
                                        onView={() => handleTopicView(title)}/>))}
                            </LearningReportContain>
                            <img src={next} onClick={handleNextPage}/>
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
                                {topics.map((title)=>(
                                 <SaveIn key={title} intitle={title}/>))}
                            </SavedWrap>
                        </SaveWrap>
                        <SaveWrap>
                            <SavedTitle>외부로 내보내기</SavedTitle>
                            <SavedSub>파일로 다운로드하거나 다른 서비스로 전송해요</SavedSub>
                            <SavedWrap>
                                {topics.map((title)=>(
                                <SaveOut key={title} outtitle={title} />))}
                            </SavedWrap>
                        </SaveWrap>
                    </R_DetailWrap>
                </ReportSaveWrap>

                <StyledSaveButton onClick={handleSaveButtonClick}>확인</StyledSaveButton>
            </ReportWrap>
        </R_BackColor>
    );
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

    display: flex;
    justify-content: space-between;
    align-items: center;

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

const StyledSaveButton = styled(SaveButton)`
    margin-top: 58px;
    margin-left:450px;
`;