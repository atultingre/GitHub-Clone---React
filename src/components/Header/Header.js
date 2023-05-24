import React, { useEffect, useState } from "react";
import { BsSearch, BsSunFill, BsFillMoonFill } from "react-icons/bs";

const Header = ({ username, setUsername, handleSearch }) => {
  //DARK MODE

  const [theme, setTheme] = useState("dark");
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
              <form onSubmit={(e) => e.preventDefault()}></form>
              <input
                type="search"
                name="search"
                placeholder="Search username"
                className="search-field label-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                required
              />
              <button className="search-btn" onClick={handleSearch}>
                <span className="material-symbols-rounded">
                  <BsSearch />
                </span>
              </button>
            </div>
          </div>
          <button onClick={() => toggleTheme()} className="theme-btn icon-btn">
            <BsSunFill className="material-symbols-rounded sun-icon" />
            <BsFillMoonFill className="material-symbols-rounded moon-icon" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
