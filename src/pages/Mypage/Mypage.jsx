// 마이페이지 전체 레이아웃 담당

import { useState } from "react";
import styled from "styled-components";
import ProfileCard from "./components/ProfileCard";
import ActivityCalendar from "./components/ActivityCalendar";
import DailySummary from "./components/DailySummary";
import RecentReports from "./components/RecentReports";

const MyPage = () => {

  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dailyReports, setDailyReports] = useState([]);
  const userId = 3; // 로그인 후 교체

  // ✅ 더미 리포트 데이터
  const reportDataList = {
    "2025-10-01": {
      topic: "React Hooks",
      summary: "useEffect의 의존성 배열을 복습했어요.",
    },
    "2025-10-09": {
      topic: "async/await",
      summary: "비동기 흐름 제어를 함수 단위로 정리했습니다.",
    },
    "2025-10-23": {
      topic: "상태 관리",
      summary: "useReducer로 상태 패턴을 정리했습니다.",
    },
  };

  // ✅ 선택된 날짜의 리포트 데이터
  const reportData = reportDataList[selectedDate];

  return (
    <Container>
      <ProfileCard />

      {/* 📆 캘린더와 요약 구역 */}
      <SectionRow>
        <ActivityCalendar onDateSelect={setSelectedDate} />
        <DailySummary selectedDate={selectedDate} reportData={reportData} />
      </SectionRow>

      <RecentReports />
    </Container>
  );
};

export default MyPage;

// ---------- styled-components ---------- //

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 80px 60px;
  background-color: #f8f9fa;
`;

const SectionRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;
