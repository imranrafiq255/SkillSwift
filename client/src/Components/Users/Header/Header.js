import React from "react";
import "../Header/Header.css";
const Header = (props) => {
  return (
    <>
      <div className="header">
        <h1>Welcome {props.user} &#x1F607;</h1>
      </div>
    </>
  );
};

export default Header;
