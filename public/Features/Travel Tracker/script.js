import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";

const { Client } = pkg;

const app = express();
const port = process.env.PORT || 3000;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
//db.connect();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
db.connect().catch(err => console.error("DB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  return result.rows.map((row) => row.country_code);
}

app.get("/data", async (req, res) => {
    try {
      const countries = await checkVisited();
      res.json({ countries: countries, total: countries.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching countries." });
    }
  });

app.post("/modify", async (req, res) => {
  const input = req.body.country;
  const action = req.body.action;

  if (!input && action !== "reset") {
    return res.status(400).json({ error: "Country input is required." });
  }

  try {
    if (action === "reset") {
      await db.query("DELETE FROM visited_countries");
      return res.json({ message: "Visited countries list reset successfully." });
    }

    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    if (!data) {
      return res.status(404).json({ error: "Country not found." });
    }

    const countryCode = data.country_code;

    if (action === "add") {
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode]
        );
        return res.json({ message: "Country added successfully." });
      } catch (err) {
        console.error(err);
        return res.status(409).json({ error: "Country already added." });
      }
    } else if (action === "delete") {
      const deleteResult = await db.query(
        "DELETE FROM visited_countries WHERE country_code = $1",
        [countryCode]
      );
      if (deleteResult.rowCount === 0) {
        return res.status(404).json({ error: "Country not found in visited list." });
      }
      return res.json({ message: "Country deleted successfully." });
    } else {
      return res.status(400).json({ error: "Invalid action." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error processing request." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
