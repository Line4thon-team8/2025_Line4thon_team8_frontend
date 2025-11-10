import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import Check from "../../assets/check.svg";
import Loader from "./Loader";

const ProgBar = ({completed, width, height, progtext, progcheck}) =>{

    return (
            <ProgBarWrap>
                <BarWrap>
                    <ProgressBar 
                        completed={completed} //진행률
                        maxCompleted={100} //완료값
                        isLabelVisible={false} //내부 라벨 숨김
                        baseBgColor="#D1D1D1"
                        bgColor="#226CFF"
                        height={height || "20px"}
                        width={width || "1009px"}
                        progtext = {progtext}
                        progcheck = {progcheck}
                    />
                    
                </BarWrap>
            </ProgBarWrap>
            )
}

export default ProgBar;

const ProgBarWrap = styled.div`
    
`;


const ProgCheck = styled.div`
    padding: 17px 16px;
`;

const CheckImg = styled.img`
    background-color: #226CFF;
    padding : 17px 16px;
    border-radius: 20px;
`;

const BarWrap = styled.div`
    
`;