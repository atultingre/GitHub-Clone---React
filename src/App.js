import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./components/Header/Header.css";
import Profile from "./components/Sidebar/Profile";
import Navbar from "./components/Navbar/Navbar";
import Repository from "./components/Repository/Repository";
import Following from "./components/Following/Following";
import Header from "./components/Header/Header";

const App = () => {

  // // HEADER
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleApiCall = async () => {
    if (username !== "") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        // console.log(response.data)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        setIsLoading(false);
      }
    } else {
      setUserData(null);
    }
  };


  const handleSearch = () => {
    handleApiCall();
  };

  return (
    <div>
      <Header username={username} setUsername={setUsername} handleSearch={handleSearch} />
      <main className="main" id="main">
        <div className="container">
          <Profile userData={userData} isLoading={isLoading}/>
            <section className="tab-container">
              <Navbar />
              <div className="tab-panel">
                <Routes>
                  <Route exact path="/repos"  element={  <Repository username={username} /> }></Route>
                  <Route  exact path="/following" element={<Following username={username} />}></Route>
                </Routes>
              </div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default App;

