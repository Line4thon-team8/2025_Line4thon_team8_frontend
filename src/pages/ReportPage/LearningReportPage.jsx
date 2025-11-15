// LearningReportPage.jsx
import styled, { css } from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiFileTextLine, RiBookOpenLine } from "react-icons/ri";
import { getReportById, exportMarkdown, exportToNotion } from "../../api/report";


import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LearningReportPage = () => {
  // /report/:reportId
  const { reportId } = useParams();
  const location = useLocation();

const renderContent = () => {
  const content = report?.content;

  // 1) content 자체가 없을 때
  if (!content) return "내용이 없습니다.";

  // 2) JSON 파싱 실패했을 때
  if (content.error) {
    return `
      <p style="color:#666;">⚠ 분석을 진행할 수 없었어요.</p>
      <p>사유: ${content.error}</p>
    `;
  }

  // 3) 파싱 성공한 경우 (content 안에 구조가 있을 때)
  let html = "";

  // content.new
  if (content.new && content.new.length > 0) {
    html += `<h2>✨ 새로 알게 된 내용</h2>`;
    content.new.forEach(item => {
      html += `<p>• ${item}</p>`;
    });
  }

  // content.fix
  if (content.fix && content.fix.length > 0) {
    html += `<h2>🔄 바로잡은 개념</h2>`;
    content.fix.forEach(f => {
      html += `
        <p><b>잘못된 이해:</b> ${f.wrong}</p>
        <p><b>올바른 이해:</b> ${f.correct}</p>
      `;
    });
  }

  // content.ref
  if (content.ref && content.ref.length > 0) {
    html += `<h2>📚 참고 자료</h2>`;
    content.ref.forEach(ref => {
      html += `<p>• <a href="${ref.url}" target="_blank">${ref.title}</a></p>`;
    });
  }

  if (!html) return "내용이 없습니다.";

  return html;
};


  // 리포트 데이터
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isExportOpen, settIsExportOpen] = useState(false);

  // 마운트 시 /report/{reportId} 조회
  useEffect(() => {
    if (!reportId) {
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getReportById(reportId);
        setReport(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  const title =
    report?.title ||
    report?.creatAT ||
    report?.reports?.[0]?.results?.[0]?.created_at ||
    "";
  const rawDate =
    report?.createdAt ||
    report?.created_at ||
    report?.reports?.[0]?.results?.[0]?.created_at ||
    "";
  const date = rawDate ? rawDate.slice(0, 10) : "";

  // PDF 내보내기
  const handleExportPdf = async () => {
    const element = document.getElementById("report-pdf-area");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 해상도 좀 더 선명하게
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const height = pdfHeight > pageHeight ? pageHeight : pdfHeight;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      pdf.save(`${title || "report"}.pdf`);
    } catch (e) {
      console.error(e);
      alert("PDF로 내보내는 중 오류가 발생했습니다.");
    }
  };

  //Markdown 내보내기
  const handleExportMarkdown = async () => {
    try {
      const markdown = await exportMarkdown(reportId);

      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${reportId}.md`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("마크다운 내보내기 실패:", err);
      alert("마크다운 내보내기에 실패했어요.");
    }
  };

  // 노션 내보내기
  const handleExportNotion = async () => {
    try {
      const email = prompt("노션 연동에 사용할 이메일을 입력해주세요.");
      const parentPageId = prompt("노션 부모 페이지 ID를 입력해주세요.");
      if (!email || !parentPageId) return;

      await exportToNotion(reportId, email, parentPageId);
      alert("노션으로 내보냈어요!");
    } catch (err) {
      console.error("노션 내보내기 실패:", err);
      alert("노션 내보내기에 실패했어요.");
    }
  };

  if (loading) {
    return <p>리포트를 불러오는 중입니다...</p>;
  }
  if (error) {
    return <p>리포트를 불러오지 못했어요.</p>;
  }

  return (
    <LR_PageWrap>
      <LR_Header>
        <BtnWrap>수정하기</BtnWrap>
        <BtnWrap>복사하기</BtnWrap>
        <ExportWrap>
          <OutBtnWrap onClick={() => settIsExportOpen((prev) => !prev)}>
            내보내기
          </OutBtnWrap>

          {isExportOpen && (
            <OB_DropDown>
              <OB_DropDownItem onClick={handleExportPdf}>
                <RiFileTextLine size={18} />
                pdf로 내보내기
              </OB_DropDownItem>
              <OB_DropDownItem onClick={handleExportMarkdown}>
                <RiFileTextLine size={18} />
                Markdown으로 내보내기
              </OB_DropDownItem>
              <OB_DropDownItem onClick={handleExportNotion}>
                <RiBookOpenLine size={18} />
                Notion에 저장
              </OB_DropDownItem>
            </OB_DropDown>
          )}
        </ExportWrap>
      </LR_Header>

      <LR_ContainWrap id="report-pdf-area">
        <LR_ContainHeader>
          <LR_Title>{title}</LR_Title>
          <LR_Date>{date}</LR_Date>
        </LR_ContainHeader>
        <hr />
        <LR_Contain>
          <LR_Detail>
            <div dangerouslySetInnerHTML={{ __html: renderContent() }} />
          </LR_Detail>
        </LR_Contain>
      </LR_ContainWrap>
    </LR_PageWrap>
  );
};

export default LearningReportPage;

/* styled-components */

const LR_PageWrap = styled.div`
  background: #f4f4f5; /* ground → background 수정 */
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
`;

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
  min-height: fit-content;
  border-radius: 30px;
  background: #fff;
  margin-left: 141px;

  > hr {
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

  pre {
    white-space: pre-wrap;
  }
`;

const ExportWrap = styled.div``;

const OB_DropDown = styled.div`
  position: absolute;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  gap: 13px;

  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 10px;
  z-index: 10000;
`;

const OB_DropDownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-family: "Noto Sans", SemiBold;
  font-weight: 500;
  cursor: pointer;
`;