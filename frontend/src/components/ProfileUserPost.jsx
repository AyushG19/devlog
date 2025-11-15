import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Message from "./Message";
import DummyMessage from "./DummyMessage";
import api from "../api/api";
import "../App.css";
import { ChevronLeft } from "lucide-react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UserContext } from "../context/userContext";

const ProfileUserPost = (props) => {
  const observerTaget = useRef(null);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const queryClient = useQueryClient();
  console.log(" posts mounted: ", props);
  const fetchUserPosts = async (page, id) => {
    // console.log(props.userInfo);
    const res = await api.get(`/api/user/get-posts?page=${page}&userId=${id}`);
    // console.log("res: ", res);
    return { data: res.data };
    // const data = res.userPosts.rows;
    // console.log(...data);
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["get-post", props.userInfo.user_id],
      queryFn: ({ pageParam = 1 }) =>
        fetchUserPosts(pageParam, props.userInfo.user_id),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.userPosts?.length === 0) return undefined;
        return lastPage.data.nextPage;
      },
    });

  const posts = data?.pages.flatMap((page) => page.data.userPosts) || [];
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        // console.log("fetching next page.", hasNextPage);
        fetchNextPage();
      }
      {
        threshold: 0.1;
      }
    });
    if (observerTaget.current) {
      observer.observe(observerTaget.current);
    }
    return () => {
      if (observerTaget.current) {
        observer.unobserve(observerTaget.current);
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);
  // console.log("posts: ", data);

  return (
    <>
      {posts.length !== 0 ? (
        <div>
          <div
            className={`fixed z-2 left-0 right-0 top-0 h-14  items-center px-4 bg-[rgb(var(--primary))]  ${
              props.visibility ? "hidden slide-up" : "slide-down flex"
            }`}
          >
            <ChevronLeft
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          {posts.map((post, i) => {
            return <Message key={post.message_id} id={i} post={post} />;
          })}
          <div ref={observerTaget} className="h-3">
            {isFetchingNextPage ? "loading..." : ""}
          </div>
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
          className={`fixed left-0 right-0 top-0 h-14 flex items-center px-4 bg-[rgb(var(--primary))] ${
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
