import { React, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header.js";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentuser");
        setUser(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadUser();
  }, []);

  const logOut = async () => {
    try {
      await axios.get("/api/v1/users/logout");
      // window.location = "/signin";
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Header user={user.name} />
      <div className="home-container">
        {user.avatar ? (
          <img src={`Images/${user.avatar}`} alt="" width={100} height={100} />
        ) : null}
        <div className="buttons">
          <button className="btn-1" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
