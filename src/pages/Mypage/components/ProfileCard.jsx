// 사용자 정보, 통계

import styled from "styled-components";

const ProfileCard = () => {
  return (
    <Card>
      <UserInfo>
        <Avatar />
        <InfoText>
          <Name>사용자 닉네임</Name>
          <StatBox>
            <StatItem>
              <StatValue>12</StatValue>
              <StatLabel>총 리포트</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>8</StatValue>
              <StatLabel>활동 일수</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>6</StatValue>
              <StatLabel>학습 주제</StatLabel>
            </StatItem>
          </StatBox>
        </InfoText>
      </UserInfo>
      <EditButton>프로필 수정</EditButton>
    </Card>
  );
};

export default ProfileCard;

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  background-color: #e9ecef;
  border-radius: 50%;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
`;

const StatBox = styled.div`
  display: flex;
  gap: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
`;

const StatLabel = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

const EditButton = styled.button`
  background: #000;
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
`;
