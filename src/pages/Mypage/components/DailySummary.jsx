// 오늘의 하이라이트 (오늘이 기본, 선택된 날짜로 변경 가능)

import styled from "styled-components";

const DailySummary = ({ selectedDate, reportData }) => {
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      })
    : "오늘";

  return (
    <Card>
      <Header>
        <h3>오늘의 요약</h3>
        <DateText>{formattedDate}</DateText>
      </Header>
      {reportData ? (
        <Content>
          <Highlight>📘 {reportData.topic}</Highlight>
          <p>{reportData.summary}</p>
          <Small>분석 리포트 생성 예정</Small>
        </Content>
      ) : (
        <EmptyState>선택된 날짜의 리포트가 없습니다.</EmptyState>
      )}
    </Card>
  );
};

export default DailySummary;

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

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const DateText = styled.span`
  font-size: 0.9rem;
  color: #868e96;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Highlight = styled.h4`
  font-size: 1rem;
  color: #0d6efd;
  font-weight: 600;
`;

const Small = styled.span`
  font-size: 0.85rem;
  color: #adb5bd;
`;

const EmptyState = styled.p`
  color: #adb5bd;
  margin-top: 20px;
  font-size: 0.9rem;
`;
