import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Button from "../../components/Buttons/Button";
import SegmentedControl from "../../components/Buttons/SegmentedControl";
import { useState } from "react";
import { startSession } from "../../api/session";

const COLORS = ["#DAF77A", "#C8EF7F", "#B9E774", "#A6DE65"];

const SelectTopicPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { topics } = location.state || { topics: [] };

  // 🔥 스웨거 스펙에 맞게 수정
  const [mode, setMode] = useState("전체통합");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleCreateSession = async () => {
    const userId = localStorage.getItem("userId");
    const extractId = new URLSearchParams(location.search).get("extractId");

    if (!userId) return alert("로그인 후 이용해주세요!");

    // 전체통합이면 topic 은 "전체"
    const topic =
      mode === "전체통합" ? "전체" : selectedTopic ?? "";

    if (mode === "특정주제" && !selectedTopic) {
      return alert("특정 주제를 먼저 선택해주세요!");
    }

    try {
      const res = await startSession(userId, extractId, mode, topic);

      // LocalStorage 저장
      localStorage.setItem("entranceId", res.entranceId);
      localStorage.setItem("extractId", extractId);

      alert(`세션이 성공적으로 생성되었습니다!\n세션 ID: ${res.entranceId}`);

      navigate(`/progress?entranceId=${res.entranceId}`, {
        state: {
          topics: mode === "전체통합"
            ? topics.map((t) => t.name)
            : [selectedTopic]
        }
      });
    } catch (err) {
      console.error(err);
      alert("세션 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>분석할 내용을 선택하세요</Title>
      <Description>
        AI가 대화 내용을 분석해 학습 리포트를 준비합니다.
      </Description>

      {/* 🔥 모드 선택 — 전체통합 | 특정주제 */}
      <SegmentedControl
        options={["전체통합", "특정주제"]}
        onChange={setMode}
        defaultValue="전체통합"
      />

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topics}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={110}
              onClick={(entry) => mode === "특정주제" && setSelectedTopic(entry.name)}
            >
              {topics.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                  opacity={
                    mode === "특정주제" &&
                    selectedTopic &&
                    selectedTopic !== entry.name
                      ? 0.4
                      : 1
                  }
                />
              ))}
            </Pie>
            <Tooltip formatter={(v, n) => [`${v}%`, n]} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* 오른쪽 옆에 뜨는 UI */}
      {selectedTopic && mode === "특정주제" && (
        <SelectedTopicTag>{selectedTopic}</SelectedTopicTag>
      )}

      {/* 버튼 활성화/비활성화 조건 */}
      <Button
        variant="primary"
        onClick={handleCreateSession}
        disabled={mode === "특정주제" && !selectedTopic}
      >
        분석하기
      </Button>
    </Container>
  );
};

export default SelectTopicPage;


// ---------------- Styled Components ---------------- //

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #555;
  text-align: center;
`;

const ChartWrapper = styled.div`
  width: 360px;
  height: 360px;
  margin-bottom: 1.5rem;
  position: relative;
`;

const SelectedTopicTag = styled.div`
  background: #dff58a;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1.5rem;
`;
