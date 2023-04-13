import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

const FollowingList = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

    fetchFollowing();
  }, [username]);

  if (isLoading) {
    return (
      <div className="card follower-skeleton">
        <div className="skeleton avatar-skeleton"></div>
        <div className="skeleton title-skeleton"></div>
      </div>
    );
  }

  if (!Array.isArray(following) || following.length === 0) {
    return (
      <div>
        <div className="error-content">
          <p className="title-1">
            Oops!
            <GoSmiley style={{ display: "inline" }} />
          </p>
          <p className="text">Doesn't have any follo yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {following.map((user) => (
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
              aria-label={`Go to ${user.login}'s profile`}>
              <a
                href={user.html_url}
                className="material-symbols-rounded"
                aria-hidden="true">
                <FaLink />
              </a>
            </button>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
