import React, { useState } from "react";
import api from "../api/api";

const TweetModal = (props) => {
  const [content, setContent] = useState("");

  const handleSendTweet = async () => {
    console.log(content);
    try {
      const res = await api.post("http://localhost:4000/api/user/post", {
        content,
      });
      console.log(res);
    } catch (error) {
      console.log("error in tweetmodal");
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--secondary)] p-6 border size-96 ">
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="border w-full h-3/4 outline-none p-3"
      ></textarea>
      <button
        className="rounded-full bg-[var(--primary-light)] p-[5px_15px] hover:bg-[var(--primary)] cursor-pointer "
        onClick={() => handleSendTweet()}
      >
        send it
      </button>
    </div>
  );
};

export default TweetModal;
