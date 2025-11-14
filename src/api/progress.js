// src/api/progress.js
import api from "./axios";

/**
 * 학습 진행 SSE 스트림 연결
 *
 * 사용 예:
 * const stop = connectEntranceProgress({
 *   entranceId,
 *   onEvent: (type, data) => { ... },   // 공통 콜백
 *   onStart: (data) => {},
 *   onDone: (data) => {},
 *   onUpdate: (data) => {},
 *   onComplete: (data) => {},
 *   onError: (error) => {},
 * });
 *
 * // 컴포넌트 unmount 시
 * stop();
 */
export const connectEntranceProgress = ({
  entranceId,
  onEvent,
  onStart,
  onDone,
  onUpdate,
  onComplete,
  onError,
}) => {
  if (!entranceId) {
    throw new Error("entranceId가 필요합니다.");
  }

  // axios 인스턴스의 baseURL 재사용
  const baseURL = (api.defaults.baseURL || "").replace(/\/+$/, "");
  const url = `${baseURL}/entrance/progress?entranceId=${entranceId}`;

  console.log("[SSE] connect:", url);

  // 필요하면 withCredentials 옵션도 줄 수 있음
  const es = new EventSource(url, { withCredentials: true });

  const makeHandler = (type, specificHandler) => (event) => {
    try {
      const data = JSON.parse(event.data);

      // 공통 콜백
      if (onEvent) {
        onEvent(type, data);
      }
      // 타입별 콜백
      if (specificHandler) {
        specificHandler(data);
      }
    } catch (e) {
      console.error("[SSE] JSON parse 에러:", e, event.data);
    }
  };

  es.addEventListener("start", makeHandler("start", onStart));
  es.addEventListener("done", makeHandler("done", onDone));
  es.addEventListener("update", makeHandler("update", onUpdate));
  es.addEventListener("complete", makeHandler("complete", onComplete));

  es.onerror = (err) => {
    console.error("[SSE] error:", err);
    if (onError) onError(err);
  };

  // 정리용 함수 반환
  const stop = () => {
    console.log("[SSE] close");
    es.close();
  };

  return stop;
};