import bodyParser from "body-parser";
/*import express from "express";*/
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/*const app = express();*/
const port = 3000;


var userIsLoggedIn = false;
/*app.use(express.static("public"));*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passwordCheck);


function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "user123") {
        userIsLoggedIn = true;
      } else {
        userIsLoggedIn = false;
      }
    next();
  }

//==============[ EJS ]===================//
// app.get("/", (req, res) => {
//   userIsLoggedIn = false;
//   res.render("login.ejs");
// });

// app.get("/logout", (req, res) => {
//   if (userIsLoggedIn) {
//     res.render("index.ejs");
//    } else {
//     res.render("login.ejs");
//  }
// });

// app.get("/login", (req, res) => {
//   if (userIsLoggedIn) {
//     res.render("login.ejs");
//    } else {
//     res.render("index.ejs");
//  }
// });

// app.post("/check", (req, res) => {
//     if (userIsLoggedIn) {
//       res.render("index.ejs");
//     } else {
//       res.render("login.ejs");
//     }
//   });

// app.get("/home", (req, res) => {
//   userIsLoggedIn = true;
//   res.render("index.ejs");
// });

// app.get("/blog", (req, res) => {
//   userIsLoggedIn = true;
//   res.render("blog.ejs");
// });

//==============[ NON-EJS ]===================//
app.get("/", (req, res) => {
  userIsLoggedIn = false;
  res.render("login.html");
});

app.get("/login", (req, res) => {
  userIsLoggedIn = false;
  res.render("login.html");
});

app.post("/check", (req, res) => {
  if (userIsLoggedIn) {
    res.render("index.html");
  } else {
    res.render("login.html");
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
