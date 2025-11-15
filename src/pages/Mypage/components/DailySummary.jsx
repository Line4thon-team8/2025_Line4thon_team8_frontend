import styled from "styled-components";

const DailySummary = ({ selectedDate, reports = [] }) => {
  const formatted = new Date(selectedDate).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <Header>
        <h3>{formatted}</h3>
      </Header>

      {reports.length > 0 ? (
        <ul>
          {reports.map((r) => (
            <Item key={r.id}>{r.title}</Item>
          ))}
        </ul>
      ) : (
        <Empty>이 날짜에는 리포트가 없습니다.</Empty>
      )}
    </Card>
  );
};

export default DailySummary;

// ---------- styled ---------- //
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  padding-left: 70px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 8px;
`;

const Empty = styled.p`
  color: #adb5bd;
  margin-top: 10px;
`;

