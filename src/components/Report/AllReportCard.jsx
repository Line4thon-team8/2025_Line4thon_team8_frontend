import styled from "styled-components";
import TagSelect from "./TagSelect";

const AllReportCard = ({learningtitle, onView}) => {
    return(
        <LearningWrap>
            <LearningTitle>{learningtitle}</LearningTitle>
            <StyledPadding>
                <StyledTagSelect/>
                <LearningCheck
                    as="button"
                    type="button"
                    onClick={()=>onView?.(learningtitle)}
                >보기</LearningCheck>
            </StyledPadding>
        </LearningWrap>
    )
}

export default AllReportCard;

const LearningWrap = styled.div`
    min-width: 861px;
    min-height: 199px;
    background: #fff;
    padding: 24px 37px;

    border-radius:20px;
    border: 1px solid #EFF0F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

const LearningTitle = styled.div`
    font-family: "Noto Sans", 500;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    jistify-content: center;
`;

const LearningCheck = styled.div`
    background: #000;
    color: #fff;

    width: 697px;
    height: 39px;
    padding: 15px 84px;
    border-radius: 12px;

    font-family: "Noto Sans", SemiBold;
    font-weight: 600;
    font-size: 18px;

    display:flex;
    align-items: center;
    justify-content: center;
`;

const StyledPadding = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const StyledTagSelect = styled(TagSelect)`
    .ts-btn{
        background: #D9F58A !important;
    }   
    .ts-item{ 
        background: #D9F58A !important;
    } 
`;