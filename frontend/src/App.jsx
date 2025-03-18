import Navbar from "./components/Navbar.jsx";
import RightSection from "./components/RightSection.jsx";
import Layout from "./components/Layout.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ActionPage from "./components/ActionPage.jsx";
import { Routes, Route } from "react-router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ActionPage />}></Route>
      <Route path="/devlog" element={<Layout />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile/:username" element={<ProfilePage />}></Route>
    </Routes>
  );
}

export default App;
