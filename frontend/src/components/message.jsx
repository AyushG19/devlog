import React, { useState } from "react";
import { Heart, BookMarked, MessagesSquare } from "lucide-react";
import api from "../api/api";

const Message = ({ post }) => {
  const [isImg, setIsImg] = useState("");

  // const fetchMessage = async () => {
  //   try {
  //     const res = await api.get("http://localhost:4000/get-user-message");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(post.user_id);
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 ">
      {/* Container for the user info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className=" bg-black rounded-full size-10  mr-3"></div>
          <div>
            <p className="font-semibold text-lg">lucky guy</p>
            <p className="text-sm -mt-1 opacity-60 italic ">{post.username}</p>
          </div>
        </div>
        <div className="text-[var(--primary)]">Says</div>
      </div>
      {/* Container for the user text */}
      <div className="pl-5 mb-2">
        <p>{post.content}</p>
        {isImg && <img src={isImg} alt="image" />}
      </div>
      {/* Container for interactions */}
      <div className="flex justify-between pl-5 py-2">
        <div className="flex gap-8">
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer active:bg-[var(--primary)] md:hover:bg-[var(--primary)] transition-all duration-200 ">
            <Heart size={13} />
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer hover:bg-[var(--primary)] transition-all duration-200 ">
            <MessagesSquare size={13} />
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer hover:bg-[var(--primary)] transition-all duration-200 ">
            <BookMarked size={13} />
            <p className="text-xs">300</p>
          </div>
        </div>
        <div className="text-sm">more</div>
      </div>
    </div>
  );
};

export default Message;
