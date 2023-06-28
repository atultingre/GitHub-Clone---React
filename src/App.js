import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./components/Header/Header.css";
import Profile from "./components/Sidebar/Profile";
import Navbar from "./components/Navbar/Navbar";
import Repository from "./components/Repository/Repository";
import Following from "./components/Following/Following";
import Header from "./components/Header/Header";
import { useMemo } from "react";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("atultingre");
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  const handleApiCall = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const [user, repo] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);
        setUserData(user.data);
        setRepositories(repo.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        setIsLoading(false);
      }
    } else {
      setUserData(null);
    }
  };

  useMemo(() => {
    handleApiCall();
    // eslint-disable-next-line
  }, []);

  // useCallback(() => {}, [username]);

  // useEffect(() => {
  //   handleApiCall();
  //   // eslint-disable-next-line
  // }, []);

  const handleSearch = () => {
    handleApiCall();
  };
  return (
    <div>
      <Header
        username={username}
        setUsername={setUsername}
        handleSearch={handleSearch}
      />
      <main className="main" id="main">
        <div className="container">
          <Profile userData={userData} isLoading={isLoading} />
          <section className="tab-container">
            <Navbar />
            <div className="tab-panel">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Repository
                      username={username}
                      repositories={repositories}
                      isLoading={isLoading}
                    />
                  }></Route>
                <Route
                  exact
                  path="/repos"
                  element={
                    <Repository
                      // username={username}
                      repositories={repositories}
                      isLoading={isLoading}
                    />
                  }></Route>
                <Route
                  exact
                  path="/following"
                  element={<Following username={username} />}></Route>
              </Routes>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
