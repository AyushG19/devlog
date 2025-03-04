import React, { useState } from "react";
import { BookMarked } from "lucide-react";

const blog = () => {
  const [isImg, setIsImg] = useState("");
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 ">
      {/*user info section  */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center justify-center">
          <div className=" bg-black rounded-full size-10  mr-3"></div>
          <div>
            <p className="font-semibold text-lg">lucky guy</p>
            <p className="text-sm -mt-1 opacity-60 italic ">@username</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1  p-[5px_15px] bg-[var(--primary-light)] rounded-full cursor-pointer hover:bg-[var(--primary)] transition-all duration-200 ">
          <BookMarked size={13} />
          <p className="text-xs">save</p>
        </div>
      </div>
      {/* blog section  */}
      <h1 className="font-bold text-xl pl-5 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid natus
        dolor, molestiae incidunt temporibus facere, rem explicabo animi, culpa
        beatae aut est.
      </h1>
      {isImg && <img src={isImg} alt="image" />}
    </div>
  );
};

export default blog;
