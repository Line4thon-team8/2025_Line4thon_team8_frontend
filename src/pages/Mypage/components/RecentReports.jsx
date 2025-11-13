// 최근 리포트 리스트

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserFolders, getReportsInFolder } from "../../../api/mypage";

const RecentReports = ({ userId = 1 }) => {
  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [folderReports, setFolderReports] = useState({}); // folderId별 리포트 캐싱

  // ✅ 폴더 목록 불러오기
  useEffect(() => {
    const fetchFolders = async () => {
      const data = await getUserFolders(userId);
      setFolders(data);
    };
    fetchFolders();
  }, [userId]);

  // ✅ 폴더 클릭 시 리포트 가져오기
  const handleToggleFolder = async (folderId) => {
    if (openFolderId === folderId) {
      setOpenFolderId(null);
      return;
    }

    // 이미 가져온 폴더는 캐싱 활용
    if (!folderReports[folderId]) {
      const reports = await getReportsInFolder(folderId);
      setFolderReports((prev) => ({ ...prev, [folderId]: reports }));
    }

    setOpenFolderId(folderId);
  };

  // ✅ 날짜 포맷 함수 (YYYY.MM.DD)
  const formatDate = (isoString) => {
    const d = new window.Date(isoString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <Card>
      <Header>
        <h3>저장된 리포트</h3>
        <p>폴더 구조로 리포트를 관리합니다</p>
      </Header>

      {folders.length === 0 ? (
        <Empty>아직 생성된 폴더가 없습니다.</Empty>
      ) : (
        folders.map((folder) => (
          <Folder key={folder.id}>
            <FolderName onClick={() => handleToggleFolder(folder.id)}>
              {openFolderId === folder.id ? "▼" : "▶"} 📁 {folder.name}
            </FolderName>

            {openFolderId === folder.id &&
              (folderReports[folder.id]?.length > 0 ? (
                folderReports[folder.id].map((report) => (
                  <File key={report.reportId}>
                    <span>{report.title}</span>
                    <ReportDate>{formatDate(report.createdAt)}</ReportDate>
                  </File>
                ))
              ) : (
                <EmptySub>리포트가 없습니다.</EmptySub>
              ))}
          </Folder>
        ))
      )}
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
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    color: #74b816;
  }
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

const ReportDate = styled.span`
  color: #868e96;
  font-size: 0.85rem;
`;

const Empty = styled.p`
  color: #adb5bd;
  text-align: center;
  margin-top: 10px;
`;

const EmptySub = styled.p`
  color: #adb5bd;
  font-size: 0.85rem;
  margin-left: 24px;
`;
