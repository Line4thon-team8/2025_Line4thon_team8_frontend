// 사용자 정보, 통계
// src/components/ProfileCard.jsx
import styled from "styled-components";

const ProfileCard = ({ user }) => {
  return (
    <Card>
      <Left>
        <Avatar />
        <Info>
          <Nickname>{user?.nickname || "사용자 닉네임"}</Nickname>
          <StatRow>
            <StatBox>
              <StatValue>{user?.totalSessionCount ?? 0}</StatValue>
              <StatLabel>총 분석 세션</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{user?.reportCount ?? 0}</StatValue>
              <StatLabel>생성된 리포트</StatLabel>
            </StatBox>
            <StatBox $highlight>
              <StatValue>{user?.newConceptCount ?? 0}</StatValue>
              <StatLabel>새로운 개념</StatLabel>
            </StatBox>
            <StatBox $highlight>
              <StatValue>{user?.fixedConceptDiff ?? 0}</StatValue>
              <StatLabel>바로 잡은 개념</StatLabel>
            </StatBox>
          </StatRow>
        </Info>
      </Left>
      <EditBtn>프로필 수정</EditBtn>
    </Card>
  );
};

export default ProfileCard;

// ---------- styled ---------- //

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e9ecef;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Nickname = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
`;

const StatRow = styled.div`
  display: flex;
  gap: 16px;
`;

const StatBox = styled.div`
  background-color: ${({ $highlight }) => ($highlight ? "#d8f98b" : "#f8f9fa")};
  border-radius: 10px;
  padding: 12px 18px;
  text-align: center;
`;

const StatValue = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
`;

const StatLabel = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

const EditBtn = styled.button`
  background: #000;
  color: #fff;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 600;
`;
