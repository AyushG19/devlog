import {
  Check,
  MessageSquare,
  MoreHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const CommentMessage = ({ comment, callbacks, id }) => {
  const { handleMouseEnter, handleMouseLeave } = callbacks;
  console.log(comment);
  return (
    <div key={comment.id} className="flex relative py-2 w-full">
      <div className="flex-shrink-0 bg-white rounded-full w-7 h-7 mr-2"></div>
      <div className="flex-grow items-center justify-center w-full ">
        <NavLink
          className="flex items-center w-full "
          to={`/profile/${comment.username}`}
        >
          <div>
            <p className="md:inline text-[rgb(var(--text))] font-semibold mr-1 capitalize">
              {comment.name}
            </p>
            <p className="md:inline text-xs opacity-60 text-[rgb(var(--text))] italic">
              {`@${comment.username}`}
            </p>
          </div>
          {comment.verified && (
            <span className="ml-1 bg-[rgb(var(--primary))] rounded-full p-0.5">
              <Check size={10} className="text-[rgb(var(--text))]" />
            </span>
          )}
          <div className="ml-auto text-[rgb(var(--text))] opacity-60 text-xs">
            {comment.timeAgo}
          </div>
        </NavLink>

        <div className="relative -ml-14 mt-1 left-0 mb-2 pl-5 pb-5 w-full  border-b border-l border-[rgba(255,255,255,0.5)] transition-all rounded-bl-2xl ">
          <p className="text-sm text-[rgb(var(--text))] opacity-95 w-[105%] pt-2">
            {comment.content}
          </p>
        </div>

        <div className="flex -mt-6 pl-2 relative w-full">
          <div className="flex justify-between md:gap-8">
            <div
              id="like"
              onClick={() => handleLike(comment.id)}
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={() => handleMouseLeave(comment.id)}
              className={`${
                comment.isliked
                  ? "text-[rgb(var(--like))]"
                  : "text-[rgb(var(--text))]"
              } flex items-center justify-center hover:text-[rgb(var(--like))] duration-200 group ${
                id % 2 === 0
                  ? "bg-[var(--secondary-2)]"
                  : "bg-[var(--secondary)]"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--like),0.1)]">
                <ThumbsUp
                  size={13}
                  fill={comment.isliked ? "rgb(var(--like))" : "none"}
                />
              </div>
              <p className="text-[rgb(var(--text))] group-hover:text-[rgb(var(--like))] pr-2 text-xs transition-all">
                {comment.like_count}
              </p>
            </div>

            <div
              className={`flex items-center justify-center text-[rgb(var(--text))] duration-200 group ${
                id % 2 === 0
                  ? "bg-[var(--secondary-2)]"
                  : "bg-[var(--secondary)]"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full">
                <ThumbsDown size={13} />
              </div>
              <p className="text-[rgb(var(--text))] pr-2 text-xs transition-all">
                {comment.dislike_count}
              </p>
            </div>

            <div
              id="reply"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={() => handleMouseLeave(comment.id)}
              className={`flex items-center justify-center text-[rgb(var(--text))] hover:text-[rgb(var(--comment))] cursor-pointer transition-all text-xs duration-200 group ${
                id % 2 === 0
                  ? "bg-[var(--secondary-2)]"
                  : "bg-[var(--secondary)]"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full group-hover:bg-[rgba(var(--comment),0.1)]">
                <MessageSquare size={13} />
              </div>
              <span>Reply</span>
            </div>
          </div>

          <div className="ml-auto">
            <button className="text-[rgb(var(--text))] opacity-60">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentMessage;
