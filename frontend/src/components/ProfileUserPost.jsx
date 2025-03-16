import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
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

const ProfileUserPost = (props) => {
  const observerTaget = useRef(null);
  const navigate = useNavigate();
  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const res = await api.get(`/api/user/get-posts?page=${pageParam}`);
      console.log("res: ", res);
      return { data: res.data, nextPage: pageParam + 1 };
      // const data = res.userPosts.rows;
      // console.log(...data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["get-post"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.userPosts?.length === 0) return undefined;
        return lastPage.nextPage;
      },
    });

  const posts = data?.pages.flatMap((page) => page.data.userPosts) || [];
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log("fetching next page.", hasNextPage);
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
  console.log("posts: ", data);

  return (
    <>
      {posts.length !== 0 ? (
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
          {posts.map((post) => {
            return <Message key={post.tweet_id} post={post} />;
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
