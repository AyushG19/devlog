import Navbar from "./components/Navbar.jsx";
import RightSection from "./components/RightSection.jsx";
import Layout from "./components/Layout.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ActionPage from "./components/ActionPage.jsx";
import { Routes, Route, useLocation } from "react-router";

import "./App.css";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<ActionPage />}></Route>
      <Route path="/:page" element={<Layout />}></Route>
      <Route path="/profile/:username" element={<ProfilePage />}></Route>
    </Routes>
  );
}

export default App;
