const router = require("express").Router();

const { redirect, render } = require("express/lib/response");
const { user_game_biodata,user_game, sequelize } = require("../models");
const { Op } = require('sequelize');

router.get('/profile', async (req, res) => {
  const userProfile = await user_game_biodata.findAll(
        {
          include:[user_game],
        },
    )        
    .then(userprofile => {
    res.render('userbiodata', 
        {
            userprofiledt: userprofile,
        });
    }  
  );
});


// ADD DATA
router.get('/profile/add', async (_, res) => {
    const listuser = await user_game.findAll(
    {
        include: [
        {
          model: user_game_biodata,
          // as: "user_game_biodata", 
          required: false, // do not generate INNER JOIN
          attributes: [] 
          
        }],
        attributes: ["user_id","username"],
        where: sequelize.where(
          sequelize.col("user_game_biodatum.user_id"),
          "IS",null
        ) 
        }
    ).then((userlist)=>{
        res.render('userbiodata/add-userbiodata', { userList: userlist, error: ""});
    })
});

router.post('/profile/post', async (req, res) => {
    if(req.body.uUsername != null){
        const userid = await user_game.findOne(
            {
                where: 
                {
                    username: req.body.uUsername}, 
                }
            )
        .then(userId =>{
            user_game_biodata.create({
                user_id: userId.user_id,
                firstname: req.body.firstName,
                middlename: req.body.middleName,
                lastname: req.body.lastName,
                dob: req.body.dob,
                birthplace: req.body.birthPlace,
                email: req.body.email,
        });
      });
      res.redirect('/profile');
    }
    else {
        res.render('userbiodata/add-userbiodata',{ userList: [] ,error: "All existing user already have biodata!"})
    }

  
});

// UPDATE DATA
router.get('/profile/edit/:id', async (req, res) => {
  const userprofile = await user_game_biodata.findByPk(req.params.id);

  res.render('userbiodata/edit-userbiodata', {
    userprofiledt: userprofile,
  });
});


router.post('/profile/update', async (req, res) => {
  await user_game_biodata.update({
    firtname: req.body.firstName,
    middlename: req.body.middleName,
    lastname: req.body.lastName,
    dob: req.body.dob,
    birthplace: req.body.birthPlace,
    email: req.body.email,
  }, {
    // where: parseInt(req.body.id),
    where: {
      id: +req.body.id,
    },
  });

  res.redirect('/profile');
});


router.get('/profile/delete/:id', async (req, res) => {
  await user_game_biodata.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.redirect('/profile');
});

module.exports = router;
