import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Button from "../../components/Buttons/Button";
import SegmentedControl from "../../components/Buttons/SegmentedControl";
import { useState } from "react";
import { startSession } from "../../api/session";

const SelectTopicPage = () => {
  const location = useLocation();
  const { topics } = location.state || { topics: [] };
  const [mode, setMode] = useState("특정주제");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const COLORS = ["#A5B4FC", "#818CF8", "#6366F1", "#4F46E5"];

  const handleCreateSession = async () => {
    const userId = localStorage.getItem("userId");
    const extractId = new URLSearchParams(location.search).get("extractId");
    if (!userId) return alert("로그인 후 이용해주세요!");

    const topic =
      mode === "전체통합"
        ? topics.map((t) => t.name).join(",")
        : selectedTopic || "";

    try {
      const res = await startSession(userId, extractId, mode, topic);
      alert(`세션 생성 완료! ID: ${res.entranceId}`);
    } catch (err) {
      console.error(err);
      alert("세션 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>분석할 내용을 선택하세요</Title>
      <Description>AI가 대화 내용을 분석해 학습 리포트를 준비합니다.</Description>

      <SegmentedControl
        options={["전체통합", "특정주제"]}
        onChange={setMode}
      />

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topics}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              onClick={(entry) => setSelectedTopic(entry.name)}
            >
              {topics.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                />
              ))}
            </Pie>
            <Tooltip formatter={(v, n) => [`${v}%`, n]} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <Button variant="primary" onClick={handleCreateSession}>
        세션 생성하기
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
  justify-content: flex-start;
  padding-top: 15vh;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3rem;
  color: #000000;
  text-align: center;
  line-height: 160%;
`;

const ChartWrapper = styled.div`
  width: 320px;
  height: 320px;
  margin: 3rem;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`