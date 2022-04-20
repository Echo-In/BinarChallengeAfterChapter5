const apiPassport = require("../lib/apiPassport");

module.exports = apiPassport.authenticate("jwt", {session: false});