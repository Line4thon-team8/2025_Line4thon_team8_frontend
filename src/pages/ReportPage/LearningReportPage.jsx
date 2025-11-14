import styled, { css } from "styled-components"
import { useParams } from "react-router-dom";
import { getReportById } from "../../api/report";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiFileTextLine } from "react-icons/ri";
import { RiBookOpenLine } from "react-icons/ri";

const LearningReportPage = () => {
    // /report/:reportId
    const {reportId} = useParams();
    const location = useLocation();

    //리포트 데이터
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isExportOpen, settIsExportOpen] = useState(false);
    
    //마운트 시 /report/{reportId}조회
    useEffect(() => {
        if(!reportId){
            setLoading(false);
            return;
        }

        const fetchReport = async() => {
            try{
                setLoading(true);
                const data = await getReportById(reportId);
                setReport(data);
            }catch (err){
                setError(err);
            }finally{
                setLoading(false);
            }
        };
        fetchReport();
    }, [reportId]);

    const title = report?.title || report?.creatAT || report?.reports?.[0]?.results?.[0]?.created_at || "";
    const rawDate = report?.createdAt || report?.created_at || report?.reports?.[0]?.results?.[0]?.created_at || "";
    const date = rawDate ? rawDate.slice(0, 10) : "";

    if(loading){
        return <p>리포트를 불러오는 중입니다...</p>
    }
    if(error){
        return <p>리포트를 불러오지 못했어요.</p>
    }

    return(
        <LR_PageWrap>
            <LR_Header>
                <BtnWrap>수정하기</BtnWrap>
                <BtnWrap>복사하기</BtnWrap>
                <ExportWrap>
                    <OutBtnWrap onClick={() => settIsExportOpen(prev => !prev)}>내보내기</OutBtnWrap>

                    {isExportOpen && (
                        <OB_DropDown>
                            <OB_DropDownItem><RiFileTextLine size={18} />pdf로 내보내기</OB_DropDownItem>
                            <OB_DropDownItem><RiFileTextLine size={18} />Markdonw으로 내보내기</OB_DropDownItem>
                            <OB_DropDownItem><RiBookOpenLine size={18} />Notion에 저장</OB_DropDownItem>
                        </OB_DropDown>
                    )}
                </ExportWrap>
            </LR_Header>
            
            <LR_ContainWrap>
                <LR_ContainHeader>
                    <LR_Title>{title}</LR_Title>
                    <LR_Date>{date}</LR_Date>
                </LR_ContainHeader>
                <hr/>
                <LR_Contain>
                    <LR_Detail>
                        <pre>{JSON.stringify(report, null, 2)}</pre>
                    </LR_Detail>
                </LR_Contain>
            </LR_ContainWrap>
        </LR_PageWrap>
    )
}

export default LearningReportPage;

const LR_PageWrap = styled.div`
    ground: #F4F4F5;
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
    position: relative;
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
    max-width: 1085px;

    pre{
        white-space: pre-wrap;
    }
`;

const ExportWrap = styled.div`
`;

const OB_DropDown = styled.div`
    position: absolute;
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    gap: 13px;

    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    padding: 17px;
    z-index: 10000;
`;

const OB_DropDownItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    font-family: "Noto Sans", SemiBold;
    font-weight: 500;
`;