import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { createReport } from "../../api/report";
import { analyze } from "../../api/analyze";

import Toggle from "../../components/Toggle/Toggle";
import before from "../../assets/before.svg";
import next from "../../assets/next.svg";
import learningback from "../../assets/learningback.svg";
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
    document.body.style.background = "linear-gradient(#f2f2f2, #DBF596)";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = 0;

    return () => {
      document.body.style.background = "";
      document.body.style.minHeight = "";
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveButtonClick = () => {
    const ok = window.confirm(
      "학습 세션이 종료됩니다. 확인을 누르면 홈 화면으로 돌아갑니다."
    );

    if (ok) {
      navigate("/main");
    }
  };

  //이전 페이지에서 넘어온 state
  const { entranceId, userId, topics = [] } = location.state || {};

  //topic card
  const totalPages = Math.ceil(topics.length / 3);
  const startIndex = page * 3;
  const currentTopics = topics.slice(startIndex, startIndex + 3);

  // -------------------------------
  // 1. 리포트 생성 요청
  // -------------------------------
  const handleCreateReport = async ({ options, tags, tag }) => {
    try {
const res = await createReport({
  entranceId: Number(entranceId), 
  userId: Number(userId),
  options,
  tags,
  tag,
});

      const reportId = res?.reports?.[0]?.reportId;
      if (!reportId) return;

      navigate(`/report/${reportId}`, {
        state: { entranceId, userId },
      });
    } catch (error) {
      console.error("리포트 생성 실패:", error);
    }
  };

  // 통합 리포트
  const handleIntegratedView = (tag) => {
    setIsIntegrated(true);

    handleCreateReport({
      options: "TOTAL",
      tag,
    });
  };

  // 주제별 리포트
  const handleTopicView = (topic, tag) => {
    setIsIntegrated(false);

    handleCreateReport({
      options: "TOPIC",
      tags: { [topic]: tag },
    });
  };

  //이전 페이지 버튼
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  //다음 페이지 버튼
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <R_BackColor>
      <ReportWrap>
        <ReportTitle>학습 리포트</ReportTitle>
        <ReportSub>주제별 리포트를 자동 생성하거나, 통합 리포트를 한 번에 내보내세요.</ReportSub>
        <Toggle value={isIntegrated} onChange={setIsIntegrated} />

        <ReportBackWrap>
          <ReportBack src={learningback} />

          {isIntegrated ? (
            <AllReportDetailWrap>
              <AllReportCard
                learningtitle={
                  allTitle ||
                  (topics.length > 0
                    ? `${topics.join(", ")} 통합 학습 리포트`
                    : "통합 학습 리포트")
                }
                onView={(tag) => handleIntegratedView(tag)}
              />
            </AllReportDetailWrap>
          ) : (
            <ReportDetailWrap>
              <img src={before} onClick={handlePrevPage} />
              <LearningReportContain>
                {currentTopics.map((title) => (
                  <TopicReportCard
                    key={title}
                    learningtitle={title}
                    onView={(topic, tag) => handleTopicView(topic, tag)}
                  />
                ))}
              </LearningReportContain>
              <img src={next} onClick={handleNextPage} />
            </ReportDetailWrap>
          )}
        </ReportBackWrap>

        <ReportSaveWrap>
          <ReportTitle>저장하기</ReportTitle>
          <ReportSub>
            주제별 리포트를 자동 생성하거나, 통합 리포트를 한 번에 내보내세요
          </ReportSub>

          <R_DetailWrap>
            <SaveWrap>
              <SavedTitle>내부에 저장하기</SavedTitle>
              <SavedSub>
                저장할 리포트 위치를 선택하거나 새로 만들어 저장할 수 있어요
              </SavedSub>
              <SavedWrap>
                {topics.map((title) => (
                  <SaveIn key={title} intitle={title} />
                ))}
              </SavedWrap>
            </SaveWrap>

            <SaveWrap>
              <SavedTitle>외부로 내보내기</SavedTitle>
              <SavedSub>
                파일로 다운로드하거나 다른 서비스로 전송해요
              </SavedSub>
              <SavedWrap>
                {topics.map((title) => (
                  <SaveOut key={title} outtitle={title} />
                ))}
              </SavedWrap>
            </SaveWrap>
          </R_DetailWrap>
        </ReportSaveWrap>

        <StyledSaveButton onClick={handleSaveButtonClick}>
          확인
        </StyledSaveButton>
      </ReportWrap>
    </R_BackColor>
  );
};

export default Report;

/* ---------------- Styled ---------------- */

const StyledReportWrap = css`
  margin-top: 111px;
  display: flex;
  align-items: center;
  width: 1134px;
  height: 320px;
  border-radius: 20px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background-color: #d9f58a;
`;

const R_BackColor = styled.div`
  background: linear-gradient(#f2f2f2, #dbf596);
  min-height: 100vh;
  padding-bottom: 4px;
`;

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
`;

const ReportDetailWrap = styled.div`
  ${StyledReportWrap};
  padding: 67px 29px 54px 28px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 16px;
    height: 16px;
  }
`;

const LearningReportContain = styled.div`
  display: flex;
  gap: 44px;
  margin: auto 54px auto 21px;
`;

const ReportBack = styled.div``;

const ReportBackWrap = styled.div``;

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
  background-color: #e6e6e8;

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

const SaveWrap = styled.div``;

const StyledSaveButton = styled(SaveButton)`
  margin-top: 58px;
  margin-left: 450px;
`;
