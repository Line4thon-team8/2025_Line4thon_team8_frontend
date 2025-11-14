import styled from "styled-components";

const OutReportModal = ({onConfirm, onClose}) => {
    return(
            <AlertWrap onClick={onClose}>
                <AlertContain onClick = {(e)=> e.stopPropagation}>
                    <AlertMessage>학습 세션이 종료됩니다. <br />
                        확인을 누르면 홈 화면으로 돌아갑니다.</AlertMessage>
                    <AlertBtn onClick={onConfirm}>확인</AlertBtn>
                </AlertContain>
            </AlertWrap>
    );
}

export default OutReportModal;


const AlertWrap = styled.div`
    
`;

const AlertContain = styled.div`
    width: 360px;
    height: 200px;
    padding: 42.5px 13.5px 42.5px 13.5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AlertMessage = styled.div`
    font-family: "Noto Sans", Medium;
    font-size: 20px;
    font-weight: 500;
`;

const AlertBtn = styled.div` 
    margin-top: 14px;
    width: 93px;
    height: 37px;
    background: #000;
    border-radius: 10px;

    font-family: "Noto Sans", SemiBold;
    font-Size: 14px;
    font-weight: 600;
    color: #fff;
`;
