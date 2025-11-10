// 최근 리포트 리스트

import styled from "styled-components";

const RecentReports = () => {
  const reports = [
    { title: "React Hooks", date: "2025.11.05", id: 1 },
    { title: "async/await", date: "2025.11.04", id: 2 },
    { title: "이벤트 핸들링", date: "2025.11.03", id: 3 },
  ];

  return (
    <Card>
      <Header>
        <h3>최근 리포트</h3>
        <SeeAll>전체보기</SeeAll>
      </Header>
      <List>
        {reports.map((report) => (
          <Item key={report.id}>
            <Title>{report.title}</Title>
            <Date>{report.date}</Date>
          </Item>
        ))}
      </List>
    </Card>
  );
};

export default RecentReports;

// ---------- styled-components ---------- //

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const SeeAll = styled.button`
  background: none;
  border: none;
  color: #0d6efd;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

const Title = styled.span`
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 0.85rem;
  color: #868e96;
`;
