import React, { useState } from "react";
import { BookMarked } from "lucide-react";

const blog = () => {
  const [isImg, setIsImg] = useState("");
  return (
    <div className="flex flex-col bg-white border-b py-3 px-4 w-full ">
      {/*user info section  */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className=" bg-white rounded-full size-10  mr-3"></div>
          <div>
            <p className="font-semibold text-lg w-full">lucky guy</p>
            <p className="text-sm -mt-1 opacity-60 italic w-full">@username</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1  p-[5px_15px] bg-[var(rgb(var(rgb(var(--primary))-light)))] rounded-full cursor-pointer hover:bg-[rgb(var(--primary))] transition-all duration-200 w-full">
          <BookMarked size={13} />
          <p className="text-xs">save</p>
        </div>
      </div>
      {/* blog section  */}
      <h1 className="font-bold text-xl pl-5 mb-2 w-full">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid natus
        dolor, molestiae incidunt temporibus facere, rem explicabo animi, culpa
        beatae aut est.
      </h1>
      {isImg && <img src={isImg} alt="image" />}
    </div>
  );
};

export default blog;
