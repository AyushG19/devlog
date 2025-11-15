import React, { useContext, useState } from "react";
import api from "../api/api";
import { UserContext } from "../context/userContext";
import { Cross, X } from "lucide-react";

const TweetModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const { userInfo } = useContext(UserContext);

  const handleSendTweet = async () => {
    console.log(content);
    try {
      const res = await api.post("api/user/post", {
        content,
        name: userInfo.name,
      });
      console.log(res);
    } catch (error) {
      console.log("error in tweetmodal");
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--secondary)] p-6 border size-96 ">
      <X onClick={closeModal} className="float-right mb-4 -m-2 " />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="border w-full h-3/4 outline-none p-3"
      ></textarea>
      <button
        className="rounded-full bg-[var(rgb(var(rgb(var(--primary))-light)))] p-[5px_15px] hover:bg-[rgb(var(--primary))] cursor-pointer "
        onClick={() => handleSendTweet()}
      >
        send it
      </button>
    </div>
  );
};

export default TweetModal;
