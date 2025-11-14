// src/api/entrance.js
import api from "./axios";

// POST /entrance/start
export const startEntrance = async ({ userId, extractId, option, topics }) => {
  const body = {
    userId: userId ?? 1,            // integer
    extractId: extractId ?? 1,      // integer
    option: option ?? "특정주제",   // "전체통합" or "특정주제"
    topic: topics?.length > 0       // string: "SSL,TLS,보안 프로토콜"
      ? topics.join(",")
      : "SSL,TLS,보안 프로토콜",
  };

  const { data } = await api.post("/entrance/start", body);
  console.log("/entrance/start response: ", data);

  return {entranceId: data}; // { entranceId: 1 }
};