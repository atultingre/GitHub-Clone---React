// NAVBAR

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handlefetchfollowing }) => {
  return (
    <section className="tab-container">
      <div className=" tab-list" aria-label="Tab navigation" role="tablist">
        <Link className="tab-btn" aria-selected="true" to="/repos">
          <button>Repositories</button>
        </Link>
        <Link
          onClick={handlefetchfollowing}
          className="tab-btn"
          to="/following">
          Following
        </Link>
        <Link className="tab-btn" to="/followers">
          Followers
        </Link>
      </div>
    </section>
  );
};

export default Navbar;


// PROFILE.js

import React from "react";
import { IoMdOpen } from "react-icons/io";
import { ImEarth, ImLocation2 } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import Footer from "../Footer/Footer";


const Profile = ({ userData, isLoading }) => {
  const numberToKilo = function (number) {
    const /**{String}*/ numStr = String(number);

    if (numStr.length <= 3) {
      return numStr;
    } else if (numStr.length >= 4 && numStr.length <= 5) {
      return `${numStr.slice(0, -3)}.${numStr.slice(-3, -2)}k`;
    } else if (numStr.length === 6) {
      return `${numStr.slice(0, -3)}k`;
    } else {
      return `${numStr.slice(0, -6)}M`;
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            <section className="profile" data-profile-card>
              <div className="profile-skeleton">
                <div className="skeleton avatar-skeleton"></div>
                <div className="skeleton title-skeleton"></div>
                <div className="skeleton text-skeleton text-1"></div>
                <div className="skeleton text-skeleton text-2"></div>
                <div className="skeleton text-skeleton text-3"></div>
              </div>
            </section>
          </div>
        ) : userData ? (
          <div className="profile">
            <figure
              className="avatar-circle  img-holder"
              style={{ width: "200px", height: "200px" }}>
              <img
                src={userData.avatar_url}
                alt={userData.name}
                className="img-cover"
                width="200px"
                height="200px"
              />
            </figure>
            <h1 className="title-2">{userData.name}</h1>
            <p className="username text-primary">{userData.login}</p>
            <p className="bio">{userData.bio}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary">
              <span className="material-symbols-rounded" aria-hidden="true">
                <IoMdOpen />
              </span>
              <span className="open">See on Github</span>
            </a>
            <ul className="profile-meta">
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <ImLocation2 />
                </span>
                <span className="meta-text">
                  {userData.location ? userData.location : "Not available"}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <MdApartment />
                </span>
                <span className="meta-text">
                  {userData.company ? userData.company : "Not available"}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <ImEarth />
                </span>
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-text">
                  {userData.blog ? userData.blog : "Not available"}
                </a>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsTwitter />
                </span>
                <span className="meta-text">
                  {userData.twitter ? userData.twitter : "Not available"}
                </span>
              </li>
            </ul>
            <ul className="profile-stats">
              <li className="stats-item">
                <span className="body">{userData.public_repos}</span>
                Repos
              </li>
              <li className="stats-item">
                <span className="body">{numberToKilo(userData.followers)}</span>
                Followers
              </li>
              <li className="stats-item">
                <span className="body">{numberToKilo(userData.following)}</span>
                Following
              </li>
            </ul>
            <Footer />
          </div>
        ) : (
          <section className="error" data-error>
            <p className="title-1">Oops! :(</p>
            <p className="text">There is no account with this username yet.</p>
          </section>
        )}
      </div>
    </>
  );
};

export default Profile;


// Repository

import React from "react";
import { BiCodeBlock, BiGitRepoForked } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import {numberToKilo} from "../Functions.js"



const Repository = ({ isLoading, repositories }) => {
  if (isLoading) {
    return (
      <div className="card repo-skeleton">
        <div className="card-body">
          <div className="skeleton title-skeleton"></div>
          <div className="skeleton text-skeleton text-1"></div>
          <div className="skeleton text-skeleton text-2"></div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(repositories) || repositories.length === 0) {
    return (
      <div className="error-content">
        <p className="title-1">
          Oops!
          <GoSmiley style={{ display: "inline" }} />
        </p>
        <p className="text">Doesn't have any public repositories yet.</p>
      </div>
    );
  }




  return (
    <div>
      <div
        className="tab-panel"
        role="tabpanel"
        id="panel-1"
        aria-labelledby="tab-1"
        tabIndex="0"
        data-tab-panel
        data-repo-panel
        >
        <h2 className="sr-only">Repositories</h2>
        {repositories.map((repo) => (
          <article className="card repo-card" key={repo.id}>
            <div className="card-body">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="card-title">
                <h3 className="title-3">{repo.name}</h3>
              </a>
              <p className="card-text">{repo.description ? repo.description : "" }</p>
              <span className="badge">{repo.isPrivate ? "Private" : "Public"}</span>
            </div>
            <div className="card-footer">
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiCodeBlock />
                </span>
                <span className="span">{repo.language ? repo.language : ""}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsFillStarFill />
                </span>
                <span className="span">{numberToKilo(repo.stargazers_count)}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiGitRepoForked />
                </span>
                <span className="span">{numberToKilo(repo.forks)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Repository;

// isLoading ? (
//   <div className="card repo-skeleton">
//     <div className="card-body">
//       <div className="skeleton title-skeleton"></div>
//       <div className="skeleton text-skeleton text-1"></div>
//       <div className="skeleton text-skeleton text-2"></div>
//     </div>
//   </div>
// ) : (

//   <div className="error-content">
//   <p className="title-1">Oops! :(</p>
//   <p className="text">Doesn't have any public repositories yet.</p>
// </div>



// FOLLOWING

import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

const Following = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/following`
        );
        if (response.ok) {
          const data = await response.json();
          setFollowing(data);
          setIsLoading(false);
        } else {
          console.error("Error fetching following list:", response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching following list:", error);
        setIsLoading(false);
      }
    };

    fetchFollowing();
  }, [username]);

  return (
    <>
      <div className=" tab-panel">
        {isLoading ? (
          <div className="card follower-skeleton">
            <div className="skeleton avatar-skeleton"></div>
            <div className="skeleton title-skeleton"></div>
          </div>
        ) : following.length > 0 ? (
          following.map((user) => (
            <div className=" card" key={user.login}>
              <article className="follower-card">
                <figure className="avatar-circle img-holder">
                  <img
                    className="img-cover"
                    width="56px"
                    height="56px"
                    loading="lazy"
                    src={user.avatar_url}
                    alt={user.login}
                  />
                </figure>
                <h3 className="card-title">{user.login}</h3>
                <button className="icon-btn">
                  <a href={user.html_url} className="material-symbols-rounded">
                    <FaLink />
                  </a>
                </button>
              </article>
            </div>
          ))
        ) : (
          <div className="error-content">
            <p className="title-1">
              Oops!
              <GoSmiley style={{ display: "inline" }} />
            </p>
            <p className="text">Doesn't have any following yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Following;


// followers

import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import "./Follower.css";
import axios from "axios";

const Followers = ({ username, setUsername }) => {
  const [followers, setFollowers] = useState([]);

  const fetchFollowersData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/followers`
      );
      setFollowers(response.data);
    } catch (error) {
      console.error("Error fetching followers data:", error);
    }
  };

  useEffect(() => {
    fetchFollowersData();
  }, [username]);

  if (followers.length) {
    return (
      <div>
        <h2 className="sr-only">Following</h2>
        {followers.map((item) => {
          const { login: username, avatar_url, url } = item;
          return (
            <article className="card follower-card" key={username}>
              <figure className="avatar-circle img-holder">
                <img
                  className="img-cover"
                  width="56px"
                  height="56px"
                  loading="lazy"
                  src={avatar_url}
                  alt={username}
                />
              </figure>
              <h3 className="card-title">{username}</h3>
              <button
                className="icon-btn"
                onClick={() => setUsername(username)}>
                <span className="material-symbols-rounded">
                  <FaLink />
                </span>
              </button>
            </article>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};
export default Followers;


// App.js


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
import Followers from "./components/Followers/Followers";
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
  const [repositories, setRepositories] = useState([]);
  // const searchFieldRef = useRef(null);

  // setFollowers

  const handleSearch = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        handlefetchRepositories(username);
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

  const handlefetchRepositories = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(response.data);
      console.log(repositories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching repositories: ", error);
      setIsLoading(false);
    }
  };

  const handleFetchFollowing = async () => {
    if (username !== "") {
    setIsLoading(true);
    try {
    const response = await axios.get(
   ` https://api.github.com/users/${username}/following`
    );
    // Set the response data to the state or use it to update the UI as needed
    console.log("Following Data:", response.data);
    setIsLoading(false);
    } catch (error) {
    console.error("Error fetching following data:", error);
    setIsLoading(false);
    }
    }
    };
    
    const handleFetchFollowers = async () => {
    if (username !== "") {
    setIsLoading(true);
    try {
    const response = await axios.get(
    `https://api.github.com/users/${username}/followers`
    );
    // Set the response data to the state or use it to update the UI as needed
    console.log("Followers Data:", response.data);
    setIsLoading(false);
    } catch (error) {
    console.error("Error fetching followers data:", error);
    setIsLoading(false);
    }
    }
    };




  return (
    <div>
      {/* data-header */}
      <header className="header ">
        <div className="container">
          <a href="/" className="logo">
            <span className="text-primary">Git</span>InSight
          </a>
          <div className="header-search">
            <div className="search-box" id="searchBox">
              <span className="material-symbols-rounded leading-icon">
                {/* aria-hidden="true" */}
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
                handleFetchFollowing={handleFetchFollowing}
                handleFetchFollowers={handleFetchFollowers}
              />
              <div className="tab-panel" role="tabpanel" id="panel-1">
                <Routes>
                  <Route
                    exact
                    path="/repos"
                    element={
                      <Repository
                        repositories={repositories}
                        username={username}
                      />
                    }></Route>
                  <Route
                    exact
                    path="/following"
                    element={<Following username={username} />}></Route>
                  <Route
                    exact
                    path="/followers"
                    element={
                      <Followers
                        username={username}
                        setUsername={setUsername}
                      />
                    }></Route>
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




// Unnecessary


  // const handlefetchRepositories = async (username) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.github.com/users/${username}/repos`
  //     );
  //     setRepositories(response.data);
  //     console.log(repositories);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching repositories: ", error);
  //     setIsLoading(false);
  //   }
  // };
  // handlefetchRepositories(username);


  // app.js

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

  const handleSearch = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        console.log(response.data)
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
              <input type="search"  name="search" placeholder="Search username" className="search-field label-1" value={username} onChange={(e) => setUsername(e.target.value)} />
              <button className="search-btn" onClick={handleSearch}>
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
          <Profile userData={userData} isLoading={isLoading} />
          <Router>
            <section className="tab-container">
              <Navbar />
              <div className="tab-panel">
                <Routes>
                  <Route exact path="/repos"  element={  <Repository username={username} /> }></Route>
                  <Route  exact path="/following" element={<Following username={username}/>}></Route>
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
