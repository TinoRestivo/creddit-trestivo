import "./App.css";
import { useState, useEffect } from "react";
import type { UserDataInterface } from "./UserDataInterface.tsx";
import type { PostInterface } from "./PostInterface.tsx";
import PostRender from "./PostRender.tsx";

// Address of our backend API
const API_URL = " https://awf-api.lvl99.dev";

interface FavPostsProp {
  ChangeView: (view: boolean) => void;
  UserData: UserDataInterface;
}

const FavPosts: React.FC<FavPostsProp> = ({ ChangeView, UserData }) => {
  interface favPostProps {
    ids: string[];
  }
  const favPostIds: favPostProps = { ids: [] };

  const [error, setError] = useState<string | null>(null);
  // When the view is called get the liked posts from webstorage api and then fetch them.
  useEffect(() => {
    setFavPostIds();
    fetchForumPosts();
  }, []);

  //start with empty list of posts in the forum
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const changeViewButtonClicked = () => {
    ChangeView(false);
  };

  function setFavPostIds() {
    favPostIds.ids = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        if (localStorage.getItem(key) === "true") favPostIds.ids.push(key);
      }
    }
  }

  const fetchForumPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserData.access_token}`,
        },
        body: JSON.stringify(favPostIds),
      });
      if (!response.ok) {
        throw new Error("Could not find any fav posts");
      }

      const data = await response.json();
      let tempPosts: PostInterface[] = [];
      for (let value of data) {
        tempPosts.push(value);
      }

      setPosts(tempPosts);

      setError(null); // Clear any previous errors.
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <div id="NavDiv">
        <button className="BackBtn" onClick={changeViewButtonClicked}>
          Back
        </button>
      </div>

      <div id="FavPostsDiv">
        <h2>List of your fav posts</h2>
        {posts.map((postData) => (
          <div key={postData.id}>
            <PostRender
              PostData={postData}
              Liked={localStorage.getItem(postData.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FavPosts;
