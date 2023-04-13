import React, { useEffect, useRef, useState } from "react";
import { BsSearch, BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// BsArrowLeft,
import axios from "axios";
import "./App.css";
import Profile from "./components/Sidebar/Profile";
import Navbar from "./components/Navbar/Navbar";
import Repository from "./components/Repository/Repository";
import Following from "./components/Following/Following";
import Followers from "./components/Followers/Followers";
import Forks from "./components/Forks/Forks";

const App = () => {
  // DARK MODE
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // header
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  // setFollowers
  const searchFieldRef = useRef(null);
  //   const handleSearch = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.github.com/users/${username}`
  //       );
  //       setIsLoading(false);
  //       setUserData(response.data);
  //       handlefetchRepositories(username); // Call handlefetchRepositories with the username
  //     } catch (error) {
  //       console.error("Error fetching user data: ", error);
  //     }
  //   };

  const handleSearch = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        setIsLoading(false);
        handlefetchRepositories(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        setIsLoading(false);
      }
    } else {
      setUserData(null);
    }
  };

  const handlefetchRepositories = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(response.data);
      //   console.log(repositories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching repositories: ", error);
      setIsLoading(false);
    }
  };

  // Fetch default user data on app load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/atultingre"
        );
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Fetch default user data on app load
  useEffect(() => {
    const fetchUserDataRepo = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/atultingre/repos"
        );
        setRepositories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchUserDataRepo();
  }, []);

  return (
    <div>
      <header className="header " data-header>
        <div className="container">
          <a href="/" className="logo">
            <span className="text-primary">Git</span>InSight
          </a>
          <div className="header-search">
            {/* <button className="icon-btn search-toggler" aria-controls="searchBox">
                                <span className="material-symbols-rounded search-icon" aria-hidden="true">
                                    <BsSearch/>
                                </span>
                                <span className="material-symbols-rounded close-icon" aria-hidden="true">
                                    {/* {/* <BsArrowLeft/> */}
            {/* </span> */}
            {/* </button> */}
            <span
              className="material-symbols-rounded leading-icon"
              aria-hidden="true">
              {/* <BsSearch />   */}
            </span>
            <span
              className="material-symbols-rounded close-icon"
              aria-hidden="true">
              {/* <BsArrowLeft/>  */}{" "}
            </span>
            <div className="search-box" id="searchBox">
              <span
                className="material-symbols-rounded leading-icon"
                aria-hidden="true">
                <BsSearch />
              </span>
              <input
                type="search"
                name="search"
                placeholder="Search username"
                ref={searchFieldRef}
                className="search-field label-1"
                data-search-field
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <button
                className="search-btn"
                aria-label="Search submit"
                data-search-submit
                onClick={handleSearch}>
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsSearch />
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-btn icon-btn"
            aria-pressed="false"
            aria-label="Toggle dark and light theme"
            data-theme-btn>
            <BsSunFill
              className="material-symbols-rounded sun-icon"
              aria-hidden="true"
            />
            <BsFillMoonFill
              className="material-symbols-rounded moon-icon"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>
      <main className="main" id="main">
        <div className="container">
          <Profile userData={userData} isLoading={isLoading} />
          <section className="tab-container">
            <Router>
              <Navbar />
              <div className="tab-panel" role="tabpanel" id="panel-1">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Repository repositories={repositories} />
                    }></Route>
                  <Route
                    exact
                    path="/following"
                    element={<Following username={username} />}></Route>
                  <Route
                    exact
                    path="/followers"
                    element={<Followers username={username} />}></Route>
                  {/* <Route exact path="/forks" element={<Forks repositories={repositories}  isLoading={isLoading}/>}></Route> */}
                </Routes>
              </div>
            </Router>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
