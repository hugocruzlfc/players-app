import React from "react";
import { HiOutlineXCircle } from "react-icons/hi";

export interface ToastProps {
  msg: string;
  closeToast: () => void;
}

export const Toast: React.FC<ToastProps> = ({ msg = "", closeToast }) => {
  return (
    <div
      className="duration-500 transition-all
     ease-in-out bg-[#36d399] 
     justify-between flex
      items-center p-4 rounded-md "
    >
      <h2>{msg}</h2>
      <button
        className=""
        onClick={closeToast}
      >
        <HiOutlineXCircle className="text-[22px] ml-5 text-white" />
      </button>
    </div>
  );
};
