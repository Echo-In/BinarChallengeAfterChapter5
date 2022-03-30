const express = require("express");
const router = express.Router();

const { user_game } = require("../models");


// Get List User
router.get("/user", async (_, res) => {
  const listuser = await user_game.findAll({attributes: ["user_id","username"]})
  .then(listusers => {
    res.render('user', 
        {
            userList: listusers,
        }
      );
    }  
  );
});


// Render New User Page
router.get("/user/add", async (req, res) => {
  const userList = await user_game.findAll({attributes: ['username', 'user_id']}).then((userlist)=>{
    res.render('user/add-user', { userList: userlist});
})

  // res.status(201).json(newUser);
});


// Create New User
router.post("/user/post", async (req, res) => {
  await user_game.create({
      username: req.body.username,
      password: req.body.password,
      usertype: req.body.usertype,
  })
  res.redirect('/user');
});


// Update Password
router.get('/user/edit/:id', async (req, res) => {
  const userdata = await user_game.findByPk(req.params.id);

  res.render('user/edit-user', {
    useredit: userdata,
  });
});

router.post('/user/update', async (req, res) => {
  await user_game.update({
    password: req.body.password,
  }, {
    // where: parseInt(req.body.id),
    where: {
      user_id: +req.body.user_id,
    },
  });

  res.redirect('/user');
});

// Delete Existing User
router.get("/user/delete/:id", async (req, res) => {
  await user_game.destroy({
    where: {
      user_id: req.params.id,
    }
  })
  res.redirect('/user');
});

module.exports = router;
