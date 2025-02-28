// https://ejs.co/
// https://ejs.co/#docs

// https://github.com/expressjs/express/blob/master/examples/ejs/index.js

//express static files: https://expressjs.com/en/starter/static-files.html
//section 34

//DEPENDENCIES:
//------------
// npm i express
// npm init -y
// npm i nodemon
// npm i ejs

//HOW TO START: npm run start

//requirements:
const express = require("express"); //express
const path = require("path");
const data = require("./data.json"); //data used within the project

//variables:
const app = express();

//==========Middleware:
app.use(express.static(path.join(__dirname, "public"))); //import public folder to ALL directories/endpoints

//-------------
app.set("view engine", "ejs"); //Allow express to use EJS.
app.set("views", path.join(__dirname, "/views")); //taking current directory and joining it with 'views'
//-------------
//---Endpoints:
app.get("/", (req, res) => {
  res.render("home.ejs"); // .ejs is optional.
});

app.get("/random", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { rand: num }); //pass data into the enpoint
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats", { cats }); //render (file, data) anything wtihin the views folder
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data2 = data[subreddit]; //attempt to find corresponding data from request params
  if (data2) {
    res.render("subreddit", { ...data2 }); //pass data into the enpoint
  } else {
    res.render("error");
  }
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
