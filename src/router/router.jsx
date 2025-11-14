import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "../pages/Layout";
// Pages
import LandingPage from "../pages/LandingPage/LandingPage";
import MainPage from "../pages/SessionPage/MainPage";
import SelectTopicPage from "../pages/SessionPage/SelectTopicPage";
import MyPage from "../pages/Mypage/Mypage";

import DesignSystem from "../pages/DesignSystem";
import Progress from "../pages/Progress/Progress";
import Summation from "../pages/SummationPage/Summation";
import Report from "../pages/ReportPage/Report";
import LearningReportPage from "../pages/ReportPage/LearningReportPage";
import TestEntrancePage from "../pages/ReportPage/TestEntrancePage";

// Router
export default function Router() {
  return (
    <BrowserRouter>

      <Routes>
    
        <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/select-topic" element={<SelectTopicPage/>} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/summation" element={<Summation />} />

            <Route path="/entrance" element={<TestEntrancePage/>}/>
            <Route path="/report" element={<Report />} />
            <Route path="/report/:reportId" element={<LearningReportPage/>} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>

        <Route path="/designsystem" element={<DesignSystem />} />

      </Routes>
    </BrowserRouter>
  );
}