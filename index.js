import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsLoggedIn = false;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(passwordCheck);

function logout() {
  // window.location.href = "/logout";
  window.location.href = "/portfolio/public/login";
}

function login() {
  // window.location.href = "/login";
  //app.use(passwordCheck);
  window.location.href = "/portfolio/public/index";
}

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "user123") {
        userIsLoggedIn = true;
      } else {
        userIsLoggedIn = false;
      }
    next();
  }


app.get("/", (req, res) => {
   if (userIsLoggedIn) {
      res.sendFile(__dirname + "/portfolio/public/index.html");
    }
});


app.post("/portfolio/public/index", (req, res) => {
    if (userIsLoggedIn) {
      res.sendFile(__dirname + "/public/index.html");
    } 
    else {
      res.sendFile(__dirname + "/public/login.html");
    }
  });

app.post("/check", (req, res) => {
    if (userIsLoggedIn) {
      res.sendFile(__dirname + "/index.html");
    } 
    else {
      res.sendFile(__dirname + "/login.html");
    }
  });

app.get("/logout", (req, res) => {
  userIsLoggedIn = false;
  // res.redirect("/");
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/portfolio/public/login", (req, res) => {
  userIsLoggedIn = false;
  // res.redirect("/");
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/portfolio/public/check', (req, res) => {
  const password = req.body.password;
  if (password === 'user123') {
    userIsLoggedIn = true;
    res.json({ success: true });
  } else {
    userIsLoggedIn = false;
    res.json({ success: false });
  }
});

app.get('/portfolio/public/index', (req, res) => {
  if (userIsLoggedIn) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect('/portfolio/public/login'); // Redirect to login if not logged in
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
