import styled from "styled-components";
import ProgBar from "../../components/Progress/ProgBar";
import Loader from "../../components/Progress/Loader";
import Check from "../../assets/check.svg";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connectEntranceProgress } from "../../api/progress";

const Progress = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { entranceId, topics = [] } = location.state || {};

  const [topicProgress, setTopicProgress] = useState({});

  // topics + progress 로 렌더링 데이터 만들기
  const mockData = useMemo(() => {
    return topics.map((t) => {
      const info = topicProgress[t] || {
        completed: 0,
        progtext: "분석 대기 중",
      };
      return {
        progName: t,
        completed: info.completed,
        progtext: info.progtext,
      };
    });
  }, [topics, topicProgress]);

  // SSE 연결
  useEffect(() => {
    if (!entranceId) return;

    const stop = connectEntranceProgress({
      entranceId,

      onEvent: (type, data) => {
        console.log("🔥 SSE EVENT:", type, data);

        const { progress, step } = data;

        // 🔥 UI 모든 topic 에 동일 progress 업데이트
        setTopicProgress((prev) => {
          let newState = { ...prev };

          topics.forEach((topicName) => {
            const prevInfo = prev[topicName] || {
              completed: 0,
              progtext: "분석 대기 중",
            };

            let progtext = prevInfo.progtext;
            if (type === "start") progtext = `${step} 시작...`;
            else if (type === "done") progtext = `${step} 완료`;
            else if (type === "update") progtext = `${step} 진행 중...`;
            else if (type === "complete") progtext = "분석 완료";

            newState[topicName] = {
              completed: progress ?? prevInfo.completed,
              progtext,
            };
          });

          return newState;
        });

        // 🔥 complete 이벤트 오면 Summation 페이지로 이동
        if (type === "complete") {
          const userId = localStorage.getItem("userId");

          navigate("/summation", {
            state: {
              entranceId,
              userId,
            },
          });
        }
      },
    });

    return () => stop();
  }, [entranceId, topics, navigate]);

  const totalCompleted =
    mockData.length === 0
      ? 0
      : Math.round(
          mockData.reduce((sum, item) => sum + item.completed, 0) /
            mockData.length
        );

  const renderStatus = (completed) =>
    completed === 100 ? <CheckImg src={Check} /> : <Loader />;

  return (
    <Container>
      <Title>전체 진행 상황</Title>

      <ProgressWrap>
        <TotalProgWrap>
          <TotalPer>
            <ProgSubTitle>진행률</ProgSubTitle>
            <TotalCompleted>{totalCompleted}%</TotalCompleted>
          </TotalPer>

          <ProgBar
            completed={totalCompleted}
            showPer={false}
            width="1113px"
            height="25px"
          />
        </TotalProgWrap>

        <SubProgWrap>
          {mockData.map((item) => (
            <ProgItem key={item.progName}>
              <LoaderWrap>
                <StatusWrap>{renderStatus(item.completed)}</StatusWrap>
                <Detailtxt>
                  <DetailWrap>
                    <ProgName>{item.progName}</ProgName>
                    <DetailCompleted>{item.completed}%</DetailCompleted>
                  </DetailWrap>
                  <ProgText>{item.progtext}</ProgText>
                </Detailtxt>
              </LoaderWrap>
              <ProgBar completed={item.completed} />
            </ProgItem>
          ))}
        </SubProgWrap>
      </ProgressWrap>
    </Container>
  );
};

export default Progress;

/* 스타일 그대로 */
const Container = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 80px;
`;

const ProgressWrap = styled.div`
  margin-left: 143px;
`;

const Title = styled.div`
  font-family: "Noto Sans", Helvetica;
  font-weight: 700;
  font-size: 56px;
  letter-spacing: -0.56px;
  white-space: nowrap;
  margin-left: 136px;
`;

const ProgSubTitle = styled.div`
  margin-top: 18px;
  font-weight: 400;
  font-size: 24px;
  color: #868686;
  white-space: nowrap;
`;

const TotalCompleted = styled.div`
  font-style: "Noto Sans", SemiBold;
  font-weight: 600;
  font-size: 40px;
  color: #226cff;
  margin-bottom: 13px;
`;

const TotalPer = styled.div`
  display: flex;
  align-items: center;
  gap: 963px;
`;

const TotalProgWrap = styled.div`
  margin-bottom: 46px;
`;

const LoaderWrap = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

const Detailtxt = styled.div`
  margin-left: 25px;
  flex: 1;
`;

const ProgName = styled.div`
  font-style: "Roboto", SemiBold;
  font-weight: 600;
  font-size: 40px;
`;

const ProgText = styled.div`
  font-style: "Roboto", Regular;
  font-weight: 400;
  font-size: 24px;
  color: #868686;
`;

const DetailCompleted = styled.div`
  font-style: "Roboto", Medium;
  font-weight: 500;
  font-size: 24px;
  color: #226cff;
  margin-left: auto;
`;

const DetailWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProgItem = styled.div`
  background: #ffff;
  padding: 30px 45px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  width: 1113px;
`;

const SubProgWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 57px;
`;

const StatusWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CheckImg = styled.img`
  background-color: #226cff;
  padding: 17px 16px;
  border-radius: 20px;
  width: 90px;
  height: 90px;
`;
