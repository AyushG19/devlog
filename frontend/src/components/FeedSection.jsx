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

const FeedSection = () => {
  const observerTaget = useRef(null);
  const navigate = useNavigate();

  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const res = await api.get(`/api/user/get-feed?page=${pageParam}`);
      console.log("res: ", res);
      return { data: res.data };
      // const data = res.userPosts.rows;
      // console.log(...data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const {
    data: postsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["get-feed"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("page length ; ", lastPage);
      if (lastPage?.data?.userPosts?.length === 0) return undefined;
      return lastPage.data.nextPage;
    },
  });

  const posts = postsData?.pages.flatMap((page) => page.data.userPosts) || [];
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
    console.log(isFetchingNextPage, fetchNextPage, hasNextPage);

    return () => {
      if (observerTaget.current) {
        observer.unobserve(observerTaget.current);
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  return (
    <>
      {
        <div>
          {posts.map((post) => {
            return <Message key={post.message_id} post={post} />;
          })}
          <div ref={observerTaget} className="h-3">
            {isFetchingNextPage ? "loading..." : ""}
          </div>
        </div>
      }
    </>
  );
};

export default FeedSection;
