"use client";
import React, { useState } from "react";
import { Post } from "@/types";
import { PostItem } from "./PostItem";
import { PostModal } from "./PostModal";

export interface PostsProps {
  posts: Post[];
}

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [post, setPost] = useState<Post | null>(null);

  return (
    <div>
      <PostModal post={post!} />
      <div
        className="grid grid-cols-1 
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    gap-5 mt-5 px-10"
      >
        {posts.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              window.my_modal_1.showModal();
              setPost(item);
            }}
          >
            <PostItem
              post={item}
              modal={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
