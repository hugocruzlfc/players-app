import { Post } from "./Post";

export type PostInput = Omit<Post, "id">;
