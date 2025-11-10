// 활동 캘린더 (square chart)
import styled from "styled-components";
import { useState } from "react";
import dayjs from "dayjs";

const ActivityCalendar = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs("2025-10-01")); // 기본 2025년 10월

  // 더미 데이터 (활동 강도)
  const activityData = {
    "2025-10-01": 3,
    "2025-10-09": 4,
    "2025-10-13": 2,
    "2025-10-23": 1,
  };

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = currentMonth.startOf("month").day(); // 0=일, 1=월...

  // 앞쪽 공백칸 (이전달)
  const emptyStart = Array(firstDayOfWeek).fill(null);
  // 현재 달 날짜 배열
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // 전체 배열
  const calendarCells = [...emptyStart, ...daysArray];

  // 날짜 선택 시 부모에 전달
  const handleSelect = (day) => {
    if (!day) return;
    const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
    onDateSelect(dateStr);
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
          const level = activityData[dateStr] || 0;

          return (
            <DayCell
              key={idx}
              $level={level}
              onClick={() => handleSelect(day)}
            >
              {day || ""}
            </DayCell>
          );
        })}
      </Grid>

      <Legend>
        <span>적음</span>
        <ColorDot $level={1} />
        <ColorDot $level={2} />
        <ColorDot $level={3} />
        <ColorDot $level={4} />
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
  background-color: ${({ $level }) =>
    $level === 0
      ? "#f1f3f5"
      : $level === 1
      ? "#dee2e6"
      : $level === 2
      ? "#adb5bd"
      : $level === 3
      ? "#495057"
      : "#000"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: ${({ $level }) => ($level ? "pointer" : "default")};
  color: ${({ $level }) => ($level >= 3 ? "#fff" : "#000")};
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: ${({ $level }) => ($level ? "scale(1.1)" : "none")};
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
  background-color: ${({ $level }) =>
    $level === 1
      ? "#dee2e6"
      : $level === 2
      ? "#adb5bd"
      : $level === 3
      ? "#495057"
      : "#000"};
`;
