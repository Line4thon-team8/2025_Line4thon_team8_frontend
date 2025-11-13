import styled, { css } from "styled-components"
import {useParams, useLocation} from "react-router-dom";

const LearningReportPage = () => {
    const {title: rawTitle} = useParams();
    const {state} = useLocation();

    const title = state?.title ?? decodeURIComponent(rawTitle);

    const date = "2025.10.30";
    return(
        <LR_PageWrap>
            <LR_Header>
                <BtnWrap>수정하기</BtnWrap>
                <BtnWrap>복사하기</BtnWrap>
                <OutBtnWrap>내보내기</OutBtnWrap>
            </LR_Header>
            
            <LR_ContainWrap>
                <LR_ContainHeader>
                    <LR_Title>{title}</LR_Title>
                    <LR_Date>{date}</LR_Date>
                </LR_ContainHeader>
                <hr/>
                <LR_Contain>
                    <LR_Detail/>
                </LR_Contain>
            </LR_ContainWrap>
        </LR_PageWrap>
    )
}

export default LearningReportPage;
const LR_PageWrap = styled.div`
    background: #F4F4F5;
    display: flex;
    flex-direction: column;
    gap: 58px;
`;

const LR_Header = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const StyledBtn = css`
    font-family: "Noto Sans", SemiBold;
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
       
    border-radius: 12px;
    width: 181px;
    height: 56px;
`

const BtnWrap = styled.div`
    ${StyledBtn};
    background: #fff;
`;

const OutBtnWrap = styled.div`
    ${StyledBtn};
    background: #000;
    color: #fff;
`;

const LR_ContainWrap = styled.div`
    width: 1158px;
    min-height: content-fit;
    border-radius: 30px;
    background: #fff;
    margin-left: 141px;

    >hr{
        margin: 0 11px;
    }
`;


const LR_ContainHeader = styled.div`
    margin: 30px 34px 43px 30px;
`;

const LR_Contain = styled.div`
    margin: 33px 34px 30px;
`;

const LR_Title = styled.div`
    font-family: "Noto Sans", Bold;
    font-weight: 700;
    font-size: 64px;
`;

const LR_Date = styled.div`
    font-family: "Noto Sans", Medium;
    font-weight: 500;
    font-size: 20px;
    color: #868686;
`;

const LR_Detail = styled.div`
    margin-top: 33px;
`;