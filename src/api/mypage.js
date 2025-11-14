import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// 항상 숫자 변환 + userId 필수 체크
const ensureUserId = (userId) => {
  if (!userId) throw new Error("❌ userId가 없습니다. 로그인 후 다시 시도해주세요.");
  return Number(userId);
};

// ----- 1) 마이페이지 기본 정보 조회 (닉네임, 통계, 오늘의 리포트) ------ //

export const getUserMyPage = async (userId) => {
  try {
    const uid = ensureUserId(userId);

    const res = await axios.get(`${API_BASE_URL}/api/user/mypage`, {
      params: { userId: uid },
    });

    return res.data; // { nickname, todayReports, ... }
  } catch (err) {
    console.error("❌ 마이페이지 데이터 불러오기 실패:", err);
    throw err;
  }
};

// ----- 2) 활동 캘린더 데이터 조회 ----- //

export const getUserActivity = async (userId) => {
  try {
    const uid = ensureUserId(userId);

    const res = await axios.get(`${API_BASE_URL}/api/user/mypage/activity`, {
      params: { userId: uid },
    });

    return res.data; // ex: [{ date: "2025-10-09", count: 4 }]
  } catch (err) {
    console.error("❌ 활동 캘린더 데이터 불러오기 실패:", err);
    throw err;
  }
};

// ----- 3) 날짜별 리포트 조회 ----- //

export const getReportsByDate = async (userId, date) => {
  try {
    const uid = ensureUserId(userId);

    const res = await axios.get(`${API_BASE_URL}/report/by-date`, {
      params: { userId: uid, date },
    });

    return res.data; // ex: [{ id: 1, title: "리포트 제목" }]
  } catch (err) {
    console.error("❌ 날짜별 리포트 조회 실패:", err);
    return [];
  }
};

// ----- 4) 폴더 목록 조회 ----- //

export const getUserFolders = async (userId) => {
  try {
    const uid = ensureUserId(userId);

    const res = await axios.get(`${API_BASE_URL}/report/folders`, {
      params: { userId: uid },
    });

    return res.data; // ex: [{ id: 11, name: "React 학습" }]
  } catch (err) {
    console.error("❌ 폴더 목록 조회 실패:", err);
    return [];
  }
};

// ----- 5) 특정 폴더 내 리포트 목록 조회 ----- //

export const getReportsInFolder = async (folderId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/report/${folderId}/reports`);
    return res.data; // ex: [{ reportId, title, createdAt }]
  } catch (err) {
    console.error(`❌ 폴더(${folderId}) 리포트 조회 실패:`, err);
    return [];
  }
};
