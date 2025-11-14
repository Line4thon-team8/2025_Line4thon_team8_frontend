// src/components/Report/SaveIn.jsx
import Combobox from "../Combobox/Combobox";
import styled from "styled-components";

const SaveIn = ({ intitle }) => {
  const folderOptions = [
    { id: "new", name: "새 폴더 만들기" },
    { id: "react_hooks", name: "React Hooks" },
    { id: "async_await", name: "Async/Await" },
    { id: "error-handle", name: "Error-Handle" },
  ];

  const handleFolderChange = async (id, item) => {
    if (!id) return;

    let folderName = item?.name;

    // 1) 새 폴더 만들기
    if (id === "new") {
      const input = window.prompt("새로 만들 폴더 이름을 입력하세요");
      if (!input || !input.trim()) {
        alert("폴더 이름이 입력되지 않았어요.");
        return;
      }
      folderName = input.trim();

      try {
        // 실제 DB 저장 API
        // await api.createFolderAndSaveReport({ folderName, reportTitle: intitle });

        console.log("[DB] 새 폴더 생성 + 리포트 저장:", {
          reportTitle: intitle,
          folderName,
        });

        alert(`'${folderName}' 폴더를 만들고\n'${intitle}' 리포트를 저장했어요.`);
      } catch (err) {
        console.error(err);
        alert("폴더 생성/저장 중 오류가 발생했어요.");
      }
    }
    // 2) 기존 폴더 선택
    else {
      try {
        // 기존 폴더에 저장하는 API
        // await api.saveReportToFolder({ folderId: id, reportTitle: intitle });

        console.log("[DB] 기존 폴더에 리포트 저장:", {
          reportTitle: intitle,
          folderId: id,
          folderName,
        });

        alert(`'${folderName}' 폴더에\n'${intitle}' 리포트를 저장했어요.`);
      } catch (err) {
        console.error(err);
        alert("리포트 저장 중 오류가 발생했어요.");
      }
    }
  };

  return (
    <SaveInWrap>
      <InWrap>
        <InTitle>{intitle}</InTitle>
        <Combobox
          options={folderOptions}
          placeholder="폴더 이름을 입력하거나 기존 폴더를 선택하세요."
          onChange={handleFolderChange}
        />
      </InWrap>
    </SaveInWrap>
  );
};

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