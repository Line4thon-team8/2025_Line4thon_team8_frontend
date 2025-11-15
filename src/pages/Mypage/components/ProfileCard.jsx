// 사용자 정보, 통계

import styled from "styled-components";

const ProfileCard = ({ user }) => {
  return (
    <Card>
      <Left>
        <Info>
          <Div>
          <Avatar />
          <Nickname>{user?.nickname || "사용자 닉네임"}</Nickname>
          </Div>
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
              <StatValue>{user?.fixedConceptCount ?? 0}</StatValue>
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
  background-color: #f3f4f6;
  border-radius: 16px;
  padding: 44px 52px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 버튼이 위에 붙도록 */
`;

const Div = styled.div`
  display: flex;
  gap :30px;
  align-items: center;
  margin-left: 10px;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  background-color: #d4d4d8;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Nickname = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
`;

const StatRow = styled.div`
  display: flex;
  gap: 14px;
`;

/* 사진처럼 박스를 얇고 가로 길게 만들고 그림자 추가 */
const StatBox = styled.div`
  width: 130px;
  padding: 14px 10px;
  background-color: ${({ $highlight }) => ($highlight ? "#D4F98B" : "#ffffff")};
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;   /* 텍스트 중앙정렬 */
  justify-content: center;
  gap: 6px;
`;

/* 라벨이 위에 */
const StatLabel = styled.p`
  font-size: 0.85rem;
  color: #444;
  font-weight: 500;
`;

/* 값이 아래 */
const StatValue = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
`;

const EditBtn = styled.button`
  background: #ffffff;
  border: 1px solid #d1d5db;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  position: relative;
  top: -5px; /* 사진처럼 상단에 붙게 */
`;
