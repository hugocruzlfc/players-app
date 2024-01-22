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

export const CreatePost: React.FC = () => {
  const [inputs, setInputs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [submit, setSubmit] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  useEffect(() => {
    if (submit) {
      savePost();
      setSubmit(false); // Limpiar el estado después de guardar
    }
  }, [submit]);

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
      const storageRef = ref(storage, "ninja-player/" + file?.name);
      if (file) {
        await uploadBytes(storageRef, file);
        console.log("Uploaded a blob or file!");
      }

      const url = await getDownloadURL(storageRef);
      setInputs((values) => ({ ...values, image: url }));
      setSubmit(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const savePost = async () => {
    await setDoc(doc(db, "posts", Date.now().toString()), inputs);
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
        />
        <textarea
          name="desc"
          className="w-full mb-4 
        outline-blue-400 border-[1px] 
        p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Write Description here"
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <select
          name="game"
          onChange={handleChange}
          required
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        >
          <option
            disabled
            defaultValue=""
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
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 
rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
