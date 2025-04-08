import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


var userIsLoggedIn = false;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passwordCheck);

document.addEventListener('DOMContentLoaded', function() {
  let backToTopButton = document.getElementById('backToTop');
  const texts = [
    'Hi! Nice to Meet You . . .',
    'I am an aspiring and self-taught Frontend Developer . . .|'
];
let line = 0;
let wordIndex = 0;
let isDeleting = false;
let currentText = '';

function typeText() {
    const currentLine = texts[line];
    const words = currentLine.split(' ');
    if (isDeleting) {
        currentText = words.slice(0, wordIndex).join(' ');
        if (wordIndex > 0) {
            setTimeout(wordIndex--, 2500);
        } else {
            isDeleting = false;
        }
    } else {
        currentText = words.slice(0, wordIndex + 1).join(' ');
        if (wordIndex === words.length - 1) {
            isDeleting = true;
        } else {
            setTimeout(wordIndex++, 4000);
        }
    }

    document.getElementById('textAnimation').textContent = currentText;

    if (isDeleting && wordIndex === 0) {
        isDeleting = false;
        line = (line + 1) % texts.length;
        wordIndex = 0;
        setTimeout(typeText, 4000);
        return;
    }

    const speed = isDeleting ? 75 : 200;
    setTimeout(typeText, speed);
}
typeText();

  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});


function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "user123") {
        userIsLoggedIn = true;
      } else {
        userIsLoggedIn = false;
      }
    next();
  }


app.get("/logout", (req, res) => {
  if (userIsLoggedIn) {
    res.render("index.ejs");
   } else {
    res.render("login.ejs");
 }
});

app.get("/login", (req, res) => {
  if (userIsLoggedIn) {
    res.render("login.ejs");
   } else {
    res.render("index.ejs");
 }
});


app.post("/check", (req, res) => {
    if (userIsLoggedIn) {
      res.render("index.ejs");
    } else {
      res.render("login.ejs");
    }
  });

app.get("/", (req, res) => {
  userIsLoggedIn = false;
  res.render("login.ejs");
});


app.get("/home", (req, res) => {
  userIsLoggedIn = true;
  res.render("index.ejs");
});

app.get("/blog", (req, res) => {
  userIsLoggedIn = true;
  res.render("blog.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
