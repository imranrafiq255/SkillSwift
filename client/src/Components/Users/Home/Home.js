import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header.js";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loader/Loading.js";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/users/currentuser");
        setUser(response.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logOut = async () => {
    try {
      setLoading(true);
      await axios.get("/api/v1/users/logout");
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header user={user.name} />
      <div className="home-container">
        {loading ? (
          <Loading />
        ) : user.avatar ? (
          <img src={`Images/${user.avatar}`} alt="" width={100} height={100} />
        ) : null}
        <div className="buttons">
          {loading ? (
            <Loading />
          ) : (
            <button className="btn-1" onClick={logOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
