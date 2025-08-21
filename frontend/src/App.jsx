import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import OatDetailPage from "./pages/OatDetailPage.jsx";

const App = () => {
  return (
    <div data-theme="cyberpunk">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/oat/:id" element={<OatDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
