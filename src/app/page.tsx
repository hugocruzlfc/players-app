"use client";
import { useEffect, useState } from "react";
import { GameList, Hero, Posts, Search } from "@/components";
import { Post } from "@/types";
import { db, getDocs, collection, where, query } from "@/shared";

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

  const onGamePress = async (gameName: string) => {
    setPosts([]);
    if (gameName == "Other Games") {
      getPost();
      return;
    }
    const q = query(collection(db, "posts"), where("game", "==", gameName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      setPosts((posts) => [...posts, doc.data()]);
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
        <GameList onGamePress={onGamePress} />
        {posts ? <Posts posts={posts} /> : null}
      </div>
    </main>
  );
}
