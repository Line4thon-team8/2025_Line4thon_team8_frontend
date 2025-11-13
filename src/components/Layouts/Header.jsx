// Header.jsx
import styled from "styled-components";
<<<<<<< Updated upstream

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>logo</Logo>
      <ProfileCircle />
=======
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
>>>>>>> Stashed changes
    </HeaderContainer>
  );
};

export default Header;


// ---------------- 스타일 ---------------- //

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #F4F4F5;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 1000;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
`;

const ProfileCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: black;
`;
