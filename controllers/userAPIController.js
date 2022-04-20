const { user_game } = require("../models");


function format(user) {
    const {user_id, username} = user
    return {
        user_id,
        username,
        accessToken: user.generateToken()
    }
}


module.exports = {

    read: async(_, res) => {
        try {
            const listuser = await user_game.findAll({attributes: ["user_id","username"]})
            res.status(201).json({data: listuser});
        }
        catch(err) {
            res.status(400).json({data: err});
        }
    },
    
    login: async(req, res) => {
        try{
            const user = await user_game.authenticate(
                {
                    username: req.body.username,
                    password: req.body.password,
                }
            )
            res.status(200).json(format(user));
        }
        catch(err){
            res.status(400).json({data: err});
        }
    },

    create: async(req, res) => {
        try {
            const newuser = await user_game.create({
                username: req.body.username,
                password: req.body.password,
                usertype: req.body.usertype,
            })
            res.status(201).json({data: newuser, result: "success"});
        }
        catch(err) {
            res.status(400).json({data: err});
        }
    },

    update: async(req, res) => {
        try{
            const updateduser = await user_game.update({
                password: req.body.password,
            }, {
                // where: parseInt(req.body.id),
                where: {
                    user_id: req.body.user_id,
                },
            });
            res.status(201).json({data: updateduser, result: "success updating password"});
        }
        catch(err) {
            res.status(400).json({data: err});
        }
    },

    delete: async(req, res) => {
        try{
            const deleteduser = await user_game.destroy({
                where: {
                    user_id: req.body.user_id,
                }
            });
            res.status(201).json({data: deleteduser, result: "success deleting user"});
        }
        catch(err) {
            res.status(400).json({data: err});
        }
    },
};
