import { IoMdOpen } from "react-icons/io";
import { ImEarth, ImLocation2 } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import Footer from "../Footer/Footer";
import { numberToKilo } from "../Functions";

const Profile = ({ userData, isLoading}) => {
  // const [, setIsLoading] = useState(true);

  

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            <section className="profile">
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
              <span className="material-symbols-rounded">
                <IoMdOpen />
              </span>
              <span className="open">See on Github</span>
            </a>
            <ul className="profile-meta">
              <li className="meta-item">
                <span className="material-symbols-rounded">
                  <ImLocation2 />
                </span>
                <span className="meta-text">
                  {userData.location ? userData.location : ""}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded">
                  <MdApartment />
                </span>
                <span className="meta-text">
                  {userData.company ? userData.company : ""}
                </span>
              </li>
              <li className="meta-item">
                <span className="material-symbols-rounded">
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
                <span className="material-symbols-rounded">
                  <BsTwitter />
                </span>
                <a
                  href={`https://twitter.com/${userData.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-text">
                  {userData.twitter_username ? userData.twitter_username : ""}
                </a>
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
            <Footer  />
          </div>
        ) : (
          <section className="error">
            <p className="title-1">Oops! :(</p>
            <p className="text">There is no account with this username yet.</p>
          </section>
        )}
      </div>
    </>
  );
};

export default Profile;