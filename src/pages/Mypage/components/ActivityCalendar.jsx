import styled from "styled-components";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { getUserActivity } from "../../../api/mypage"; // ✅ 추가

const ActivityCalendar = ({ onDateSelect, userId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [activityData, setActivityData] = useState([]);

  // ✅ 1️⃣ 현재 월 기준으로 활동 데이터 불러오기
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // yyyy-MM 형식으로 현재 월 전달 (백엔드에서 이걸 처리할 수도 있음)
        const res = await getUserActivity(userId);
        setActivityData(res || []);
      } catch (err) {
        console.error("❌ 활동 데이터 불러오기 실패:", err);
        setActivityData([]);
      }
    };

    fetchActivity();
  }, [currentMonth]); // 🔸 달 변경될 때마다 다시 불러옴

  // ✅ 2️⃣ API 데이터를 { "YYYY-MM-DD": count } 형태로 변환
  const dataMap = activityData.reduce((acc, item) => {
    const key = item.date || item.reportDate; // ✅ 둘 다 대응
    acc[key] = item.count;
    return acc;
  }, {});

  // ✅ 3️⃣ 현재 월의 날짜 계산
  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day();
  const emptyStart = Array(firstDay).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarCells = [...emptyStart, ...daysArray];

  // ✅ 4️⃣ 날짜 클릭 시 부모로 전달
  const handleSelect = (day) => {
    if (!day) return;
    const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
    onDateSelect(dateStr);
  };

  // ✅ 5️⃣ 색상 단계 계산 함수
  const getLevelColor = (count) => {
    if (!count || count === 0) return "#f1f3f5"; // 없음
    if (count >= 1 && count < 5) return "#e3f7c4"; // 적음
    if (count >= 5 && count < 10) return "#d4f28b"; // 중간
    if (count >= 10) return "#b6ed42"; // 많음
    return "#f1f3f5";
  };

  // ✅ 6️⃣ 이전/다음 달 이동
  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <Card>
      <Header>
        <Title>활동 캘린더</Title>
        <MonthNav>
          <NavButton onClick={handlePrevMonth}>◀</NavButton>
          <MonthText>{currentMonth.format("YYYY년 M월")}</MonthText>
          <NavButton onClick={handleNextMonth}>▶</NavButton>
        </MonthNav>
      </Header>

      <Weekdays>
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <Weekday key={d}>{d}</Weekday>
        ))}
      </Weekdays>

      <Grid>
        {calendarCells.map((day, idx) => {
          const dateStr = day
            ? currentMonth.date(day).format("YYYY-MM-DD")
            : null;
          const count = dataMap[dateStr] || 0;

          return (
            <DayCell
              key={idx}
              $color={getLevelColor(count)}
              onClick={() => handleSelect(day)}
            >
              {day || ""}
            </DayCell>
          );
        })}
      </Grid>

      <Legend>
        <span>적음</span>
        <ColorDot style={{ backgroundColor: "#f1f3f5" }} />
        <ColorDot style={{ backgroundColor: "#e3f7c4" }} />
        <ColorDot style={{ backgroundColor: "#d4f28b" }} />
        <ColorDot style={{ backgroundColor: "#b6ed42" }} />
        <span>많음</span>
      </Legend>
    </Card>
  );
};

export default ActivityCalendar;

// ---------- styled ---------- //

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  color: #868e96;
  &:hover {
    color: #212529;
  }
`;

const MonthText = styled.span`
  font-size: 0.95rem;
  color: #495057;
  min-width: 110px;
  text-align: center;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;
`;

const Weekday = styled.div`
  font-size: 0.9rem;
  color: #adb5bd;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const DayCell = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  color: #000;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  color: #868e96;
  font-size: 0.85rem;
`;

const ColorDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
`;
