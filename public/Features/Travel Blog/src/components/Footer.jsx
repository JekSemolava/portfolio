import React from "react";

const customStyle = {
  color: "#ccc",
  fontSize: "18px",
  fontFamily: "McLaren, cursive",
};

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p style={customStyle}>Copyright © {currentYear}</p>
    </footer>
  );
}

export default Footer;
