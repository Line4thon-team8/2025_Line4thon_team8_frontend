import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// 마이페이지 기본 정보 (닉네임, 통계, 오늘 리포트)
export const getUserMyPage = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/user/mypage`, {
      params: { userId },
    });
    return res.data;
  } catch (err) {
    console.error("❌ 마이페이지 데이터 불러오기 실패:", err);
    throw err;
  }
};

// 활동 캘린더 데이터
export const getUserActivity = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/user/mypage/activity`, {
      params: { userId },
    });
    return res.data;
  } catch (err) {
    console.error("❌ 활동 캘린더 데이터 불러오기 실패:", err);
    throw err;
  }
};

// 날짜별 리포트 조회
export const getReportsByDate = async (userId, date) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/report/by-date`, {
      params: { userId, date },
    });
    return res.data; // ✅ ex: [{ id: 1, title: "React Hooks 학습 리포트" }]
  } catch (err) {
    console.error("❌ 날짜별 리포트 조회 실패:", err);
    return [];
  }
};

// 폴더 목록 조회
export const getUserFolders = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/report/folders`, {
      params: { userId },
    });
    return res.data; // ex: [{ id: 1, name: "React 학습" }]
  } catch (err) {
    console.error("❌ 폴더 목록 조회 실패:", err);
    return [];
  }
};

// 폴더 내 리포트 목록 조회
export const getReportsInFolder = async (folderId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/report/${folderId}/reports`);
    return res.data; // ex: [{ reportId, title, createdAt }]
  } catch (err) {
    console.error(`❌ 폴더(${folderId}) 리포트 조회 실패:`, err);
    return [];
  }
};
