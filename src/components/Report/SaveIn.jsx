import Combobox from "../Combobox/Combobox";
import styled from "styled-components";

const SaveIn = ({intitle}) => {
    const folderOptions = [
        {id: 'new', name: '새 폴더 만들기'},
        {id: 'react_hooks', name: 'React Hooks'},
        {id: 'async_await', name: 'Async/Await'},
        {id: 'error-handle', name: 'Error-Handle'},
    ];
    
    return (
        <SaveInWrap>
            <InWrap>
                <InTitle>{intitle}</InTitle>
                <Combobox 
                    options={folderOptions}
                    placeholder="폴더 이름을 입력하거나 기존 폴더를 선택하세요."
                    // onChange={}
                />
            </InWrap>
        </SaveInWrap>
    )
}

export default SaveIn;

const SaveInWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const InWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
`;
const InTitle = styled.div`
    font-family: "Noto Sans", Medium;
    font-weight: 500;
    font-size: 20px;
`;