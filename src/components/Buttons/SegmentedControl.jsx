import styled from "styled-components";
import { useState } from "react";

const SegmentedControl = ({ options = [], onChange }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (option) => {
    setSelected(option);
    onChange && onChange(option);
  };

  return (
    <Wrapper>
      {options.map((option) => (
        <SegmentButton
          key={option}
          $active={selected === option}
          onClick={() => handleClick(option)}
        >
          {option}
        </SegmentButton>
      ))}
    </Wrapper>
  );
};

export default SegmentedControl;

// ---------------- styled-components ---------------- //

const Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 999px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  padding: 4px;
  width: fit-content;
`;

const SegmentButton = styled.button`
  flex: 1;
  border: none;
  background-color: ${({ $active }) => ($active ? "#000" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  font-weight: 600;
  font-size: 15px;
  border-radius: 999px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#000" : "#f2f2f2")};
  }
`;
