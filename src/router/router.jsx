import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "../pages/Layout";
// Pages
import Home from "../pages/Home";
import DesignSystem from "../pages/DesignSystem";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/designsystem" element={<DesignSystem />} />

      </Routes>
    </BrowserRouter>
  );
}