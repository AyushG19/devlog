import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../context/userContext";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MoreHorizontal,
  Check,
  Upload,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router";
import api from "../api/api";

const CommentSection = ({ postId, callbacks, id }) => {
  const { handleMouseEnter, handleMouseLeave } = callbacks;
  const [commentText, setCommentText] = useState("");
  const [sortBy, setSortBy] = useState("Most recent");
  const { screenWidth } = useContext(UserContext);
  const [commentRefs, setCommentRefs] = useState({});
  const ref = useRef(null);

  const comments = [
    {
      id: 1,
      name: "Noah Pierre",
      username: "noahpierre",
      avatar: "/api/placeholder/40/40",
      timeAgo: "58 minutes ago",
      content:
        "I'm a bit unclear about how condensation forms in the water cycle. Can someone break it down?",
      like_count: 25,
      dislike_count: 3,
      isliked: false,
      verified: false,
    },
    {
      id: 2,
      name: "Skill Sprout",
      username: "skillsprout",
      avatar: "/api/placeholder/40/40",
      timeAgo: "8 minutes ago",
      content:
        "Condensation is when water vapor in the air cools down and turns back into liquid water. This happens when warm air meets a cool surface or when air temperature drops.",
      like_count: 2,
      dislike_count: 0,
      isliked: false,
      verified: true,
    },
    {
      id: 3,
      name: "Mollie Hall",
      username: "molliehall",
      avatar: "/api/placeholder/40/40",
      timeAgo: "5 hours ago",
      content:
        "I really enjoyed today's lesson on the water cycle! The animations made the processes so much easier to grasp.",
      like_count: 0,
      dislike_count: 0,
      isliked: false,
      verified: false,
    },
  ];

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    // API call would go here
    console.log("Submitting comment:", commentText);

    // Reset the input
    setCommentText("");
  };

  const handleMouseEnter2 = (target, commentId) => {
    if (!commentRefs[commentId]) return;

    const action = target.id;
    switch (action) {
      case "like":
        commentRefs[commentId].style.borderColor = "rgba(var(--like),0.5)";
        ref.current.style.borderColor = "rgba(var(--like),0.5)";
        handleMouseEnter(target);
        break;
      case "comment":
        commentRefs[commentId].style.borderColor = "rgba(var(--comment),0.5)";
        ref.current.style.borderColor = "rgba(var(--comment),0.5)";
        handleMouseEnter(target);
        break;
      default:
    }
  };

  const handleMouseLeave2 = (commentId) => {
    if (commentRefs[commentId]) {
      commentRefs[commentId].style.borderColor = "rgba(255,255,255,0.5)";
    }
    ref.current.style.borderColor = "rgba(255,255,255,0.5)";
    handleMouseLeave();
  };

  const handleLike = (commentId) => {
    // Implement like functionality
    console.log("Liked comment:", commentId);
  };

  const setCommentRef = (element, commentId) => {
    if (element && !commentRefs[commentId]) {
      setCommentRefs((prev) => ({
        ...prev,
        [commentId]: element,
      }));
    }
  };
  // after:content-[""] after:h-full after:border-l after:border-white after:bg-white after:absolute after:top-0
  //after:content-[''] after:text-black after:-ml-3 after:top-0 after:left-0 after:absolute after:h-[1px] after:border-l after:border-white after:bg-black after:w-[120%] after:shadow-[0px_10px_10px_black]

  return (
    <>
      <div
        ref={ref}
        className={`${
          id % 2 === 0 ? "bg-[var(--secondary-2)]" : "bg-[var(--secondary)]"
        }  relative border-l border-[rgba(255,255,255,0.5)] -mt-4
       overflow-hidden`}
      >
        {/* Comment input section */}
        <div className="bg-inherit border-b border-r shadow-lg shadow-black rounded-lg mb-4 w-full p-2 ">
          <div className="mb-3 w-full">
            <input
              type="text"
              placeholder="Add comment..."
              className="text-sm outline-none text-[rgb(var(--text))] w-full mt-4 bg-[rgba(255,255,255,0.1)] p-[5px_15px] rounded-3xl"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="px-4 flex gap-2 md:space-x-4 text-[rgb(var(--text))] opacity-80">
              <button className="font-bold">B</button>
              <button className="italic">I</button>
              <button className="underline">U</button>
              <span className="text-[rgba(255,255,255,0.3)]">|</span>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </button>
            </div>
            <button
              className="bg-[rgb(var(--primary))] text-[var(--secondary)] capitalize font-bold py-2 px-4 rounded-full text-sm"
              onClick={handleSubmit}
            >
              {screenWidth < 786 ? <Upload size={15} /> : "post"}
            </button>
          </div>
        </div>

        {/* Comments header
      <div className="flex items-center justify-between pl-3 mb-4 w-full">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] underline">
            Comments
          </h2>
          <span className="ml-2 bg-[rgb(var(--primary))] text-[rgb(var(--text))] rounded-full px-2 py-0.5 text-sm">
            {comments.length}
          </span>
        </div>
        <div className="flex items-center text-[rgb(var(--text))] opacity-60">
          <span className="mr-1">{sortBy}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div> */}

        {/* Comments list */}
        <div className="w-full relative pl-4">
          {comments.map((comment) => (
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

                <div
                  ref={(el) => setCommentRef(el, comment.id)}
                  className="relative -ml-14 mt-1 left-0 mb-2 pl-5 pb-5 w-full  border-b border-l border-[rgba(255,255,255,0.5)] transition-all rounded-bl-2xl "
                >
                  <p className="text-sm text-[rgb(var(--text))] opacity-95 w-[105%] pt-2">
                    {comment.content}
                  </p>
                </div>

                <div className="flex -mt-6 pl-2 relative w-full">
                  <div className="flex justify-between md:gap-8">
                    <div
                      id="comment"
                      onMouseEnter={(e) =>
                        handleMouseEnter2(e.currentTarget, comment.id)
                      }
                      onMouseLeave={() => handleMouseLeave2(comment.id)}
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

                    <div
                      id="like"
                      onClick={() => handleLike(comment.id)}
                      onMouseEnter={(e) =>
                        handleMouseEnter2(e.currentTarget, comment.id)
                      }
                      onMouseLeave={() => handleMouseLeave2(comment.id)}
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
                  </div>

                  <div className="ml-auto">
                    <button className="text-[rgb(var(--text))] opacity-60">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[rgb(var(--primary))] rounded-full relative -translate-1/2 left-0 bottom-0 aspect-square w-fit p-1 flex items-center justify-center">
        <Plus strokeWidth={3} size={10} />
      </div>
    </>
  );
};

export default CommentSection;
