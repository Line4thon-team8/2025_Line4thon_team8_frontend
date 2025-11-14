// src/api/report.js
import api from "./axios";

/**
 * 리포트 생성 API
 * @param entranceId
 * @param userId
 * @param options "TOTAL" | "TOPIC"
 * @param tags   ex: { "로그인 방법": "POST" }
 * @param tag    TOTAL일 때 ex: "POST"
 */
export const createReport = async ({ 
  entranceId, 
  userId, 
  options, 
  tags, 
  tag 
}) => {

  const payload = { entranceId, userId, options };

  // 🔥 TOTAL 리포트 → tag 1개
  if (options === "TOTAL") {
    payload.tag = tag;
  }

  // 🔥 TOPIC 리포트 → tags 객체
  if (options === "TOPIC") {
    payload.tags = tags;
  }

  console.log("[createReport] payload:", payload);

  const { data } = await api.post("/report", payload);

  console.log("[createReport] 응답:", data);
  
  // 백엔드 응답 예시:
  // {
  //   "reports": [
  //     { "reportId": 110 }
  //   ]
  // }
  return data;
};


// 리포트 단건 조회 GET /report/{reportId}
export const getReportById = async (reportId) => {
  const { data } = await api.get(`/report/${reportId}`);
  return data;
};

// 리포트 상세 조회 (entranceId + userId + topic 기준)
export const getReportDetail = async ({ entranceId, userId, topic }) => {
  const { data } = await api.get("/report/detail", {
    params: { entranceId, userId, topic },
  });
  console.log("백엔드 리포트 생성 응답(detail): ", data);
  return data;
};

// 날짜 기준 리포트 조회 GET /report/by-date?userId=...&date=...
export const getReportByDate = async ({ userId, date }) => {
  const { data } = await api.get("/report/by-date", {
    params: {
      userId: userId ?? 2,
      date: date ?? new Date().toISOString().slice(0, 10),
    },
  });
  return data;
};

// 리포트 마크다운으로 내보내기
export const exportMarkdown = async (reportId) => {
  const { data } = await api.get(`/report/export/${reportId}/markdown`, {
    responseType: "text", // 문자열 그대로 받기
  });
  return data;
};

// 노션으로 내보내기
export const exportToNotion = async (reportId, email, parentPageId) => {
  const { data } = await api.post(
    `/report/export/${reportId}/notion`,
    null,
    {
      params: {
        email,
        parentPageId,
      },
    }
  );
  return data;
};