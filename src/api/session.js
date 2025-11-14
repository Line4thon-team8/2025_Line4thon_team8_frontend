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

// --------- (4단계) 분석 진행 상태 구독 (SSE) --------- //
export const subscribeProgress = (entranceId, listeners) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/entrance/progress?entranceId=${entranceId}`;

  const eventSource = new EventSource(url, { withCredentials: false });

  // 기본 메시지 이벤트
  eventSource.onmessage = (event) => {
    if (listeners.onMessage) {
      listeners.onMessage(JSON.parse(event.data));
    }
  };

  // 단계 시작 이벤트
  eventSource.addEventListener("start", (event) => {
    if (listeners.onStart) {
      listeners.onStart(JSON.parse(event.data));
    }
  });

  // 단계 완료 이벤트
  eventSource.addEventListener("done", (event) => {
    if (listeners.onDone) {
      listeners.onDone(JSON.parse(event.data));
    }
  });

  // 중간 업데이트 이벤트 (예: 개념 수, progress 비율)
  eventSource.addEventListener("update", (event) => {
    if (listeners.onUpdate) {
      listeners.onUpdate(JSON.parse(event.data));
    }
  });

  // 모든 분석 완료 이벤트
  eventSource.addEventListener("complete", (event) => {
    if (listeners.onComplete) {
      listeners.onComplete();
      eventSource.close();
    }
  });

  // 에러 처리
  eventSource.onerror = (error) => {
    console.error("SSE Error:", error);
    eventSource.close();
  };

  // 컴포넌트에서 종료하고 싶을 때 사용할 수 있도록 반환
  return eventSource;
};
