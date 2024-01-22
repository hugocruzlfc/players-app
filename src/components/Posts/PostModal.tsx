import React from "react";
import { Post } from "@/types";
import { HiOutlineXCircle } from "react-icons/hi";
import { PostItem } from "./PostItem";

export interface PostModalProps {
  post: Post;
}

export const PostModal: React.FC<PostModalProps> = ({ post }) => {
  return (
    <div>
      <dialog
        id="my_modal_1"
        className="modal p-0 rounded-lg"
      >
        <form
          method="dialog"
          className="modal-box"
        >
          <button className="absolute right-2 top-2">
            <HiOutlineXCircle className="text-[22px] text-white" />
          </button>
          <PostItem post={post} />
        </form>
      </dialog>
    </div>
  );
};
