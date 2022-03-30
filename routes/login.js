const express = require("express");
const { password } = require("pg/lib/defaults");
const router = express.Router();


const { user_game, user_game_login_history } = require("../models");
//const { user_game, user_game_biodata, user_game_history, user_game_login_history } = require("../models");


let isLogin = false;
let userId = 0;
let userType = "";

// Middleware
router.use((req, res, next) => {
  if ((req.url === '/history'||req.url === '/user'||req.url === '/loginhistory'||req.url === '/userbiodata') && !isLogin) {
    res.redirect('/login');
  }
  next();
});

// Login
router.get("/login", (req, res) => {
  if (!isLogin) {
    res.render("login", {
        error: '',
      });
  }
});

  
// // Log out
router.get("/logout", (req, res) => {
    isLogin = false;
    res.render("login", {
        error: '',
      });
});

// // Login History
router.get("/loginhistory", async (req, res) => {
    const loginHistory = await user_game_login_history.findAll(
      {
        include:[user_game],
      },
    )        
  .then(loginhistory => {
  res.render('loginhistory', 
      {
          loginhistories: loginhistory,
      });
  });  
}
);


// Login Authentification
router.post("/login/auth", async (req, res) => {
    const userLogin = await user_game.findOne(
        { where: 
            { 
                username: req.body.uUsername, 
                password: req.body.uPassword,
            } 
        }
    ).then(usergame => {
        if (usergame.username != null) {
            isLogin = true;
            userId = usergame.user_id;
            userType = usergame.usertype;
            // res.redirect("/dashboard", {
            //     loginstatus: isLogin,
            //     usertype: userType,
            //     userid: userId,
            // });
            user_game_login_history.create({
              user_id: usergame.user_id,
              login_time: new Date(). toISOString (),
            });
            res.redirect("/history");
          } else {
            res.render("login", {
              error: 'Your password and username was wrong',
            });
          };
        // res.status(200).json(usergame);
    }
    );

});



  

module.exports = router;

