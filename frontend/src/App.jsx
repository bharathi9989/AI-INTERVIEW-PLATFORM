import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth.jsx"; // 🔥 NEW UI
import Dashboard from "./pages/Dashboard.jsx";
import Upload from "./pages/Upload.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔥 Redirect root */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* 🔥 SINGLE AUTH PAGE */}
        <Route path="/auth" element={<Auth />} />

        {/* 🔥 PROTECTED PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
