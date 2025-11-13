// Header.jsx
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 현재 페이지가 LandingPage인지 여부
  const isLanding = pathname === "/";

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")}>crux</Logo>

      {/* LandingPage에서는 NavItem 숨기기 */}
      {!isLanding && (
        <NavItem onClick={() => navigate("/mypage")}>마이페이지</NavItem>
      )}
    </HeaderContainer>
  );
};

export default Header;


// ---------------- 스타일 ---------------- //

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 10%;
  width: 80%;
  height: 60px;
  border-radius: 0 0 10px 10px;
  background: #D9F58A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 1000;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: #000;
  cursor: pointer;
`;

const NavItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
