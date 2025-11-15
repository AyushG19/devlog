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
import CommentSection from "./CommentSection";
import DummyCommentSec from "./DummyCommentSec";

const Message = ({ post, id }) => {
  console.log("message: ", post);
  console.log(import.meta.env.VITE_API_URL);

  const ref = useRef(null);
  const { screenWidth } = useContext(UserContext);
  const [isImg, setIsImg] = useState("");
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [commentCount, setCommentCount] = useState(post.comment_count);
  const [isLiked, setIsLiked] = useState(post.isliked);
  const [disliked, setDisliked] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

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
        ref.current.classList.add("after:border-[rgba(var(--like),0.5)]");
        break;
      case "comment":
        ref.current.classList.add("after:border-[rgba(var(--comment),0.5)]");
        break;
      case "boost":
        ref.current.classList.add("after:border-[rgba(var(--boost),0.5)]");
        break;
      default:
    }
  };

  const handleMouseLeave = () => {
    ref.current.classList.remove("after:border-[rgba(var(--like),0.5)]");
    ref.current.classList.remove("after:border-[rgba(var(--comment),0.5)]");
    ref.current.classList.remove("after:border-[rgba(var(--boost),0.5)]");
  };

  const handleCommentClick = () => {
    setCommentModal((prev) => !prev);
  };
  return (
    <div
      name={"message container"}
      className={`${
        id % 2 === 0 ? "bg-[var(--secondary-2)] " : "bg-[var(--secondary)]"
      } flex flex-col pt-3 pb-5 px-2 md:border-r md:border-[rgba(255,255,255,0.1)] shadow-[inset_0px_5px_5px_rgba(0,0,0,0.5)]`}
    >
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] relative bg-inherit">
        {/* Container for the user info */}
        <div
          className="z-2 flex-shrink-0 bg-white rounded-full w-7 h-7 mr-2"
          style={{ gridArea: "1 / 1 / 3 / 2" }}
        ></div>
        <div
          className="relative w-full bg-inherit"
          style={{ gridArea: "1 / 2 / 2 / 3" }}
        >
          <NavLink
            className="flex items-center w-full"
            to={`/profile/${post.username}`}
          >
            <p className="text-[rgb(var(--text))] font-semibold text-lg mr-1 capitalize">
              {post.name}
            </p>
            <p className="text-xs opacity-60 text-[rgb(var(--text))] italic">
              {`@${post.username}`}
            </p>
            <div className="ml-auto text-[rgb(var(--primary))]">Says</div>
          </NavLink>
          <div className="-mt-0.5 mb-2 text-white text-[11px] opacity-60">
            posted on 10 nov, 2023
          </div>
          {/* Container for the user text */}
          <div
            ref={ref}
            className=" mb-2 pb-4 w-full after:content-[''] after:absolute after:top-0 after:border-l after:border-b after:rounded-bl-3xl md:after:rounded-bl-xl after:border-[rgba(255,255,255,0.3)] after:-ml-5.5 after:w-full after:h-full transition-all "
          >
            <p className="text-sm text-[rgb(var(--text))] opacity-95">
              {post.content}
            </p>
            {isImg && <img src={isImg} alt="image" className="w-full" />}
          </div>

          {/* Container for interactions */}
          <div className="flex absolute bottom-0 z-1 -ml-2 translate-y-1/2 justify-between ">
            <div className="flex gap-8 ">
              <div
                id="comment"
                onClick={handleCommentClick}
                onMouseEnter={(e) => {
                  screenWidth < 786 ? "" : handleMouseEnter(e.currentTarget);
                }}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={`${
                  id % 2 === 0
                    ? "bg-[var(--secondary-2)] "
                    : "bg-[var(--secondary)]"
                } pr-2 flex items-center justify-center  hover:text-[rgb(var(--comment))] cursor-pointer transition-all text-xs duration-200 group text-[rgb(--var(--text))] ${
                  commentModal
                    ? "text-[rgb(var(--comment))]"
                    : "text-[rgb(var(--text))]"
                } active:scale-105`}
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--comment),0.1)]">
                  <MessagesSquare
                    fill={`${commentModal ? "rgb(var(--comment))" : "none"}`}
                    size={15}
                  />
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
                } ${
                  id % 2 === 0
                    ? "bg-[var(--secondary-2)] "
                    : "bg-[var(--secondary)]"
                } active:scale-105 flex items-center justify-center hover:text-[rgb(var(--like))] duration-200 group bg-[var(--secondary)]`}
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--like),0.1)]">
                  {disliked ? (
                    <HeartCrack size={15} />
                  ) : (
                    <Heart
                      size={15}
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
                onMouseEnter={(e) => {
                  screenWidth < 786 ? "" : handleMouseEnter(e.currentTarget);
                }}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={`${
                  id % 2 === 0
                    ? "bg-[var(--secondary-2)] "
                    : "bg-[var(--secondary)]"
                } active:scale-105 pr-2 flex items-center justify-center text-[rgb(var(--text))] hover:text-[rgb(var(--boost))] cursor-pointer transition-all text-xs duration-200 group bg-[var(--secondary)]`}
              >
                <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--boost),0.1)]">
                  <Rocket size={15} />
                </div>
                {commentCount}
              </div>
            </div>
            <div className="text-sm">more</div>
          </div>
        </div>
        {commentModal && (
          <DummyCommentSec
            callbacks={{ handleMouseEnter, handleMouseLeave }}
            id={id}
            messageId={post.message_id}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
