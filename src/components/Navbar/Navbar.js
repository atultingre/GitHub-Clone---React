import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handlefetchfollowing }) => {
  return (
    <section className="tab-container">
    <Link path="/"/>
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
        {/* <Link className="tab-btn" to="/followers">
          Followers
        </Link> */}
      </div>
    </section>
  );
};

export default Navbar;
