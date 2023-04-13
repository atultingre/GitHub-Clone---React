import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

const Followers = ({username}) => {
  const [followers, setFollowers ] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);
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

    fetchFollower();
  }, [username]);

  if (isLoading) {
    return <div className="card follower-skeleton">
    <div className="skeleton avatar-skeleton"></div>
    <div className="skeleton title-skeleton"></div>
  </div>;
  }

  if (!Array.isArray(followers) || followers.length === 0) {
    return <div><div className="error-content">
    <p className="title-1">
      Oops!
      <GoSmiley style={{ display: "inline" }} />
    </p>
    <p className="text">Doesn't have any follower yet.</p>
  </div></div>;
  }


  return (
    <div>
  <div
    className="tab-panel"
    role="tabpanel"
    id="panel-3"
    aria-labelledby="tab-3"
    tabIndex="0"
    data-tab-panel
    data-follower-panel
  >  
      <div>
        {followers.map((follower) => (
          <article className="card follower-card" key={follower.id}>
            <figure className="avatar-circle img-holder">
              <img
                src={follower.avatar_url}
                alt={follower.login}
                className="img-cover"
                width="56"
                height="56"
                loading="lazy"
              />
            </figure>
            <h3 className="card-title">{follower.login}</h3>
            <button className="icon-btn" aria-label="Go to atul profile">
              <a
                href={follower.html_url}
                className="material-symbols-rounded"
                aria-hidden="true"
              >
                <FaLink />
              </a>
            </button>
          </article>
        ))}
      </div>
  </div>
</div>
  );
};

export default Followers;
