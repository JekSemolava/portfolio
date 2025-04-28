import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// put alert for typo error country name

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresdb",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT & DELETE visited country with RESET OPTION
app.post("/modify", async (req, res) => {
  const input = req.body["country"];
  const action = req.body["action"];

  try {
    if (action === "reset") {
      await db.query("DELETE FROM visited_countries");
      return res.redirect("/");
    }

    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    if (!data) throw new Error("Country not found");

    const countryCode = data.country_code;

    if (action === "add") {
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode]
        );
        return res.redirect("/");
      } catch (err) {
        console.log(err);
        const countries = await checkVisisted();
        return res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again.",
        });
      }
    } else if (action === "delete") {
      try {
        const deleteResult = await db.query(
          "DELETE FROM visited_countries WHERE country_code = $1",
          [countryCode]
        );
        if (deleteResult.rowCount === 0) throw new Error("Country not found in visited list");

        return res.redirect("/");
      } catch (err) {
        console.log(err);
        const countries = await checkVisisted();
        return res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country is not in your visited list, try again.",
        });
      }
    } else {
      throw new Error("Invalid action");
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
