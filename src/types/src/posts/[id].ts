import { PostData } from "@/src/lib/posts";

export interface PostProps {
  postData: PostData;
}

export interface Params {
  params: {
    id: string;
  };
}
