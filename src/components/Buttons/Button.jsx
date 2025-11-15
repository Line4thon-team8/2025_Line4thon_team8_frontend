import styled, { css } from "styled-components";

// 버튼 컴포넌트 정의
const Button = ({ children, variant = "primary", ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;


//----------- Style ------------//

const StyledButton = styled.button`
  border-radius: 12px;
  font-weight: 600;
  padding: 15px 64px;
  transition: all 0.2s ease;
  cursor: pointer;
    &:disabled {
    background-color: #cccccc !important;   /* 회색 배경 */
    color: #777777 !important;              /* 흐린 글자색 */
    cursor: not-allowed;                    /* 커서 변경 */
    border: none !important;
    box-shadow: none !important;
    opacity: 0.7;                            /* 비활성화 느낌 */
  }

  // primary button
  ${({ variant }) => variant === "primary" && css`
    width: 220px;
    height: 52px;
    background-color: #000;
    color: white;
    &:hover {
      background-color: #212529;
    }
  `}

  // secondary button
  /* 공통 secondary 스타일 */
  ${({ variant }) => variant === "secondary" && css`
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease;
  `}

  /* subVariant별 세부 분기 */
  ${({ variant, subVariant }) =>
    variant === "secondary" && subVariant === "filled" && css`
      background-color: #495057;
      color: white;
      border: none;
    `}

  ${({ variant, subVariant }) =>
    variant === "secondary" && subVariant === "outlined" && css`
      background-color: #f9f6f2;
      color: #343a40;
      border: 1.5px solid #d1d1d1;
    `}

  // tag button
  ${({ variant }) => 
    variant === "tag" &&
    css`
    background-color: #ffffff;
    color: #2b1f14;
    border-radius: 20px;
    font-size: 0.9rem;
    padding: 6px 12px;

    &:hover {
      background-color: #f3e9de;
    }
  `}
`;
