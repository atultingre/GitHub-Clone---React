import React, { useEffect, useState} from "react";
import { FaLink } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

const Following = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        setIsLoading(true);
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
        // setIsLoading(false);
      }
    };

    fetchFollowing();
  }, [username]);



  if (isLoading) {
    const skeletons = Array.from({ length: 6 }).map((_, index) => (
        <div className="card follower-skeleton" key={index}>
        <div className="skeleton avatar-skeleton"></div>
        <div className="skeleton title-skeleton"></div>
      </div>
    ));
    return skeletons;
  }

  if (!Array.isArray(following) || following.length === 0) {
    return (
      <div className="error-content">
        <p className="title-1">
          Oops!
          <GoSmiley style={{ display: "inline" }} />
        </p>
        <p className="text">Doesn't have any public following yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className=" tab-panel">
        {isLoading ? (
          <div className="card follower-skeleton">
            <div className="card-body">
                <div className="skeleton avatar-skeleton"></div>
                <div className="skeleton title-skeleton"></div>
            </div>
          </div>
        ) : following.length > 0 ? (
          following.map((user) => (
            <div className=" card" key={user.login}>
              <article className="follower-card">
                <figure className="avatar-circle img-holder">
                  <img className="img-cover"  width="56px"  height="56px" loading="lazy" src={user.avatar_url} alt={user.login} />
                </figure>
                <h3 className="card-title">{user.login}</h3>
                <button className="icon-btn">
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="material-symbols-rounded">
                    <FaLink />
                  </a>
                </button>
              </article>
            </div>
          ))
        ) : (
          <div className=" tab-panel" >
          <div className="error-content" style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
            <p className="title-1">
              Oops!
              <GoSmiley style={{ display: "inline" }} />
            </p>
            <p className="text">Doesn't have any following yet.</p>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Following;
