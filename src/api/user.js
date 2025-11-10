import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerUser = async (email, nickname, password) => {
  try {
    const res = await api.post("/api/user", {
      email,
      nickname,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("회원가입 실패:", err.response);
    throw err;
  }
};

export const checkNickname = async (nickname) => {
  try {
    const res = await api.get(`/api/user/check-nickname`, {
      params: { nickname },
    });
    console.log("✅ 닉네임 중복 확인:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 닉네임 중복확인 실패:", err);
    throw err;
  }
};

export const checkEmail = async (email) => {
  try {
    const res = await api.get(`/api/user/check-email`, {
      params: { email },
    });
    console.log("✅ 이메일 중복 확인:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 이메일 중복확인 실패:", err);
    throw err;
  }
};