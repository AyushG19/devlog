import React, { useState } from "react";
import { Heart, BookMarked, MessagesSquare } from "lucide-react";
import api from "../api/api";

const Message = ({ post }) => {
  // const fetchMessage = async () => {
  //   try {
  //     const res = await api.get("http://localhost:4000/get-user-message");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [isImg, setIsImg] = useState("");
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 ">
      {/* Container for the user info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className=" bg-black rounded-full size-10  mr-3"></div>
          <div>
            <p className="font-semibold text-lg">lucky guy</p>
            <p className="text-sm -mt-1 text-gray-900 italic ">@username</p>
          </div>
        </div>
        <div className="text-[rgb(var(--primary))]">Says</div>
      </div>
      {/* Container for the user text */}
      <div className="pl-5 mb-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          nisi, a hic recusandae, voluptatum, nesciunt sequi eius similique
          aliquid odit perspiciatis. Ipsa labore, consequatur nesciunt nostrum
          dignissimos pariatur perspiciatis odiolor Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Facere rem sit quo quaerat, voluptatem
          similique a fuga nisi in. Quidem a voluptas reiciendis explicabo
          corporis. Nostrum consequatur iste neque perspiciatis. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Magni eius accusamus
          delectus similique. Labore quidem, reiciendis quis, quae placeat
          repudiandae porro, ipsam laborum explicabo commodi aut? Delectus quae
          sed explicabo?
        </p>
        {isImg && <img src={isImg} alt="image" />}
      </div>
      {/* Container for interactions */}
      <div className="flex justify-between pl-5 py-2">
        <div className="flex gap-8">
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(rgb(var(rgb(var(--primary))-light)))] rounded-full cursor-pointer active:bg-[rgb(var(--primary))] md:hover:bg-[rgb(var(--primary))] transition-all duration-200 ">
            <Heart size={13} />
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(rgb(var(rgb(var(--primary))-light)))] rounded-full cursor-pointer hover:bg-[rgb(var(--primary))] transition-all duration-200 ">
            <MessagesSquare size={13} />
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(rgb(var(rgb(var(--primary))-light)))] rounded-full cursor-pointer hover:bg-[rgb(var(--primary))] transition-all duration-200 ">
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
