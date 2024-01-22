import { NextPage } from "next";
import { CreatePost } from "@/components";

const Page: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="p-6 mt-8 lg:w-[35%] md:w-[50%]">
        <h2
          className="text-[30px] 
        font-extrabold text-blue-500"
        >
          CREATE POST
        </h2>
        <p>Create Post and Discover/Invite new Friends and Player </p>
        <CreatePost />
      </div>
    </div>
  );
};

export default Page;
