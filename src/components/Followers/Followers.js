import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import "./Follower.css"

const Followers = ({ username }) => {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/followers`
        );
        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
        } else {
          setError("Error fetching following list: " + response.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching following list:", error);
        setError("Error fetching following list: " + error.message);
        setIsLoading(false);
      }
    };

    if (username) {
      fetchFollower();
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="card follower-skeleton">
        <div className="skeleton avatar-skeleton"></div>
        <div className="skeleton title-skeleton"></div>
      </div>
    );
  }

  if (!Array.isArray(followers) || followers.length === 0) {
    return (
      <div>
        <div className="error-content">
          <p className="title-1">
            Oops!
            <GoSmiley style={{ display: "inline" }} />
          </p>
          <p className="text">Doesn't have any follower yet.</p>
        </div>
      </div>
    );
  }

  return (
  <div>

      {followers.map((user) => (
        <article className="card follower-card" key={user.login}>
          <figure className="avatar-circle img-holder">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="img-cover"
              width="56"
              height="56"
              loading="lazy"
            />
          </figure>
          <h3 className="card-title">{user.login}</h3>
          <button
            className="icon-btn"
            >
            <a
              href={user.html_url}
              className="material-symbols-rounded"
              >
              <FaLink />
            </a>
          </button>
        </article>
      ))}
  </div>
  );
};

export default Followers;
