// src/api/report.js
import api from "./axios";

// 리포트 생성
export const createReport = async ({
  entranceId,
  userId,
  options = "TOPIC", // "TOTAL" 또는 "TOPIC"
  tag,
  tags,
} = {}) => {
  // 1) 공통 payload 기본값
  const payload = {
    // TODO: 나중에 실제 값으로 교체
    entranceId: entranceId ?? 7,
    userId: userId ?? 2,
    options,
  };

  // 2) 옵션별로 body 채우기
  if (options === "TOTAL") {
    // 통합 리포트
    payload.tag = tag ?? "POST";
  } else {
    // 주제별 리포트
    payload.tags =
      tags ??
      {
        "로그인 방법": "POST",
        "소셜 계정 연동": "REVIEW",
      };
  }

  console.log("[createReport] 요청 payload:", payload);

  const { data } = await api.post("/report", payload);

  console.log("[createReport] 응답 data:", data);

  // 기대 응답 예시:
  // {
  //   reports: [
  //     { reportId: 42, title: "...", results: [...] },
  //     { reportId: 43, title: "...", results: [...] }
  //   ]
  // }
  return data;
};

// 리포트 단건 조회 GET /report/{reportId}
export const getReportById = async (reportId = 2) => {
  const { data } = await api.get(`/report/${reportId}`);
  return data;
};

// 리포트 상세 조회 (entranceId + userId + topic 기준)
export const getReportDetail = async ({
  entranceId,
  userId,
  topic,
} = {}) => {
  const { data } = await api.get("/report/detail", {
    params: {
      entranceId: entranceId ?? 7,
      userId: userId ?? 2,
      topic: topic ?? "로그인 방법",
    },
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