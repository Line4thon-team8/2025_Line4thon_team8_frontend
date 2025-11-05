import { useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Button from "../../components/Buttons/Button";
import SegmentedControl from "../../components/Buttons/SegmentedControl";

const SelectTopicPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: "React Hooks", value: 40 },
    { name: "async/await", value: 30 },
    { name: "이벤트 핸들링", value: 20 },
    { name: "상태 관리", value: 10 },
  ];

  const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  const handleClick = (topic) => {
    console.log("선택된 주제:", topic);
    // navigate("/progress", { state: { selectedTopic: topic } });
  };

  const handleModeChange = (mode) => {
    console.log("선택된 모드:", mode);
  };

  return (
    <Container>
      <Title>분석할 내용을 선택하세요</Title>
      <Description>
        AI가 대화 내용을 분석해 학습 리포트를 준비합니다.
      </Description>

      <SegmentedControl
        options={["전체 주제 분석", "특정 주제 분석"]}
        onChange={handleModeChange}
      />

      

      <Div>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={(entry) => handleClick(entry.name)}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={activeIndex === index ? 4 : 2}
                  style={{
                    cursor: "pointer",
                    filter:
                      activeIndex === index
                        ? "drop-shadow(0 0 8px rgba(59,130,246,0.7))"
                        : "none",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <Button variant="primary">세션 생성하기</Button>
      </Div>
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