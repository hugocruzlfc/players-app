import Image from "next/image";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export const Header: React.FC = () => {
  return (
    <section className="flex justify-between p-3 border-b-[2px] border-[#FF3366]">
      <Image
        src="/images/players-logo.png"
        alt="Logo"
        width={150}
        height={150}
      />
      <div className="flex gap-4">
        <button className="p-2 px-3 rounded-full bg-black text-white">
          <span className="hidden sm:block">Create Post</span>
          <HiOutlinePencilSquare className="sm:hidden text-[20px]" />
        </button>
        <button className="p-2 px-3 bg-white text-gray-500 border-[1px] rounded-full">
          <span className="hidden sm:block"> Sign In</span>
          <HiArrowLeftOnRectangle className="sm:hidden text-[20px]" />
        </button>

        <Image
          src="/icons/user-profile.svg"
          alt="User Profile"
          width={40}
          height={40}
          className="cursor-pointer"
        />
      </div>
    </section>
  );
};
