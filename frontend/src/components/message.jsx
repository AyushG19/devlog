import React, { useContext, useState } from "react";
import { Heart, BookMarked, MessagesSquare } from "lucide-react";
import api from "../api/api";
import { UserContext } from "../context/userContext";

const Message = ({ post }) => {
  const [isImg, setIsImg] = useState("");
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [commentCount, setcommentCount] = useState(post.comment_count);

  const [isLiked, setIsLiked] = useState(post.isliked);

  const handleLike = () => {
    const endpoint = isLiked ? "/api/user/unlike" : "/api/user/like";
    const res = api.post(endpoint, {
      messageId: post.message_id,
    });

    setIsLiked((prevIsLiked) => {
      setLikeCount((prevCount) =>
        !prevIsLiked ? prevCount + 1 : prevCount - 1
      );
      return !prevIsLiked;
    });
  };
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 ">
      {/* Container for the user info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className=" bg-black rounded-full size-10  mr-3"></div>
          <div>
            <p className="font-semibold text-lg">{post.name}</p>
            <p className="text-sm -mt-1 opacity-60 italic ">{`@${post.username}`}</p>
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
          <div
            onClick={(e) => handleLike(e.target)}
            className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer active:bg-[var(--primary)] md:hover:bg-[var(--primary)] transition-all duration-200 "
          >
            <Heart size={13} fill={isLiked ? "red" : "none"} />
            <p className="text-xs">{likeCount}</p>
          </div>

          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer hover:bg-[var(--primary)] transition-all duration-200 ">
            <MessagesSquare size={13} />
            <p className="text-xs">{commentCount}</p>
          </div>

          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer hover:bg-[var(--primary)] transition-all duration-200 ">
            <BookMarked size={13} />
            <p className="text-xs">save</p>
          </div>
        </div>
        <div className="text-sm">more</div>
      </div>
    </div>
  );
};

export default Message;
