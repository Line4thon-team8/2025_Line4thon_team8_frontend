import api from "./axios";

export const getResultSummary = async (entranceId, userId) => {
  const res = await api.get("/result/summary", {
    params: {
      entranceId,
      userId,
    },
  });

  return res.data;
};
