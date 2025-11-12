// 활동 캘린더 (square chart)// src/components/ActivityCalendar.jsx

import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";

const ActivityCalendar = ({ onDateSelect, activityData = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // 🟩 API 데이터 → { "YYYY-MM-DD": count } 형태로 변환
  const dataMap = activityData.reduce((acc, item) => {
    acc[item.reportDate] = item.count;
    return acc;
  }, {});

  // 🗓️ 월별 날짜 계산
  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day(); // 일(0)~토(6)
  const emptyStart = Array(firstDay).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarCells = [...emptyStart, ...daysArray];

  // 📅 날짜 선택 시 부모로 전달
  const handleSelect = (day) => {
    if (!day) return;
    const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
    onDateSelect(dateStr);
  };

  // 📈 색상 단계 계산 함수
  const getLevelColor = (count) => {
    if (count === 0) return "#f1f3f5";      // 없음
    if (count >= 1 && count <= 5) return "#e3f7c4"; // 적음
    if (count >= 6 && count <= 10) return "#d4f28b"; // 중간
    if (count >= 11) return "#b6ed42";       // 많음
    return "#f1f3f5"; // fallback
  };

  return (
    <Card>
      <Header>
        <Title>활동 캘린더</Title>
        <MonthText>{currentMonth.format("YYYY년 M월")}</MonthText>
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

// ---------- styled-components ---------- //

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

const MonthText = styled.span`
  font-size: 0.95rem;
  color: #868e96;
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
