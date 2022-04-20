const { user_game } = require("../models");


module.exports = {

    read: async(_, res) => {
        const users = await user_game.findAll(
            {
                attributes: ["user_id","username"]
            }
        );
        res.render('user', 
            {
                userList: users,
            }
        );  
    },
    
    create: async(_, res) => {
        const users = await user_game.findAll(
            {
                attributes: ['username', 'user_id']
            }
        );
        res.render('user/add-user', {userList: users});
    },
  
    post: async(req, res) => {
        let usertype = "P";
        if(req.body.usertype){
           usertype =  req.body.usertype;
        }
        await user_game.create({
            username: req.body.username,
            password: req.body.password,
            usertype: usertype,
        });
        res.redirect('/user');
    },

    edit: async(req, res) => {
        const userdata = await user_game.findByPk(req.params.id);
        res.render('user/edit-user', {
          useredit: userdata,
        });
    },

    update: async(req, res) => {
        await user_game.update({
            password: req.body.password,
          }, {
            where: {
              user_id: req.body.user_id,
            },
          }
        );
        res.redirect('/user');
    },

    delete: async(req, res) => {
        await user_game.destroy({
            where: {
              user_id: req.params.id,
            }
          })
          res.redirect('/user');
    },
};

