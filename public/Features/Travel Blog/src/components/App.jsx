import React from "react";
import Heading from "./Heading";
import Card from "./Card";
import Footer from "./Footer";
import travels from "../travels";
import Avatar from "./Avatar";

function App() {
  return (
    <div>
      <Heading />
      <Avatar />

      <div className="section">
        <h1 className="category">Siquijor</h1>
        <h2 className="subcategory"> {travels[0].subcategory[0][1]}</h2>
        <div className="container">
          <Card
            name={travels[1].name}
            img={travels[1].img}
            tags={travels[1].tags}
            description={travels[1].description}
          />
          <Card
            name={travels[2].name}
            img={travels[2].img}
            tags={travels[2].tags}
            description={travels[2].description}
          />
          <Card
            name={travels[3].name}
            img={travels[3].img}
            tags={travels[3].tags}
            description={travels[3].description}
          />
          <Card
            name={travels[4].name}
            img={travels[4].img}
            tags={travels[4].tags}
            description={travels[4].description}
          />
          <Card
            name={travels[5].name}
            img={travels[5].img}
            tags={travels[5].tags}
            description={travels[5].description}
          />
          <Card
            name={travels[6].name}
            img={travels[6].img}
            tags={travels[6].tags}
            description={travels[6].description}
          />
          <Card
            name={travels[7].name}
            img={travels[7].img}
            tags={travels[7].tags}
            description={travels[7].description}
          />
        </div>
        <hr />
      </div>

      <div className="section">
        <h1 className="category">Oslob, Cebu</h1>
        <h2 className="subcategory">
          <h2 className="subcategory"> {travels[0].subcategory[0][2]}</h2>
        </h2>
        <div className="container">
          <Card
            name="Serene Oasis"
            img={travels[8].img}
            tags={travels[8].tags}
            description={travels[8].description}
          />
          <Card
            name={travels[9].name}
            img={travels[9].img}
            tags={travels[9].tags}
            description={travels[9].description}
          />
          <Card
            name={travels[10].name}
            img={travels[10].img}
            tags={travels[10].tags}
            description={travels[10].description}
          />
          <Card
            name={travels[11].name}
            img={travels[11].img}
            tags={travels[11].tags}
            description={travels[11].description}
          />
          <Card
            name={travels[12].name}
            img={travels[12].img}
            tags={travels[12].tags}
            description={travels[12].description}
          />
          <Card
            name={travels[13].name}
            img={travels[13].img}
            tags={travels[13].tags}
            description={travels[13].description}
          />
          <Card
            name={travels[14].name}
            img={travels[14].img}
            tags={travels[14].tags}
            description={travels[14].description}
          />
        </div>
        <hr />
      </div>

      <div className="section">
        <h1 className="category">Bantayan, Cebu</h1>
        <h2 className="subcategory">
          <h2 className="subcategory"> {travels[0].subcategory[0][3]}</h2>
        </h2>
        <div className="container">
          <Card
            name={travels[15].name}
            img={travels[15].img}
            tags={travels[15].tags}
            description={travels[15].description}
          />
          <Card
            name={travels[16].name}
            img={travels[16].img}
            tags={travels[16].tags}
            description={travels[16].description}
          />
          <Card
            name={travels[17].name}
            img={travels[17].img}
            tags={travels[17].tags}
            description={travels[17].description}
          />
        </div>
        <hr />
      </div>

      <Footer />
    </div>
  );
}

export default App;
