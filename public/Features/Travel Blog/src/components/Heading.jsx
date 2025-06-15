import React from "react";
import ReactDOM from "react-dom";
import "../../public/styles.css";

const currentHour = new Date().getHours();
let title = "TRAVEL GALLERY";

function Heading() {
  return (
    <div className="header">
      <h1 className="headerTitle">{title}</h1>
    </div>
  );
}

export default Heading;
