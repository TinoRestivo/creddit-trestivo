/*
 * FILE:				  SearchPosts.tsx
 * PROJECT:			Front end assignment
 * PROGRAMMER:		Tino Restivo
 * FIRST VERSION:	Feb 22, 2026
 * DESCRIPTION:
 * Called when searching posts.
 */

import "./App.css";
import type { UserDataInterface } from "./UserDataInterface.tsx";
import { useState, useEffect } from "react";
import type { PostInterface } from "./PostInterface.tsx";
import PostRender from "./PostRender.tsx";

// Address of our backend API
const API_URL = " https://awf-api.lvl99.dev";
//Contains bool for change view and interface for user data such as name
interface SearchPostsProp {
  ChangeView: (view: boolean) => void;
  UserData: UserDataInterface;
}

const SearchPosts: React.FC<SearchPostsProp> = ({ ChangeView, UserData }) => {
  const [error, setError] = useState<string | null>(null);

  //start with empty list of forums
  const [forums, setForums] = useState<string[]>([]);

  //start with empty list of posts in the forum
  const [posts, setPosts] = useState<PostInterface[]>([]);

  //Fetch available fourms when user data changes
  useEffect(() => {
    if (UserData.user.username === "Not Logged in") {
      return;
    } else {
      fetchFourms();
    }
  }, [UserData]);

  //followed this link for selecting from drop down
  //https://www.w3schools.com/react/react_forms_select.asp
  //https://stackoverflow.com/questions/33256274/typesafe-select-onchange-event-using-reactjs-and-typescript
  const [SelectedForum, setSelectedForum] = useState(" ");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForum(event.target.value);
  };

  //Show the top 10 hot posts when user selects a forum
  useEffect(() => {
    if (SelectedForum !== " ") {
      fetchForumPosts();
    }
  }, [SelectedForum]);

  //Change view button click event
  const changeViewButtonClicked = () => {
    ChangeView(true);
  };
  //Get the posts for the forum
  const fetchForumPosts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/forums/${SelectedForum}/?sortBy=hot&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${UserData.access_token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch fourms");
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
  //Taken from week 4 demo and modified
  /**
   * This function makes a request to the backend to GET the list of forums.
   *
   * All web API requests take some time to complete so we need to use async/await.
   */
  const fetchFourms = async () => {
    try {
      const response = await fetch(`${API_URL}/forums`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserData.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch fourms");
      }

      const data = await response.json();
      //push one blank item so our drop down starts blank
      let tempForums: string[] = [];
      tempForums.push(" ");
      for (let value of data) {
        tempForums.push(value.slug);
      }
      setForums(tempForums);
      setError(null); // Clear any previous errors.
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <div id="NavDiv">
        <button className="FavBtn" onClick={changeViewButtonClicked}>
          View fav posts
        </button>
      </div>
      <div id="SearchDiv">
        <h2>Select a forum</h2>
        <label htmlFor="Forums">Choose a forum</label>
        <select
          id="Forums"
          name="Forums"
          value={SelectedForum}
          onChange={handleChange}
        >
          {/*code for the drop down select from https://www.w3schools.com/react/react_lists.asp*/}
          {forums.map((forum, index) => (
            <option key={index} value={forum}>
              {forum}
            </option>
          ))}
        </select>
      </div>
      <div id="PostsDiv">
        <h2>List of posts</h2>
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

export default SearchPosts;
