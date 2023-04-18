import React, { useEffect, useState} from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

const Followers = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
        setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/followers`
        );
        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
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

    fetchFollowers();
  }, [username]);

  return (
    <>
      <div className=" tab-panel">
        {isLoading ? (
            <div className=" card">
                <article className="follower-card">
                    <div className=" follower-skeleton">
                        <div className="skeleton avatar-skeleton"></div>
                        <div className="skeleton title-skeleton"></div>
                    </div>
                </article>
            </div>
        ) : followers.length > 0 ? (
          followers.map((user) => (
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
            <p className="text">Doesn't have any follower yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Followers;
