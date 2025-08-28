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
  res.sendFile(__dirname + "login.html");
});

app.get("/portfolio/login", (req, res) => {
  userIsLoggedIn = false;
  res.sendFile(__dirname + "login.html");
});

app.post("/check", (req, res) => {
  console.log("ACCESS_ID from env:", process.env.ACCESS_ID);
  const password = req.body.password;
  if (password === process.env.ACCESS_ID) {
    res.sendFile(__dirname + "/public/index.html");
  } else {
    res.sendFile(__dirname + "/login.html?error=1");
  }
});

  burger.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    burger.style.display = "none";
    header.style.display = "none";
  });

  // Close sidebar → restore burger + header + hide overlay
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    burger.style.display = "block";
    header.style.display = "block";
  });

  // Close if clicking overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    burger.style.display = "block";
    header.style.display = "block";
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
