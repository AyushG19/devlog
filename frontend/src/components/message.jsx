import React from "react";

const message = () => {
  return (
    <div className="flex flex-col bg-[var(--secondary)] border-b py-3 px-4 ">
      {/* Container for the user info */}
      <div className="flex items-center justify-center self-start mb-2">
        <div className="bg-black rounded-full size-8  mr-3"></div>
        <div className="">
          <p className="font-semibold">lucky guy</p>
          <p className="text-sm -mt-1">@username</p>
        </div>
      </div>
      {/* Container for the user text */}
      <div className="pl-5 mb-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vero
          iusto explicabo vel pariatur quaerat enim quis sapiente doloribus
          corporis eius perspiciatis voluptates, placeat soluta accusamus?
          Adipisci sunt at culpa.lorem Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Velit, laboriosam fuga natus esse doloremque
          reiciendis quidem impedit quo numquam saepe repellendus a aut minima
          molestiae ea consectetur officiis delectus culpa.
        </p>
      </div>
      {/* Container for interactions */}
      <div className="flex justify-between pl-5 py-2">
        <div className="flex gap-10">
          <div className="text-sm">like</div>
          <div className="text-sm">comment</div>
          <div className="text-sm">save</div>
        </div>
        <div className="text-sm">more</div>
      </div>
    </div>
  );
};

export default message;
