const passport = require("passport");
const { user_game, user_game_login_history } = require("../models");


module.exports = {

    // Read all login History
    read: async(_, res) => {
        const loginHistory = await user_game_login_history.findAll(
            {
              include:[user_game],
            },
        );       
        res.render('loginhistory', 
            {
                loginhistories: loginHistory,
            }
        );  
    },
      
    signup: async(req, res, next) => {
        user_game.register({
            username: req.body.username,
            password: req.body.password,
            usertype: "P",
        })
        .then(()=> {
            res.redirect('/game/history');
        })
        .catch(err=> next(err))
        
    },

    login: 
         passport.authenticate("local", {
            successRedirect: "/game/history",
            failureRedirect: "/",
            failureFlash: true,
            }
    ),

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
}

