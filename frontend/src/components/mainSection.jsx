import React from "react";
import DummyMessage from "./DummyMessage.jsx";
import Blog from "./Blog.jsx";
import FeedSection from "./FeedSection.jsx";

const MainSection = () => {
  return (
    <div className="md:w-[70vw] w-screen h-full md:px-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
      <FeedSection />
    </div>
  );
};

export default MainSection;
