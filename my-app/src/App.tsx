import "./App.css";

import { useState, useEffect } from "react";
import SearchPosts from "./SearchPosts.tsx";
import FavPosts from "./FavPosts.tsx";
import type { UserDataInterface } from "./UserDataInterface.tsx";

// Address of our backend API
const API_URL = " https://awf-api.lvl99.dev";

function App() {
  const userData: UserDataInterface = {
    access_token: "invalid",
    user: {
      id: "invalid",
      username: "Not Logged in",
      firstName: "",
      lastName: "",
    },
  };

  const [showFavPosts, setView] = useState(false);

  const [user, setUser] = useState(userData);
  /**
   * This is used to keep track and display any errors that might occur due to the
   * API requests. We will use the Error object.
   *
   * We initialize it as null as we don't want to render the error message div if
   * there are no errors.
   */
  const [error, setError] = useState<string | null>(null);

  // From week 4 demo
  // When the App is mounted, get authentication from the api.
  useEffect(() => {
    authenticate();
  }, []);

  const postUser = {
    username: "trestivo8498",
    password: "8968498",
  };

  const authenticate = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postUser),
      });
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const data = await response.json();
      setUser(data);
      setError(null); // Clear any previous errors.
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <div id="UserNameDiv">
        <h2>User: {user.user.username}</h2>
      </div>
      {showFavPosts ? (
        <FavPosts ChangeView={setView} UserData={user} />
      ) : (
        <SearchPosts ChangeView={setView} UserData={user} />
      )}
    </>
  );
}

export default App;
