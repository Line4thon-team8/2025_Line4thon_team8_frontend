// 최근 리포트 리스트

import styled from "styled-components";

const RecentReports = () => {
  return (
    <Card>
      <Header>
        <h3>저장된 리포트</h3>
        <p>폴더 구조로 리포트를 관리합니다</p>
      </Header>

      <Folder>
        <FolderName>📂 React 학습</FolderName>
        <File>
          <span>React Hooks 학습 리포트</span>
          <Date>2025.10.30</Date>
        </File>
        <File>
          <span>React 학습 리포트</span>
          <Date>2025.10.27</Date>
        </File>
      </Folder>

      <Folder>
        <FolderName>📂 JavaScript 기초</FolderName>
      </Folder>

      <Folder>
        <FolderName>📂 TypeScript</FolderName>
      </Folder>
    </Card>
  );
};

export default RecentReports;

// ---------- styled ---------- //

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 16px;
  h3 {
    font-weight: 600;
    font-size: 1rem;
  }
  p {
    color: #868e96;
    font-size: 0.85rem;
  }
`;

const Folder = styled.div`
  margin-top: 8px;
`;

const FolderName = styled.p`
  font-weight: 600;
  margin-bottom: 6px;
`;

const File = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 10px 16px;
  border-radius: 8px;
  margin-left: 16px;
  margin-bottom: 6px;
`;

const Date = styled.span`
  color: #868e96;
  font-size: 0.85rem;
`;
