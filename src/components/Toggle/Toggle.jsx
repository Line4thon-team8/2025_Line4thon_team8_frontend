import styled from "styled-components";

const Toggle = ({ value, onChange }) => {
  return (
    <ToggleWrap>
      <Inner>
        <Pill $active={!value} onClick={() => onChange(false)}>
          주제별 리포트
        </Pill>

        <Pill $active={value} onClick={() => onChange(true)}>
          통합 리포트
        </Pill>
      </Inner>
    </ToggleWrap>
  );
};

export default Toggle;

/* ---------------- styled-components ---------------- */

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 332px;
  height: 56px;

  background: #ffffff;
  border-radius: 100px;
  padding: 4px;

  box-sizing: border-box;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 100px;
  overflow: hidden;
`;

const Pill = styled.button`
  flex: 1;
  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 100px;

  font-family: "Noto Sans", 700;
  font-size: 16px;

  transition: 0.28s ease;

  background: ${(p) => (p.$active ? "#000" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "#000")};
`;
