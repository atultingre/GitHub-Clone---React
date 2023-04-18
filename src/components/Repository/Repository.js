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
        const data = await (response.json());
        setRepositories(data);
        setIsLoading(false);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching repositories: ", error);
        setIsLoading(false);
      }
    };
    setTimeout(()=>{
      fetchRepositories()
    },1000)
  }, [username]);

  if (isLoading) {
    const skeletons = Array.from({ length: 6 }).map((_, index) => (
      <div className="card repo-skeleton" key={index}>
        <div className="card-body">
          <div className="skeleton title-skeleton"></div>
          <div className="skeleton text-skeleton text-1"></div>
          <div className="skeleton text-skeleton text-2"></div>
        </div>
      </div>
    ));
    return skeletons;
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
      <div className="tab-panel">
        {isLoading ? (
          <div className="card repo-skeleton">
            <div className="card-body">
              <div className="skeleton title-skeleton"></div>
              <div className="skeleton text-skeleton text-1"></div>
              <div className="skeleton text-skeleton text-2"></div>
            </div>
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
                <span className="material-symbols-rounded">
                  <BiCodeBlock />
                </span>
                <span className="span">{repo.language ? repo.language : ""}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded">
                  <BsFillStarFill />
                </span>
                <span className="span">{numberToKilo(repo.stargazers_count)}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded">
                  <BiGitRepoForked />
                </span>
                <span className="span">{numberToKilo(repo.forks)}</span>
              </div>
            </div>
          </article>
        ))
        ) : (
          <div className="tab-panel">
            <div className="error-content">
              <p className="title-1">
              Oops!
              <GoSmiley style={{ display: "inline" }} />
            </p>
              <p className="text">Doesn't have any public repositories yet.</p>
            </div>
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

  // <div className="error-content">
  //   <p className="title-1">Oops! :(</p>
  //   <p className="text">Doesn't have any public repositories yet.</p>
  //  </div>
