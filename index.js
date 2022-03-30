const express = require("express");
const app = express();
const port = 3000;
// const router = require("./router");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const usergame = require("./routes/user");
const gamehistory = require("./routes/game_history");
const logingame = require("./routes/login");
const userbiodata = require("./routes/user_biodata");
const usergame = require("./routes/user");

app.use(logingame);
app.use(gamehistory);
app.use(userbiodata);
app.use(usergame);

//const { user_game, user_game_biodata, user_game_history, user_game_login_history, sequelize } = require("./models");
//const { Op } = require('sequelize');
const { render } = require("express/lib/response");
// app.get("/", async (req, res) => {
//   // const data = await user_game_history.findAll({
//   //   include: [user_game,],
//   //   // attributes: ['user_name','played_at','result_score'],
//   // });
//   // res.json(data);
//   //res.render("login")
//   //const userList = await user_game.findAll({attributes: ['username', 'user_id']})
//   // const data = await user_game.findAll(
//   //   {
//   //       include: [
//   //       {
//   //         model: user_game_biodata,
//   //         // as: "user_game_biodata", 
//   //         required: false, // do not generate INNER JOIN
//   //         attributes: [] 
          
//   //       }],
//   //       attributes: ["user_id","username"],
//   //       where: sequelize.where(
//   //         sequelize.col("user_game_biodatum.user_id"),
//   //         "IS",null
//   //       ) 
//   //       }
//   //   )
//   const data = await user_game_login_history.findAll(
//     {
//       include:[
//         {
//           model: user_game,
//           attributes: ["username"],
//           required: false,
//         }],
//     },
//   )    
//     res.json(data)
// });
app.get("/", async (_, res) => {
  res.redirect("/login")
});

app.listen(port);
