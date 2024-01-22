"use client";
import { useEffect, useState } from "react";
import { GameList, Hero, Posts, Search } from "@/components";
import { Post } from "@/types";
import { db, getDocs, collection } from "@/shared";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const currentPost = doc.data();
      setPosts((prevPosts) => [...prevPosts, currentPost] as Post[]);
    });
  };

  return (
    <main
      className="flex flex-col items-center 
    justify-center mt-9 py-20"
    >
      <div className="w-[70%] md:w-[50%] lg:w-[55%]">
        <Hero />
        <Search />
        <GameList />
        {posts ? <Posts posts={posts} /> : null}
      </div>
    </main>
  );
}
