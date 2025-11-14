import api from "./axios";

// --------- (1단계) 링크 분석 요청 --------- //
export const analyzeChat = async (userId, url) => {
  const res = await api.get("/chat/analyze", {
    params: {
      userId: Number(userId),
      url,
    },
  });
  return res.data; // { extract_id, topic }
};

// --------- (2) 추출된 주제 비율 요청 --------- //
export const getTopicRatio = async (extractId) => {
  const res = await api.get(`/extract/topics/${extractId}`);
  return res.data; // [{ name: "React Hooks", value: 37.5 }, ...]
};

// --------- (3) 최종 세션 생성 (분석하기 클릭 시) --------- //
export const startSession = async (userId, extractId, option, topic) => {
  const res = await api.post("/entrance/start", {
    userId: Number(userId),
    extractId,
    option, // "전체통합" 또는 "특정주제"
    topic, // 쉼표 구분 문자열 예: "React Hooks, async/await"
  });
  return { entranceId: res.data };; // { entranceId: 42 }
};