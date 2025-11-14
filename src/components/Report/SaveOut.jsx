import Combobox from "../Combobox/Combobox";
import styled from "styled-components";

const SaveOut = ({outtitle}) => {
    const formatOptions = [
        {id: 'pdf', name: 'PDF'},
        {id: 'html', name: 'HTML'},
        {id: 'txt', name: 'TXT'},
        {id: 'Json', name: 'JSon'},
    ];

    return (
        <SaveOutWrap>
            <OutWrap>
                <OutTitle>{outtitle}</OutTitle>
                <Combobox 
                    options={formatOptions}
                    placeholder="다운로드 할 파일 형태를 선택하세요."
                    // onChange={}
                />
            </OutWrap>
        </SaveOutWrap>
    )
}

export default SaveOut;


const SaveOutWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.57vh;   /* 17px */
`;

const OutWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.83vh;   /* 9px */
`;

const OutTitle = styled.div`
    font-family: "Noto Sans", Medium;
    font-weight: 500;
    font-size: 1.85vh;   /* 20px */
`;