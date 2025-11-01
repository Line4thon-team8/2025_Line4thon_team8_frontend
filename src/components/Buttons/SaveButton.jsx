import styled, { css } from "styled-components";

const SaveButton = ({ children, active = false, ...props }) => {
  return (
    <StyledTopicButton active={active} {...props}>
      {children}
    </StyledTopicButton>
  );
};

export default SaveButton;

const StyledTopicButton = styled.button`
  border: 1.5px solid #d1d1d1;
  background-color: #ffffff;
  color: #343a40;
  font-weight: 600;
  border-radius: 12px;
  padding: 14px 26px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #F1E4D8;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #343a40;
      color: white;
      border-color: #343a40;
      &:hover {
        background-color: #212529;
      }
    `}
`;
