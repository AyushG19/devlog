import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import MessagePlaceholder from "./messagePlaceholder";
import api from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router";

const FeedSection = () => {
  const observerTaget = useRef(null);
  const { fetchPosts } = useContext(UserContext);
  const pageType = useParams().page;

  const {
    data: postsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["get-feed", pageType],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, pageType),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.userPosts?.length === 0) return undefined;
      return lastPage.data.nextPage;
    },
    staleTime: 60 * 1000,
  });

  const posts = postsData?.pages.flatMap((page) => page.data.userPosts) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTaget.current) {
      observer.observe(observerTaget.current);
    }

    return () => {
      if (observerTaget.current) {
        observer.unobserve(observerTaget.current);
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  return (
    <div className="w-full">
      {posts.length === 0
        ? [...Array(5)].map((_, i) => <MessagePlaceholder key={i} />)
        : posts.map((post, i) => <Message key={i} post={post} />)}

      {/* Loader Placeholder Instead of Removing Content */}

      {/* Intersection Observer Target */}
      <div ref={observerTaget} className="h-3">
        {isFetchingNextPage && (
          <div className="w-full h-4 bg-gray-300 rounded-md mb-1"></div>
        )}
      </div>
    </div>
  );
};

export default FeedSection;
