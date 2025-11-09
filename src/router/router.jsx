import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "../pages/Layout";
// Pages
import LandingPage from "../pages/LandingPage/LandingPage";
import MainPage from "../pages/SessionPage/MainPage";
import SelectTopicPage from "../pages/SessionPage/SelectTopicPage";
import MyPage from "../pages/Mypage/Mypage";

import DesignSystem from "../pages/DesignSystem";

// Router
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/session" element={<SelectTopicPage/>} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>

        <Route path="/designsystem" element={<DesignSystem />} />

      </Routes>
    </BrowserRouter>
  );
}