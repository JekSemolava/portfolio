import express from "express";
/*import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));*/

const app = express();
/*const port = 3000;*/

/*app.use(bodyParser.urlencoded({extended:true}));*/
var userIsLoggedIn = false;
app.use(express.static("public"));
app.use(express.json());
app.use(passwordCheck);

function logout() {
  window.location.href = "/portfolio/public/login";
}

function login() {
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

app.get("/logout", (req, res) => {
  userIsLoggedIn = false;
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/portfolio/public/login", (req, res) => {
  userIsLoggedIn = false;
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/portfolio/public/check', (req, res) => {
  const password = req.body.password;
  if (password === 'user123') {
    userIsLoggedIn = true;
    res.json({ success: true });
    res.sendFile(__dirname + "/index.html");
  } else {
    userIsLoggedIn = false;
    res.json({ success: false });
    res.sendFile(__dirname + "/login.html");
  }
});

app.get('/portfolio/public/index', (req, res) => {
  if (userIsLoggedIn) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect('/portfolio/public/login');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
