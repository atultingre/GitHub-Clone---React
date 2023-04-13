import React from "react";
import { BiCodeBlock, BiGitRepoForked } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";

const Forks = ({ repositories, isLoading }) => {
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
      <div>
        <div className="error-content">
          <p className="title-1">
            Oops!
            <GoSmiley style={{ display: "inline" }} />
          </p>
          <p className="text">Doesn't have any froks yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="tab-panel"
        role="tabpanel"
        id="panel-2"
        aria-labelledby="tab-2"
        tabIndex="0"
        data-tab-panel
        data-forked-panel
        hidden>
        <h2 className="sr-only">Forked repositories</h2>
        {repositories.map((frok) => (
          <article className="card repo-card" key={frok.id}>
            <div className="card-body">
              <a
                href={frok.forks_url}
                target="_blank"
                rel="noreferrer"
                className="card-title">
                <h3 className="title-3">{frok.full_name}</h3>
              </a>
              <p className="card-text">{frok.description}</p>
              <span className="badge">{frok.visibility}</span>
            </div>
            <div className="card-footer">
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiCodeBlock />
                </span>
                <span className="span">{frok.language}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsFillStarFill />
                </span>
                <span className="span">{frok.stargazers_count}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BiGitRepoForked />
                </span>
                <span className="span">{frok.forks_count}</span>
              </div>
            </div>
          </article>
        ))}

        <div className="error-content">
          <p className="title-1">Oops! :(</p>
          <p className="text">Doesn't have any forked repositories yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Forks;
