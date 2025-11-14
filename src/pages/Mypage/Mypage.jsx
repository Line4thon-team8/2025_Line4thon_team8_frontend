import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import ProfileCard from "./components/ProfileCard";
import ActivityCalendar from "./components/ActivityCalendar";
import DailySummary from "./components/DailySummary";
import RecentReports from "./components/RecentReports";

import { getUserMyPage, getUserActivity, getReportsByDate } from "../../api/mypage";

const MyPage = () => {
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dailyReports, setDailyReports] = useState([]);

  if (!userId) return <p>로그인 후 이용해주세요!</p>;

  // 전체 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, activityRes] = await Promise.all([
          getUserMyPage(Number(userId)),
          getUserActivity(Number(userId)),
        ]);

        setUserData(userRes);
        setActivityData(activityRes);
        setDailyReports(userRes.todayReports || []);

      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  // 날짜 변경 시 리포트 다시 요청
  useEffect(() => {
    if (!selectedDate || !userData) return;

    const fetchReports = async () => {
      try {
        const today = dayjs().format("YYYY-MM-DD");

        if (selectedDate === today) {
          setDailyReports(userData.todayReports || []);
        } else {
          const reports = await getReportsByDate(Number(userId), selectedDate);
          setDailyReports(reports);
        }

      } catch (err) {
        console.error("날짜별 리포트 실패:", err);
      }
    };

    fetchReports();
  }, [selectedDate]);

  if (!userData) return <p>로딩 중...</p>;

  return (
    <Wrapper>
      <ProfileCard user={userData} />

      <SectionRow>
        <ActivityCalendar
          userId={Number(userId)}
          onDateSelect={setSelectedDate}
          activityData={activityData}
        />
        <DailySummary selectedDate={selectedDate} reports={dailyReports} />
      </SectionRow>

      <RecentReports userId={Number(userId)} />
    </Wrapper>
  );
};

export default MyPage;


// ---------- styled ---------- //
const Wrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SectionRow = styled.div`
  display: flex;
  gap: 20px;
`;
