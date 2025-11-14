import client from "./client"

export const createReport = async ({
  entranceId,
  userId,
  options = "TOPIC",
  tag,
  tags,
} = {}) => {

  // 1) 공통 payload 기본값
  const payload = {
    entranceId: 7,  // 지금은 하드코딩 허용
    //entranceId: entranceId ?? 7,
    userId: 2,
    //userId: userId ?? 2,
    options,
  };

  // 2) 옵션별로 body 채우기
  if (options === "TOTAL") {
    payload.tag = tag ?? "POST";
  } else {
    // TOPIC 요청
    payload.tags =
      tags ??
      {
        "로그인 방법": "POST",
        "소셜 계정 연동": "REVIEW",
      };
  }

  // 3) 요청 / 응답 로그 보기
  console.log("[createReport] 요청 payload:", payload);

  const { data } = await client.post("/report", payload);

  console.log("[createReport] 응답 data:", data);

  return data;
};

//리포트 주제별 조회 
// GET /report/{reportId}
export const getReportById = async (reportId=2) => {
    const {data} = await client.get(`/report/${reportId}`);
    return data;
};

//리포트 결과 상세 조회
//GET /report/detail?entrandeId=...&userID=...&topic=...
export const getReportDetail = async ({
    entranceId,
    userId,
    topic,
} = {}) => {
    const {data} = await client.get("report/detail", {
        params: {
            entranceId: entranceId ?? 7,
            userId: userId ?? 2,
            topic: topic ?? "로그인 방법",
        },
    });
    return data;
};

//날짜 기준 리포트 조회
//GET /report/by-data?userId=...&data=...
export const getReportByDate = async ({userId, date}) => {
    const {data} = await client.get("/report/by-date", {
        params: {
            userId: userId ?? 2,
            date: date ?? new Date().toISOString().slice(0, 10),
        },
    });
    return data;
}

// 리포트 마크다운으로 내보내기
export const exportMarkdown = async (reportId) => {
    const {data} = await client.get(`/report/export/${reportId}/markdown`, {
        responseType: "text",
    });
    return data;
};