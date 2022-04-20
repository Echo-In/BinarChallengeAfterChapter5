const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const port = 3030;
// const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(
    {
      secret: "XQc2356Op",
      resave: false,
      saveUninitialized: false,

    }
  )
);

const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

const apiPassport = require("./lib/apiPassport")
app.use(apiPassport.initialize());


app.use(flash());
app.set("view engine", "ejs");


const gamehistory = require("./routes/game_history");
const logingame = require("./routes/login");
const userbiodata = require("./routes/user_biodata");
const usergame = require("./routes/user");
const userAPI = require("./routes/userAPI")


app.use(logingame);
app.use(gamehistory);
app.use(userbiodata);
app.use(usergame);
app.use(userAPI);



app.listen(port);
