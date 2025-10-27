import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import Home from "../pages/Home";

// 페이지 라우팅
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
