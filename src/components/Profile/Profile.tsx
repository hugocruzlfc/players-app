"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  db,
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "@/shared";
import { Toast } from "../Toast";
import { PostItem } from "../Posts";
import { Post } from "@/types";

export const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState<Post[]>([]);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUserPost();
  }, [session, showToast]);

  const getUserPost = async () => {
    setUserPost([]);
    if (session?.user?.email) {
      const q = query(
        collection(db, "posts"),
        where("email", "==", session?.user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        setUserPost((userPost) => [...userPost, data] as Post[]);
      });
    }
  };

  const onDeletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    setShowToast(true);
    const updatePosts = userPost.filter((item) => item.id !== id);
    setUserPost(updatePosts);
  };

  return (
    <div className="p-6 mt-8">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Deleted Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      <h2 className="text-[35px] font-extrabold text-blue-500">Profile</h2>
      <p>Manage Your Post</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">
        {userPost &&
          userPost?.map((item, index) => (
            <div
              key={index}
              className="pr-12"
            >
              <PostItem
                post={item}
                modal={true}
              />
              <button
                className="bg-red-500 w-full p-1 mt-1 rounded-md text-white"
                onClick={() => onDeletePost(item.id!)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
