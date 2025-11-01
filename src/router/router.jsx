import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import Home from "../pages/Home";
import DesignSystem from "../pages/DesignSystem";

// 페이지 라우팅
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*임시*/}
        <Route path="/" element={<Home />} />
        <Route path="/designsystem" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>
  );
}
