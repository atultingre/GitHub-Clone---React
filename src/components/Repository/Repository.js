import React from "react";
import { BiCodeBlock, BiGitRepoForked } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
const Repository = ({ isLoading, repositories }) => {
  if (isLoading) {
    return (
      <div className="card repo-skeleton">
        <div className="card-body">
          <div className="skeleton title-skeleton"></div>
          <div className="skeleton text-skeleton text-1"></div>
          <div className="skeleton text-skeleton text-2"></div>
        </div>
      </div>
    );
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
      <div
        className="tab-panel"
        role="tabpanel"
        id="panel-1"
        aria-labelledby="tab-1"
        tabIndex="0"
        data-tab-panel
        data-repo-panel>
        <h2 className="sr-only">Repositories</h2>
        {repositories.map((repo) => (
          <article className="card repo-card" key={repo.id}>
            <div className="card-body">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="card-title">
                <h3 className="title-3">{repo.name}</h3>
              </a>
              <p className="card-text">{repo.description}</p>
              <span className="badge">{repo.visibility}</span>
            </div>
            <div className="card-footer">
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiCodeBlock />
                </span>
                <span className="span">{repo.language}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsFillStarFill />
                </span>
                <span className="span">{repo.stargazers_count}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiGitRepoForked />
                </span>
                <span className="span">{repo.forks}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Repository;

// isLoading ? (
//   <div className="card repo-skeleton">
//     <div className="card-body">
//       <div className="skeleton title-skeleton"></div>
//       <div className="skeleton text-skeleton text-1"></div>
//       <div className="skeleton text-skeleton text-2"></div>
//     </div>
//   </div>
// ) : (

//   <div className="error-content">
//   <p className="title-1">Oops! :(</p>
//   <p className="text">Doesn't have any public repositories yet.</p>
// </div>
