import React from "react";
import Message from "./Message.jsx";
import Blog from "./Blog.jsx";

const MainSection = () => {
  return (
    <div className="md:w-[70vw] w-screen h-full md:px-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
      <Message />
      <Blog />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default MainSection;
