"use client";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  db,
  storage,
  getDownloadURL,
  doc,
  setDoc,
  uploadBytes,
  ref,
  GameListData,
} from "@/shared";
import { Toast } from "../Toast";
import { PostInput } from "@/types";

export const CreatePost: React.FC = () => {
  const { data: session } = useSession();
  const [inputs, setInputs] = useState<PostInput | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);

    try {
      const storageRef = ref(storage, "players-app/" + file?.name);
      const newPost = {
        ...inputs,
        userName: session?.user?.name as string,
        userImage: session?.user?.image as string,
        email: session?.user?.email,
      };

      if (file) {
        await uploadBytes(storageRef, file);
        newPost.image = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "posts", Date.now().toString()), newPost);
      setInputs(null);
      fileRef.current?.value && (fileRef.current.value = "");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="mt-4">
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          value={inputs?.title ?? ""}
        />
        <textarea
          name="description"
          className="w-full mb-4 outline-blue-400 border-[1px]  p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Write Description here"
          value={inputs?.description ?? ""}
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          value={inputs?.date ?? ""}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          value={inputs?.location ?? ""}
        />
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          value={inputs?.zip ?? ""}
        />
        <select
          name="game"
          onChange={handleChange}
          required
          className="w-full mb-4 border-[1px] p-2 rounded-md"
          value={inputs?.game ?? ""}
        >
          <option
            value=""
            disabled
          >
            Select Game
          </option>
          {GameListData.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png , image/jpg"
          className="mb-5 border-[1px] w-full"
          ref={fileRef}
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
