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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--primary))] p-6 border border-[rgb(var(--primary))] size-96 rounded-2xl z-100">
      <X onClick={closeModal} className="float-right mb-4 -m-2 " />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="border w-full h-3/4 outline-none p-3 text-white rounded-2xl bg-[var(--secondary)]"
      ></textarea>
      <button
        className="border rounded-full bg-[rgb(var(--primary-light))] p-[5px_15px] hover:bg-[rgb(var(--primary))] cursor-pointer "
        onClick={() => handleSendTweet()}
      >
        send it
      </button>
    </div>
  );
};

export default TweetModal;
