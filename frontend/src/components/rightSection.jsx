import React, { useContext, useState } from "react";
import TweetModal from "./TweetModal";
import PeopleSuggestion from "./PeopleSuggestion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserContext } from "../context/userContext";

const rightSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const { fetchUserSuggestion } = useContext(UserContext);
  const handleClose = () => {
    setOpenModal(false);
  };
  const { data, isFetchingData } = useInfiniteQuery({
    queryKey: ["get-user-suggestion"],
    queryFn: ({ pageParam = 1 }) => fetchUserSuggestion(pageParam),
    initialPageParam: 1,
    getNextPageParam: (prevPage) => {
      if (prevPage.data?.suggestion?.length === 0) return undefined;
      return prevPage.data.nextPage;
    },
  });

  const users = data?.pages.flatMap((user) => user.data.suggestion) || [];
  return (
    <div
      className="p-2 flex flex-col gap-2 max-h-24"
      style={{
        gridArea: "rightside",
      }}
    >
      {data && <PeopleSuggestion users={users} />}
      <button
        className="rounded-full bg-[var(--primary-light)] p-[5px_15px] hover:bg-[var(--primary)] cursor-pointer "
        onClick={() => setOpenModal(true)}
      >
        Write something
      </button>
      {openModal && <TweetModal closeModal={handleClose} />}
    </div>
  );
};

export default rightSection;
