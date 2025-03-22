import React from "react";

const MessagePlaceholder = () => {
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 animate-pulse">
      {/* Placeholder for User Info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className="bg-gray-300 rounded-full size-10 mr-3"></div>
          <div>
            <div className="w-24 h-4 bg-gray-300 rounded-md mb-1"></div>
            <div className="w-16 h-3 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
      </div>

      {/* Placeholder for Message Text */}
      <div className="pl-5 mb-2">
        <div className="w-full h-3 bg-gray-300 rounded-md mb-2"></div>
        <div className="w-full h-3 bg-gray-300 rounded-md mb-2"></div>
        <div className="w-3/4 h-3 bg-gray-300 rounded-md"></div>
      </div>

      {/* Placeholder for Interactions */}
      <div className="flex justify-between pl-5 py-2">
        <div className="flex gap-8">
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-gray-300 rounded-full w-14 h-6"></div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-gray-300 rounded-full w-14 h-6"></div>
          <div className="flex items-center justify-center gap-1 p-[5px_15px] bg-gray-300 rounded-full w-14 h-6"></div>
        </div>
        <div className="w-10 h-4 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default MessagePlaceholder;
