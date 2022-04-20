const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {user_game} = require("../models");


/* Fungsi untuk authentication */
async function authenticate(username, password, done) {
    try{
        const user = await user_game.authenticate({username, password})
        console.log(user.password);
        return done(null, user);
    }
    catch(err){
        return done(null, false, {message: err.message})
    }
}

passport.use(
    new LocalStrategy(
        {usernameField: "username", passwordField: "password"}, 
        authenticate
    )
);

passport.serializeUser(
    (user, done) => done(null, user.user_id)
);

passport.deserializeUser(
    async (id, done) => done(null, await user_game.findByPk(id))
);

module.exports = passport;