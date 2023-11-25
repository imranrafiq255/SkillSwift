import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpEmail from "./Components/Users/SignUp/SignUpEmail.js";
import SignUpContact from "./Components/Users/SignUp/SignUpContact.js";
import SignUpSubmit from "./Components/Users/SignUp/SignUpSubmit.js";
import SignIn from "./Components/Users/SignIn/SignIn.js";
import Home from "./Components/Users/Home/Home.js";
import axios from "axios";
const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        await axios.get("/api/v1/users/currentuser");
        setisAuthenticated(true);
      } catch (error) {
        console.log(error.message);
        setisAuthenticated(false);
      }
    };
    loadUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/email" element={<SignUpEmail />} />
        <Route path="/contact" element={<SignUpContact />} />
        <Route path="/submit" element={<SignUpSubmit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
