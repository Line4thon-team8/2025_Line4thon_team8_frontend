import styled from "styled-components";
import ProgBar from "../../components/Progress/ProgBar";
import Loader from "../../components/Progress/Loader";
import Check from "../../assets/check.svg";

const Progress = () => {
    {/*Progbar 모의 데이터 */}
    const mockData = [
        {progName: "ReactHook", completed: 100, progtext: "분석완료"},
        {progName: "async/await", completed: 100, progtext: "분석완료"},
        {progName: "에러 핸들링", completed: 10, progtext: "전처리 진행 중..."},
    ]

    const totalCompleted = Math.round(
      mockData.reduce((sum, item) => sum + item.completed, 0) / mockData.length
    );

    const renderStatus = (completed) => 
        completed === 100 ? (
            <CheckImg src={Check} />
        ) : (
            <Loader />
        )

    return (
        <Container>
            <Title>전체 진행 상황</Title>

            {/*total 진행률*/}
            <ProgressWrap>
                <TotalProgWrap>
                    <TotalPer>
                    <ProgSubTitle>진행률</ProgSubTitle>
                    <TotalCompleted>{totalCompleted}%</TotalCompleted>
                    </TotalPer>
                    {/*totalcompoleted = mockdata 평균값*/}
                    <ProgBar 
                        completed={totalCompleted}
                        showPer = {false}
                        width="1113px"
                        height="25px"
                    />
                </TotalProgWrap>
                
                {/*상세 진행률*/}
                {/* mockData.map()으로 반복 렌더링*/}
                <SubProgWrap>
                {mockData.map((item) => (
                    <ProgItem key={item.progName}>
                        <LoaderWrap>
                                <StatusWrap>{renderStatus(item.completed)}</StatusWrap>
                                <Detailtxt>
                                    <DetailWrap>
                                        <ProgName>{item.progName}</ProgName>
                                        <DetailCompleted>{item.completed}%</DetailCompleted>
                                    </DetailWrap>
                                    <ProgText>{item.progtext}</ProgText>
                                </Detailtxt>
                            </LoaderWrap>
                            <ProgBar completed={item.completed} progcheck={item.progcheck}/>
                    </ProgItem>
                ))}
                </SubProgWrap>
            
            
            </ProgressWrap>
        </Container>
    )
}

export default Progress;

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding-bottom: 80px;
`;

const ProgressWrap = styled.div`
    margin-left: 143px;
`;

const Title = styled.div`
    font-family: "Noto Sans", Helvetica;
    font-weight: 700;
    font-size: 56px;
    letter-spacing: -0.56px;
    white-space: nowrap;
    margin-left: 136px;
`;

const ProgSubTitle = styled.div`
    margin-top: 18px;
    font-weight: 400;
    font-size: 24px;
    color:#868686;
    white-space: nowrap;
`;

const TotalCompleted = styled.div`
    font-style: "Noto Sans", SemiBold;
    font-weight: 600;
    font-size: 40px;
    color: #226CFF;
    margin-bottom: 13px;
`;

const TotalPer = styled.div`
    display: flex;
    align-items: center;
    gap: 963px;
`;

const TotalProgWrap = styled.div`
    margin-bottom: 46px;
`

const LoaderWrap = styled.div`
    margin-bottom: 8px;
    display: flex;
`;     

const Detailtxt = styled.div`
    margin-left: 25px;
    flex: 1;
`;

const ProgName = styled.div`
    font-style: "Roboto", SemiBold;
    font-weight: 600;
    font-size: 40px;
`;

const ProgText = styled.div`
    font-style: "Roboto", Regular;
    font-weight: 400;
    font-size: 24px;
    color:#868686;
`;

const DetailCompleted = styled.div`
    font-style: "Roboto", Medium;
    font-weight: 500;
    font-size: 24px;
    color: #226CFF;
    margin-left: auto;
`;

const DetailWrap = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const ProgItem = styled.div`
    background: #ffff;
    padding: 30px 45px;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    border-radius: 30px;
    width: 1113px;
`;

const SubProgWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap : 57px;
`;

const StatusWrap = styled.div`
    display: flex;
    flex-direction: center;
    align-items:center;
`;

const CheckImg = styled.img`
    background-color: #226CFF;
    padding : 17px 16px;
    border-radius: 20px;
    width: 90px;
    height: 90px;
`;