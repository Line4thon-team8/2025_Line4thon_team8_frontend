import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import ProfileCard from "./components/ProfileCard";
import ActivityCalendar from "./components/ActivityCalendar";
import DailySummary from "./components/DailySummary";
import RecentReports from "./components/RecentReports";
import { getUserMyPage, getUserActivity } from "../../api/mypage";
import { getReportsByDate } from "../../api/mypage";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dailyReports, setDailyReports] = useState([]);
  const userId = 1; // 로그인 후 교체

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, activityRes] = await Promise.all([
          getUserMyPage(userId),
          getUserActivity(userId),
        ]);
        setUserData(userRes);
        setActivityData(activityRes);
        setDailyReports(userRes.todayReports || []); // 기본은 오늘
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ 날짜 변경 시 리포트 불러오기
  useEffect(() => {
    if (!selectedDate) return;

    const fetchReports = async () => {
      try {
        const today = dayjs().format("YYYY-MM-DD");

        if (selectedDate === today) {
          setDailyReports(userData?.todayReports || []);
        } else {
          const reports = await getReportsByDate(userId, selectedDate);
          setDailyReports(reports);
        }
      } catch (err) {
        console.error("❌ 날짜별 리포트 불러오기 실패:", err);
        setDailyReports([]);
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
          userId={userId}
          onDateSelect={setSelectedDate}
          activityData={activityData}
        />
        <DailySummary
          selectedDate={selectedDate}
          reports={dailyReports}
        />
      </SectionRow>

      <RecentReports />
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
