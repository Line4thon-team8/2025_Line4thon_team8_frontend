import styled, { css } from "styled-components";
import Rectangle from "../../assets/Rectangle.svg";
import Arrow from "../../assets/arrow.svg";
const Concept = () => {
  const toArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

  const mockconcept = [
    {
      concept: "React Hooks",
      new_cc_content: {
        title: "useEffect의 deps(의존성 배열)",
        content: [
          "useEffect(() => {...}, [])는 컴포넌트가 처음 렌더링될 때만 실행됩니다.",
          "배열 안에 변수를 넣으면, 그 값이 바뀔 때마다 effect가 다시 실행됩니다.",
          "렌더링 ≠ 실행: deps에 포함되지 않으면 state가 바뀌어도 effect는 재실행되지 않습니다.",
          "렌더링",
        ],
      },
      redirect_cc_content: {
        wrong: "useEffect는 state가 바뀔 때마다 항상 실행된다.",
        redirect: [
          "useEffect는 의존성 배열에 명시된 값이 바뀔 때만 실행됩니다.",
          "모든 state 변경이 effect를 트리거하지 않습니다.",
          "setState가 실행돼도 deps에 없다면 effect는 재실행되지 않아요.",
        ],
      },
      references: [
        {
          label: "React 공식 문서 - useEffect",
          url: "https://ko.react.dev/reference/react/useEffect#reference",
        },
        {
          label: "React 공식 문서 - useState",
          url: "https://ko.react.dev/reference/react/useState",
        },
        {
          label: "Overreacted: A Complete Guide to useEffect (Dan Abramov)",
          url: "https://overreacted.io/a-complete-guide-to-useeffect/",
        },
      ],
    },

    {
      concept: "async/await",
      new_cc_content: {
        title: "useEffect의 deps(의존성 배열)",
        content: [
          "useEffect(() => {...}, [])는 컴포넌트가 처음 렌더링될 때만 실행됩니다.",
          "배열 안에 변수를 넣으면, 그 값이 바뀔 때마다 effect가 다시 실행됩니다.",
          "렌더링 ≠ 실행: deps에 포함되지 않으면 state가 바뀌어도 effect는 재실행되지 않습니다.",
        ],
      },
      redirect_cc_content: {
        wrong: "useEffect는 state가 바뀔 때마다 항상 실행된다.",
        redirect: [
          "useEffect는 의존성 배열에 명시된 값이 바뀔 때만 실행됩니다.",
          "모든 state 변경이 effect를 트리거하지 않습니다.",
          "setState가 실행돼도 deps에 없다면 effect는 재실행되지 않아요.",
        ],
      },
      references: [
        {
          label: "React 공식 문서 - useEffect",
          url: "https://ko.react.dev/reference/react/useEffect#reference",
        },
        {
          label: "React 공식 문서 - useState",
          url: "https://ko.react.dev/reference/react/useState",
        },
        {
          label: "Overreacted: A Complete Guide to useEffect (Dan Abramov)",
          url: "https://overreacted.io/a-complete-guide-to-useeffect/",
        },
      ],
    },

    {
      concept: "에러 핸들링",
      new_cc_content: {
        title: "useEffect의 deps(의존성 배열)",
        content: [
          "useEffect(() => {...}, [])는 컴포넌트가 처음 렌더링될 때만 실행됩니다.",
          "배열 안에 변수를 넣으면, 그 값이 바뀔 때마다 effect가 다시 실행됩니다.",
          "렌더링 ≠ 실행: deps에 포함되지 않으면 state가 바뀌어도 effect는 재실행되지 않습니다.",
        ],
      },
      redirect_cc_content: {
        wrong: "useEffect는 state가 바뀔 때마다 항상 실행된다.",
        redirect: [
          "useEffect는 의존성 배열에 명시된 값이 바뀔 때만 실행됩니다.",
          "모든 state 변경이 effect를 트리거하지 않습니다.",
          "setState가 실행돼도 deps에 없다면 effect는 재실행되지 않아요.",
        ],
      },
      references: [
        {
          label: "React 공식 문서 - useEffect",
          url: "https://ko.react.dev/reference/react/useEffect#reference",
        },
        {
          label: "React 공식 문서 - useState",
          url: "https://ko.react.dev/reference/react/useState",
        },
        {
          label: "Overreacted: A Complete Guide to useEffect (Dan Abramov)",
          url: "https://overreacted.io/a-complete-guide-to-useeffect/",
        },
      ],
    },
  ];
  return (
    <ConceptWrap>
      <ConceptTitle>
        {mockconcept.map((item, i) => {
          const conceptId = `concept-${i}`;
          return (
            <C_DetailWrap id={conceptId} key={item.concept}>
              <C_DetailTitle>
                <img src={Rectangle} />
                {item.concept}
              </C_DetailTitle>

              <Cc_Title>새로운 개념</Cc_Title>
              <Cc_Detail>
                <Cc_DetailTitle>{item.new_cc_content.title}</Cc_DetailTitle>
                <ul>
                  {item.new_cc_content.content.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </Cc_Detail>

              <Cc_Title>바로 잡은 개념</Cc_Title>
              <Re_Detail>
                <WrongCcWrap>
                  <Cc_DetailTitle>잘못된 이해</Cc_DetailTitle>
                  <ul>
                    {toArray(item.redirect_cc_content.wrong).map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </WrongCcWrap>

                <img src={Arrow} />
                <Re_WrongWrap>
                  <Cc_DetailTitle>올바른 이해</Cc_DetailTitle>
                  <ul>
                    {item.redirect_cc_content.redirect.map((j, i) => (
                      <li key={i}>{j}</li>
                    ))}
                  </ul>
                </Re_WrongWrap>
              </Re_Detail>

              <Cc_Title>추천 자료</Cc_Title>
              <C_DataWrap>
                <ul>
                  {item.references.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </C_DataWrap>
              <hr />
            </C_DetailWrap>
          );
        })}
      </ConceptTitle>
    </ConceptWrap>
  );
};

export default Concept;

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
    font-weight: 400;
    font-size: 16px;
  }
`;

const ConceptWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: stretch;
`;

const ConceptTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  img {
    width: 23px;
    height: 103px;
  }
`;

const C_DetailWrap = styled.div`
  & > hr {
    margin-top: 104px;
  }

  &:last-child > hr {
    display: none;
  }
`;

const C_DetailTitle = styled.div`
  display: flex;
  gap: 23px;
  flex-direction: center;
  align-items: center;

  font-family: "Noto Sans", Bold;
  font-size: 64px;
  font-weight: 700;

  margin-bottom: 47px;
`;

const Cc_Title = styled.div`
  font-family: "Noto Sans", SemiBold;
  font-size: 32px;
  font-weight: 600;
  color: #000000;

  margin-bottom: 15px;
`;

const Cc_Detail = styled.div`
  margin-bottom: 60px;

  width: 1140px;
  min-height: 217px;

  ${StyledCcWrap};
`;

const Cc_DetailTitle = styled.div`
  margin-bottom: 18px;

  font-family: "Noto Sans", Medium;
  font-weight: 500;
  font-size: 20px;
`;

const Re_Detail = styled.div`
  margin-bottom: 60px;

  display: flex;
  flex-direction: center;
  align-items: center;
  gap: 47px;

  > img {
    width: 73px;
    height: 73px;
    padding: 24.33px 18.25px 24.33px 15.21px;
  }
`;

const WrongCcWrap = styled.div`
  width: 495px;
  min-height: 313px;

  ${StyledCcWrap};
`;

const Re_WrongWrap = styled.div`
  width: 483px;
  min-height: 312px;

  padding: 40px 36px !important;

  ${StyledCcWrap};
`;

const C_DataWrap = styled.div`
  width: 1140px;
  min-height: 217px;

  padding: 35px !important;

  ${StyledCcWrap};

  > ul {
    display: flex;
    flex-direction: column;
    gap: 26px;
    line-stlye: none;
    padding-left: 0;
  }

  > ul a {
    text-decoration: underline;
  }
`;
