import React, { useEffect, useState} from "react";
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
