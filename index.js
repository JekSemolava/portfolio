import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
dotenv.config();


var userIsLoggedIn = false;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passwordCheck);


function passwordCheck(req, res, next) {
  const password = req.body["password"];
  req.userIsLoggedIn = password === process.env.ACCESS_ID;
  next();
}

app.get("/", (req, res) => {
  userIsLoggedIn = false;
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/login", (req, res) => {
  userIsLoggedIn = false;
  res.render("login.html");
});

app.get("/portfolio/login", (req, res) => {
  userIsLoggedIn = false;
  res.render("login.html");
});

app.get("/Online Portfolio/index.html", (req, res) => {
  userIsLoggedIn = false;
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/check", (req, res) => {
  const password = req.body.password;
  if (password === process.env.ACCESS_ID) {
    res.redirect("/Online Portfolio/index.html");
  } else {
    res.redirect("/login.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
