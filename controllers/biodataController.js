
const { user_game_biodata,user_game, sequelize} = require("../models");
// const { Op } = require('sequelize');

module.exports = {

    read: async(_, res) => {
      const userProfile = await user_game_biodata.findAll(
        {
          include:[user_game],
        },
      );      
      res.render('userbiodata', 
        {
          userprofiledt: userProfile,
        }
      );  
    },
    
    create: async(_, res) => {
      const listuser = await user_game.findAll(
        {
            include: [
            {
              model: user_game_biodata,
              required: false, // do not generate INNER JOIN
              attributes: ["firstname","middlename","lastname","dob","birthplace","email"],
            }],
            attributes: ["user_id","username"],
            where: sequelize.where(
              sequelize.col("user_game_biodatum.user_id"),
              "IS",null
            ) 
        }
      );
      res.render('userbiodata/add-userbiodata', { userList: listuser, error: ""});
    },

    post: async(req, res) => {
      if(req.body.username != null){
        const userid = await user_game.findOne(
            {
              where: 
              {
                  username: req.body.username
              }, 
            }
        )
        await user_game_biodata.create({
            user_id: userid.user_id,
            firstname: req.body.firstName,
            middlename: req.body.middleName,
            lastname: req.body.lastName,
            dob: req.body.dob,
            birthplace: req.body.birthPlace,
            email: req.body.email,
        });
        res.redirect('/profile');
      }
      else {
        res.render('userbiodata/add-userbiodata',{ userList: [] ,error: "All existing user already have biodata!"})
      }

    },

    edit: async(req, res) => {
      const userprofile = await user_game_biodata.findByPk(req.params.id);
      res.render('userbiodata/edit-userbiodata', {
        userprofiledt: userprofile,
      });
    },

    update: async(req, res) => {
      await user_game_biodata.update({
        firtname: req.body.firstName,
        middlename: req.body.middleName,
        lastname: req.body.lastName,
        dob: req.body.dob,
        birthplace: req.body.birthPlace,
        email: req.body.email,
      }, {
        where: {
          id: req.body.id,
        },
      });
      res.redirect('/profile');
    },

    delete: async(req, res) => {
      await user_game_biodata.destroy({
        where: {
          id: req.params.id,
        }
      })
      res.redirect('/profile');
    },
};

