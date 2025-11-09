import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "../pages/Layout";
// Pages
import Home from "../pages/Home";
import DesignSystem from "../pages/DesignSystem";
import Progress from "../pages/Progress/Progress";
// import Summation from "../pages/SummationPage/Summation";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          {/* <Route path="/summation" element={<Summation />} /> */}
        </Route>

        <Route path="/designsystem" element={<DesignSystem />} />

      </Routes>
    </BrowserRouter>
  );
}