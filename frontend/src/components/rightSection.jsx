import React, { useState } from "react";
import TweetModal from "./TweetModal";

const rightSection = () => {
  const [openModal,setOpenModal] = useState(false);
  const handleClose = ()=>{
    setOpenModal(false);
  }
  return (
    <div
      className=""
      style={{
        gridArea: "rightside",
      }}
    >
      <button className="rounded-full bg-[var(--primary-light)] p-[5px_15px] hover:bg-[var(--primary)] cursor-pointer " onClick={()=>setOpenModal(true)}>Write something</button>
      {openModal && <TweetModal closeModal={handleClose}/>}
    </div>
  );
};

export default rightSection;
