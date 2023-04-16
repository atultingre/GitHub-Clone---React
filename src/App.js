import React, { useEffect, useState } from "react";
import { BsSearch, BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./components/Header/Header.css";
import Profile from "./components/Sidebar/Profile";
import Navbar from "./components/Navbar/Navbar";
import Repository from "./components/Repository/Repository";
import Following from "./components/Following/Following";
// import Followers from "./components/Followers/Followers";

const App = () => {

  //DARK MODE

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

  //HEADER SCROLL

  const handleScroll = () => {
    const header = document.querySelector("[data-header]");
    if (header) {
      header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HEADER
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleApiCall = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        // console.log(response.data)
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


  const handleSearch = () => {
    handleApiCall();
  };

  // ENTER TO SEARCH

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div>
      <header className="header " data-header>
        <div className="container">
          <a href="/" className="logo">
            <span className="text-primary">Git</span>InSight
          </a>
          <div className="header-search">
            <div className="search-box" id="searchBox">
              <span className="material-symbols-rounded leading-icon">
                <BsSearch />
              </span>
              <form onSubmit={(e)=> e.preventDefault()}></form>
              <input type="search"  name="search" placeholder="Search username" className="search-field label-1" value={username} onChange={(e) => setUsername(e.target.value)}   onKeyPress={handleKeyPress} required/>
              <button className="search-btn" onClick={handleSearch} >
                <span className="material-symbols-rounded">
                  <BsSearch />
                </span>
              </button>
            </div>
          </div>
          <button onClick={toggleTheme}  className="theme-btn icon-btn"  >
            <BsSunFill className="material-symbols-rounded sun-icon"  />
            <BsFillMoonFill  className="material-symbols-rounded moon-icon" />
          </button>
        </div>
      </header>
      <main className="main" id="main">
        <div className="container">
          <Profile userData={userData} isLoading={isLoading}/>
          <Router>
            <section className="tab-container">
              <Navbar />
              <div className="tab-panel">
                <Routes>
                  <Route exact path="/repos"  element={  <Repository username={username} /> }></Route>
                  <Route  exact path="/following" element={<Following username={username} />}></Route>
                  {/* <Route exact path="/followers" element={ <Followers username={username} /> }></Route> */}
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
