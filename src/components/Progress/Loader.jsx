import {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import styled from "styled-components";

const Loader = () => {
    const [loading, setLoading] = useState(true);

    const override = {
        borderWidth: "6px", //두께
        borderColor: "#ffffff #000000 #000000 #ffffff"
    };

    return (
        <LoaderWrap>
            <ClipLoader
            color="#226CFF" //메인 컬러
            size={44} //지름
            speedMultiplier={0.5} //속도
            cssOverride={override}
            />
        </LoaderWrap>
        
    )
}

export default Loader;

const LoaderWrap = styled.div`
    background-color: #00000075;
    width: 90px;
    height: 90px;
    padding: 22px 22px 22px 23px;
    border-radius: 20px;

    display: flex;
    align-items: center;
    flex-direction: center;
`;