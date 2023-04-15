import React from "react";
import { IoMdOpen } from "react-icons/io";
import { ImEarth, ImLocation2 } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import Footer from "../Footer/Footer";

const Profile = ({ userData, isLoading }) => {
  const numberToKilo = function (number) {
    const /**{String}*/ numStr = String(number);

    if (numStr.length <= 3) {
      return numStr;
    } else if (numStr.length >= 4 && numStr.length <= 5) {
      return `${numStr.slice(0, -3)}.${numStr.slice(-3, -2)}k`;
    } else if (numStr.length === 6) {
      return `${numStr.slice(0, -3)}k`;
    } else {
      return `${numStr.slice(0, -6)}M`;
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            <section className="profile" data-profile-card>
              <div className="profile-skeleton">
                <div className="skeleton avatar-skeleton"></div>
                <div className="skeleton title-skeleton"></div>
                <div className="skeleton text-skeleton text-1"></div>
                <div className="skeleton text-skeleton text-2"></div>
                <div className="skeleton text-skeleton text-3"></div>
              </div>
            </section>
          </div>
        ) : userData ? (
          <div className="profile">
            <figure
              className="avatar-circle  img-holder"
              style={{ width: "200px", height: "200px" }}>
              <img
                src={userData.avatar_url}
                alt={userData.name}
                className="img-cover"
                width="200px"
                height="200px"
              />
            </figure>
            <h1 className="title-2">{userData.name}</h1>
            <p className="username text-primary">{userData.login}</p>
            <p className="bio">{userData.bio}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary">
              <span className="material-symbols-rounded" aria-hidden="true">
                <IoMdOpen />
              </span>
              <span className="open">See on Github</span>
            </a>
            <ul className="profile-meta">
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <ImLocation2 />
                </span>
                <span className="meta-text">
                  {userData.location ? userData.location : ""}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <MdApartment />
                </span>
                <span className="meta-text">
                  {userData.company ? userData.company : ""}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <ImEarth />
                </span>
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-text">
                  {userData.blog ? userData.blog : ""}
                </a>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  <BsTwitter />
                </span>
                <span className="meta-text">
                  {userData.twitter ? userData.twitter : ""}
                </span>
              </li>
            </ul>
            <ul className="profile-stats">
              <li className="stats-item">
                <span className="body">{userData.public_repos}</span>
                Repos
              </li>
              <li className="stats-item">
                <span className="body">{numberToKilo(userData.followers)}</span>
                Followers
              </li>
              <li className="stats-item">
                <span className="body">{numberToKilo(userData.following)}</span>
                Following
              </li>
            </ul>
        <Footer />
          </div>
        ) : (
          <section className="error" data-error>
            <p className="title-1">Oops! :(</p>
            <p className="text">There is no account with this username yet.</p>
          </section>
        )}
      </div>
    </>
  );
};

export default Profile;
