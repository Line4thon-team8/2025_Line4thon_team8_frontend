// src/api/entrance.js
import client from "./client";

// POST /entrance/start
export const startEntrance = async ({ userId, extractId, option, topics }) => {

  const body = {
      userId: userId ?? 1,
      extractId: extractId ?? 1,
      option: option ?? "특정주제",
      topic: topics?.length > 0 ? topics.join(",") : "SSL,TLS,보안 프로토콜"
  };

  const { data } = await client.post("/entrance/start", body);
  console.log("/entrance/start respone: ", data);
  
  return data; //entranceId
};