import "./App.css";
import { useState } from "react";
import type { PostInterface } from "./PostInterface.tsx";

interface PostDataProp {
  PostData: PostInterface;
  Liked: string | null;
}

const PostRender: React.FC<PostDataProp> = ({ PostData, Liked }) => {
  const [likeValue, wasClicked] = useState<string | null>(Liked);

  const likeButtonClicked = () => {
    if (localStorage.getItem(PostData.id) === "true") {
      localStorage.setItem(PostData.id, "false");
      wasClicked("false");
    } else {
      localStorage.setItem(PostData.id, "true");
      wasClicked("true");
    }
  };

  return (
    <>
      <h2>{PostData.title}</h2>
      <p>{PostData.content}</p>
      <p>
        By {PostData.author} {PostData.totalLikes} likes and{" "}
        {PostData.totalRead} reads
      </p>
      <p>
        <button className="LikedBtn" onClick={likeButtonClicked}>
          {likeValue === "true" ? "Liked" : "Not Liked"}{" "}
        </button>
      </p>
    </>
  );
};

export default PostRender;
