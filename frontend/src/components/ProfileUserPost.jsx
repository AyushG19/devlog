import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "./Message";
import DummyMessage from "./DummyMessage";
import api from "../api/api";
import "../App.css";
import { ChevronLeft } from "lucide-react";

const ProfileUserPost = (props) => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        fetchPosts();
      }
    };
    console.log("posts: ", Posts);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const fetchPosts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await api.get(
        `http://localhost:4000/api/user/get-posts?last-id=${lastId}`
      );
      console.log("res: ", res);
      const data = res.userPosts.rows;
      console.log(...data);
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {Posts.length !== 0 ? (
        <div>
          <div
            className={`fixed left-0 right-0 top-0 h-14 flex items-center px-4 bg-[var(--primary)] ${
              props.visibility ? "slide-up" : "slide-down"
            }`}
          >
            <ChevronLeft
              onClick={() => {
                navigate("/devlog");
              }}
            />
          </div>
          {Posts.map((post, index) => {
            return <Message key={index} post={post} />;
          })}
        </div>
      ) : (
        <div className=" flex justify-center w-full">
          <p className="bg-slate-500 font-semibold text-xl mt-20 p-[5px_15px] rounded-md">
            No posts yet!
          </p>
        </div>
      )}
      {/* <div>
        <div
          className={`fixed left-0 right-0 top-0 h-14 flex items-center px-4 bg-[var(--primary)] ${
            props.visibility ? "slide-up" : "slide-down"
          }`}
        >
          <ChevronLeft
            onClick={() => {
              navigate("/devlog");
            }}
          />
        </div>
        <DummyMessage />
        <DummyMessage />
        <DummyMessage />
        <DummyMessage />
      </div> */}
    </>
  );
};

export default ProfileUserPost;
