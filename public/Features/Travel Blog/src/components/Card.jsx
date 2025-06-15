import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <div>
          <h2 className="name">{props.name}</h2>
          <img className="circle-img" src={props.img} alt="avatar_image" />
          <p> +1 </p>
        </div>
      </div>

      <div className="bottom">
        <p className="info">{props.tags}</p>
        <p className="info">{props.description}</p>
      </div>
    </div>
  );
}

export default Card;
