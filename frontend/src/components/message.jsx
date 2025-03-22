import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Heart,
  BookMarked,
  MessagesSquare,
  HeartCrack,
  Bookmark,
  Rocket,
} from "lucide-react";
import api from "../api/api";
import { UserContext } from "../context/userContext";
import { NavLink } from "react-router";

const Message = ({ post }) => {
  console.log("message: ", post);
  const ref = useRef(null);
  const { screenWidth } = useContext(UserContext);
  const [isImg, setIsImg] = useState("");
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [commentCount, setCommentCount] = useState(post.comment_count);
  const [isLiked, setIsLiked] = useState(post.isliked);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    const endpoint = isLiked ? "/api/user/unlike" : "/api/user/like";
    api.post(endpoint, {
      messageId: post.message_id,
    });
    if (isLiked) {
      setDisliked(isLiked);
    }
    setIsLiked((prevIsLiked) => {
      setDisliked(isLiked);
      setLikeCount((prevCount) =>
        !prevIsLiked ? prevCount + 1 : prevCount - 1
      );
      return !prevIsLiked;
    });
  };

  const handleMouseEnter = (target) => {
    const rang = target.id;
    console.log(rang);
    switch (rang) {
      case "like":
        ref.current.style.borderColor = "rgba(var(--like),0.5)";
        break;
      case "comment":
        ref.current.style.borderColor = "rgba(var(--comment),0.5)";
        break;
      case "boost":
        ref.current.style.borderColor = "rgba(var(--boost),0.5)";
        break;
      default:
    }
  };

  const handleMouseLeave = () => {
    ref.current.style.borderColor = "rgb(var(--text),0.8)";
  };

  return (
    <div className="flex flex-col w-full bg-[var(--secondary)] py-2 px-4">
      <div className="flex relative w-full">
        {/* Container for the user info */}
        <div className="flex-shrink-0 bg-white rounded-full w-10 h-10 mr-2"></div>
        <div className="w-full">
          <NavLink
            className="flex items-baseline w-full"
            to={`/profile/${post.username}`}
          >
            <p className="text-[rgb(var(--text))] font-semibold text-lg mr-1 capitalize">
              {post.name}
            </p>
            <p className="text-sm opacity-60 text-[rgb(var(--text))] italic">
              {`@${post.username}`}
            </p>
            <div className="ml-auto text-[var(--primary)]">Says</div>
          </NavLink>
          <div className="-mt-0.5 mb-2 text-white text-[11px] opacity-60">
            posted on 10 nov, 2023
          </div>
          {/* Container for the user text */}
          <div
            ref={ref}
            className="relative -ml-7 mb-2 pl-3 pb-7 w-full border-l border-b rounded-bl-2xl border-[rgb(var(--text),0.8)] transition-all"
          >
            <p className="text-sm text-[rgb(var(--text))] opacity-95">
              {post.content}
            </p>
            {isImg && <img src={isImg} alt="image" className="w-full" />}
          </div>
          {/* Container for interactions */}
          <div className="flex justify-between -mt-6 pl-2 relative">
            <div className="flex gap-8">
              <div
                id="comment"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="pr-2 flex items-center justify-center text-[rgb(var(--text))] hover:text-[rgb(var(--comment))] cursor-pointer transition-all text-xs duration-200 group bg-[var(--secondary)]"
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--comment),0.1)]">
                  <MessagesSquare size={13} />
                </div>
                {commentCount}
              </div>

              <div
                id="like"
                onClick={handleLike}
                onMouseMove={(e) => {
                  screenWidth < 786 ? "" : handleMouseEnter(e.currentTarget);
                }}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={`${
                  isLiked
                    ? "text-[rgb(var(--like))]"
                    : "text-[rgb(var(--text))]"
                } flex items-center justify-center hover:text-[rgb(var(--like))] duration-200 group bg-[var(--secondary)]`}
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--like),0.1)]">
                  {disliked ? (
                    <HeartCrack size={13} />
                  ) : (
                    <Heart
                      size={13}
                      fill={isLiked ? "rgb(var(--like))" : "none"}
                    />
                  )}
                </div>
                <p className="text-[rgb(var(--text))] group-hover:text-[rgb(var(--like))] pr-2 text-xs transition-all">
                  {likeCount}
                </p>
              </div>

              <div
                id="boost"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="pr-2 flex items-center justify-center text-[rgb(var(--text))] hover:text-[rgb(var(--boost))] cursor-pointer transition-all text-xs duration-200 group bg-[var(--secondary)]"
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--boost),0.1)]">
                  <Rocket size={13} />
                </div>
                {commentCount}
              </div>
            </div>
            <div className="text-sm">more</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
