import React from "react";
import ReactDOM from "react-dom";

import authorImg from "../assets/author-img.JPG";
import mainLogoImg from "../assets/main_logo.png";

function Avatar() {
  return (
    <div className="avatar">
      <img
        className="circle-img"
        src={authorImg}
        alt="avatar_image"
        title="Jason Semolava"
      />
      <img
        className="main-logo"
        src={mainLogoImg}
        alt="main_logo_img"
        title="main logo"
      />
    </div>
  );
}
export default Avatar;
