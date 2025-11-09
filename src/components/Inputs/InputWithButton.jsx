import styled from "styled-components";

const InputWithButton = ({
  type = "text",
  placeholder,
  buttonText = "확인",
  onButtonClick,
  ...props
}) => {
  return (
    <Wrapper>
      <StyledInput type={type} placeholder={placeholder} {...props} />
      <StyledButton onClick={onButtonClick}>{buttonText}</StyledButton>
    </Wrapper>
  );
};

export default InputWithButton;

// ---------- styles ---------- //
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 8px 12px;
  border: 1px solid #868686;
  border-radius: 8px;
  background: #fff;
  gap: 4px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #b0b0b0;
  }
`;

const StyledButton = styled.button`
  flex-shrink: 0;
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #868686;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #eee;
  }
`;
