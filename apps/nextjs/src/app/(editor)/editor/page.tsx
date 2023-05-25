import React from "react";
import Content from "./content";

export const revalidate = 60;

const Post = () => {
  return (
    <main className="px-10 leading-7">
      <div className="mb-5 gap-10 md:flex">
        <div className="basis-3/4">
          <Content />
        </div>
        <div className="basis-1/4">
        </div>
      </div>
    </main>
  );
};

export default Post;
