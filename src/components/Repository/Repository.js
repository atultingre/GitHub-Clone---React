import React, { useEffect, useState } from "react";
import { BiCodeBlock, BiGitRepoForked } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import {numberToKilo} from "../Functions.js"



const Repository = ({ username }) => {

  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        setRepositories(data);
        setIsLoading(false);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching repositories: ", error);
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

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
        {/* <h2 className="sr-only">Repositories</h2> */}
        {isLoading ? (
          <div className="card follower-skeleton">
            <div className="skeleton avatar-skeleton"></div>
            <div className="skeleton title-skeleton"></div>
          </div>
        ) : repositories.length > 0 ? (
        repositories.map((repo) => (
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
    </div>
  );
};

export default Repository;

// isLoading ? (
  // <div className="card repo-skeleton">
  //   <div className="card-body">
  //     <div className="skeleton title-skeleton"></div>
  //     <div className="skeleton text-skeleton text-1"></div>
  //     <div className="skeleton text-skeleton text-2"></div>
  //   </div>
  // </div>
// ) : (

//   <div className="error-content">
//   <p className="title-1">Oops! :(</p>
//   <p className="text">Doesn't have any public repositories yet.</p>
// </div>
