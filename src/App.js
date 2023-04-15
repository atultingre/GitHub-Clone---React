import React, { useEffect, useState } from "react";
import { BsSearch, BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// BsArrowLeft,
import axios from "axios";
import "./App.css";
import "./components/Header/Header.css";
import Profile from "./components/Sidebar/Profile";
import Navbar from "./components/Navbar/Navbar";
import Repository from "./components/Repository/Repository";
import Following from "./components/Following/Following";
// import Followers from "./components/Followers/Followers";
// import Forks from "./components/Forks/Forks";

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
  // const [repositories, setRepositories] = useState([]);
  // setFollowers

  const handleSearch = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        
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
    
    // const handleFetchFollowers = async () => {
    // if (username !== "") {
    // setIsLoading(true);
    // try {
    // const response = await axios.get(
    // `https://api.github.com/users/${username}/followers`
    // );
    // console.log("Followers Data:", response.data);
    // setIsLoading(false);
    // } catch (error) {
    // console.error("Error fetching followers data:", error);
    // setIsLoading(false);
    // }
    // }
    // };

    


  return (
    <div>
      <header className="header ">
        <div className="container">
          <a href="/" className="logo">
            <span className="text-primary">Git</span>InSight
          </a>
          <div className="header-search">
            <div className="search-box" id="searchBox">
              <span className="material-symbols-rounded leading-icon">
                <BsSearch />
              </span>
              <input
                type="search"
                name="search"
                placeholder="Search username"
                className="search-field label-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // ref={searchFieldRef}
              />
              {/* data-search-field */}

              <button className="search-btn" onClick={handleSearch}>
                {/* aria-label="Search submit" data-search-submit */}
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
          <Router>
            <section className="tab-container">
              <Navbar
                // handleFetchFollowing={handleFetchFollowing}
                // handleFetchFollowers={handleFetchFollowers}
              />
              <div className="tab-panel" role="tabpanel" id="panel-1">
                <Routes>
                  <Route
                    exact
                    path="/repos"
                    element={
                      <Repository
                        
                        username={username}
                      />
                    }></Route>
                  <Route
                    exact
                    path="/following"
                    element={<Following username={username}/>}></Route>
                  {/* <Route
                    exact
                    path="/followers"
                    element={
                      <Followers
                        username={username}
                        setUsername={setUsername}
                      />
                    }></Route> */}
                  {/* <Route exact path="/forks" element={<Forks repositories={repositories}  isLoading={isLoading}/>}></Route> */}
                </Routes>
              </div>
            </section>
          </Router>
        </div>
      </main>
    </div>
  );
};

export default App;
