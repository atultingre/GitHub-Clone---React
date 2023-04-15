import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("repos");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="tab-container">
      <div className="tab-list">
        <Link className={activeTab === "repos" ? "tab-btn active" : "tab-btn"} aria-selected={activeTab === "repos"} onClick={() => handleTabClick("repos")} to="/repos" >
          Repositories
        </Link>
        <Link className={activeTab === "following" ? "tab-btn active" : "tab-btn"} aria-selected={activeTab === "following"} onClick={() => {  handleTabClick("following");  }} to="/following"  >
          Following
        </Link>
        {/* <Link  className={activeTab === "followers" ? "tab-btn active" : "tab-btn"} aria-selected={activeTab === "followers"} onClick={() => handleTabClick("followers")} to="/followers" >
          Followers
        </Link> */}
      </div>
    </section>
  );
};

export default Navbar;
