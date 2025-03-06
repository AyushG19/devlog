import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainSection from "./mainSection";
import RightSection from "./RightSection";

const Layout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    console.log(screenWidth);
  }, [screenWidth]);

  return (
    <div
      className="relative w-screen h-screen bg-[--secondary] grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] "
      style={{ gridTemplateAreas: "'navbar navbar' 'leftside rightside'" }}
    >
      <Navbar />
      <MainSection />
      {screenWidth >= 786 ? <RightSection /> : null}
    </div>
  );
};

export default Layout;
