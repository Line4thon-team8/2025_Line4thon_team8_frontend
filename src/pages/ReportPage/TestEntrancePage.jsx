// 예시: EntranceStartPage나 SessionPage 같은 곳
import { analyze } from "../../api/analyze";
import { startEntrance } from "../../api/entrance";
import { useNavigate } from "react-router-dom";

const TestEntrancePage = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    // 1) Chat 분석으로 topics 뽑기
    const { extractId, topics } = await analyze({
      userId: 1,
      // url: 사용자가 입력한 공유 링크 등...
    });

    // 2) entrance 시작 (서버에 세션 등록)
    const entranceId = await startEntrance({
      userId: 1,
      extractId,
      option: "특정주제",
      topics, // 여기서 서버에도 topics 전달
    });

    // 3) Report 페이지로 이동하면서 state에 싹 다 심어주기
    navigate("/report", {
      state: {
        entranceId,
        userId: 1,
        topics, // ★ Report.jsx에서 여기 걸 받는 거야
      },
    });
  };

  return <button onClick={handleStart}>리포트 보러가기</button>;
};

export default TestEntrancePage;