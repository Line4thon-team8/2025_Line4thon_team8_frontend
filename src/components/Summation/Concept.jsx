import styled, { css } from "styled-components";
import Rectangle from "../../assets/Rectangle.svg";
import Arrow from "../../assets/arrow.svg";

const Concept = ({ summary }) => {
  if (!summary) return null;

  /* --------------------------
     1. 새로운 개념
  --------------------------- */
  const newKey = summary.newConcept ? Object.keys(summary.newConcept)[0] : null;
  const newList =
    summary.newConcept?.새로알게된
      ? Object.values(summary.newConcept.새로알게된)
      : [];


/* --------------------------
   2. 바로잡은 개념
--------------------------- */

// ‘바로잡은’ 안의 모든 객체 꺼내기 (1,2,3…)
const redirectItems = summary.redirectConcept?.바로잡은
  ? Object.values(summary.redirectConcept.바로잡은)
  : [];

  /* --------------------------
     3. 추천 자료
  --------------------------- */
  const refKey = summary.reference ? Object.keys(summary.reference)[0] : null;

  const referenceList =
    summary.reference?.추천자료
      ? Object.values(summary.reference.추천자료)
      : [];

  return (
    <ConceptWrap id="concept-0">
      <C_DetailWrap>
        <C_DetailTitle>
          <img src={Rectangle} alt="" />
          {summary.topic}
        </C_DetailTitle>

        {/* 🔵 새로운 개념 */}
        {newList.length > 0 && (
          <>
            <Cc_Title>새로운 개념</Cc_Title>
            <Cc_Detail>
              <ul>
                {newList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Cc_Detail>
          </>
        )}

        {/* 🟠 바로 잡은 개념 */}
        {redirectItems.length > 0 && (
          <>
            <Cc_Title>바로 잡은 개념</Cc_Title>

            {redirectItems.map((item, i) => (
              <Re_Detail key={i}>
                <WrongCcWrap>
                  <Cc_DetailTitle>잘못된 이해</Cc_DetailTitle>
                  <ul>
                    <li>{item.잘못된이해}</li>
                  </ul>
                </WrongCcWrap>

                <img src={Arrow} alt="" />

                <Re_WrongWrap>
                  <Cc_DetailTitle>올바른 이해</Cc_DetailTitle>
                  <ul>
                    {Array.isArray(item.올바른이해)
                      ? item.올바른이해.map((v, idx) => <li key={idx}>{v}</li>)
                      : <li>{item.올바른이해}</li>
                    }
                  </ul>
                </Re_WrongWrap>
              </Re_Detail>
            ))}
          </>
        )}


        {/* 🟣 추천 자료 */}
        {referenceList.length > 0 && (
          <>
            <Cc_Title>추천 자료</Cc_Title>
            <C_DataWrap>
              <ul>
                {referenceList.map((ref, i) => (
                  <li key={i}>
                    <a href={ref.링크} target="_blank" rel="noopener noreferrer">
                      {ref.제목}
                    </a>
                  </li>
                ))}
              </ul>
            </C_DataWrap>
          </>
        )}

        <hr />
      </C_DetailWrap>
    </ConceptWrap>
  );
};

export default Concept;

/* ------- 스타일 유지 ------- */

const StyledCcWrap = css`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  > ul {
    margin-left: 15px;
    font-family: "Noto Sans", Regular;
    font-size: 16px;
  }
`;

const ConceptWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: stretch;
`;

const C_DetailWrap = styled.div`
  & > hr {
    margin-top: 104px;
  }
`;

const C_DetailTitle = styled.div`
  display: flex;
  gap: 23px;
  align-items: center;
  font-family: "Noto Sans", Bold;
  font-size: 64px;
  margin-bottom: 47px;
`;

const Cc_Title = styled.div`
  font-family: "Noto Sans", SemiBold;
  font-size: 32px;
  margin-bottom: 15px;
`;

const Cc_Detail = styled.div`
  margin-bottom: 60px;
  width: 1140px;
  ${StyledCcWrap}
`;

const Cc_DetailTitle = styled.div`
  margin-bottom: 18px;
  font-family: "Noto Sans", Medium;
  font-size: 20px;
`;

const Re_Detail = styled.div`
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  gap: 47px;
`;

const WrongCcWrap = styled.div`
  width: 495px;
  ${StyledCcWrap}
`;

const Re_WrongWrap = styled.div`
  width: 483px;
  padding: 40px 36px !important;
  ${StyledCcWrap}
`;

const C_DataWrap = styled.div`
  width: 1140px;
  padding: 35px !important;
  ${StyledCcWrap}
  > ul {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  > ul a {
    text-decoration: underline;
  }
`;
