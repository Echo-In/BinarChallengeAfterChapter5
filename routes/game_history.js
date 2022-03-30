const router = require("express").Router();

const { redirect } = require("express/lib/response");
const { user_game_history,user_game } = require("../models");


router.get('/history', async (req, res) => {
  const historyData = await user_game_history.findAll(
        {
          include:[user_game],
        },
    )        
    .then(historiesdata => {
    res.render('gamehistory', 
        {
            histories: historiesdata,
        });
    }  
  );
});


// ADD DATA
router.get('/history/add', async (_, res) => {
    const userList = await user_game.findAll({attributes: ['username', 'user_id']}).then((userlist)=>{
        res.render('gamehistory/add-gamehistory', { userList: userlist});
    })
    
});

router.post('/history/post', async (req, res) => {
    
    const userid = await user_game.findOne(
        {
            where: 
            {
                username: req.body.uUsername}, 
            }
        )
    .then(userId =>{
        user_game_history.create({
            user_id: userId.user_id,
            played_at: new Date().toISOString(),
            score_result: req.body.score,
    });
  });

  res.redirect('/history');
});

// UPDATE DATA
router.get('/history/edit/:id', async (req, res) => {
  const historyData = await user_game_history.findByPk(req.params.id);

  res.render('gamehistory/edit-gamehistory', {
    history: historyData,
  });
});


router.post('/history/update', async (req, res) => {
  await user_game_history.update({
    played_at: req.body.playedAt,
    score_result: req.body.score,
  }, {
    // where: parseInt(req.body.id),
    where: {
      id: +req.body.id,
    },
  });

  res.redirect('/history');
});


router.get('/history/delete/:id', async (req, res) => {
  await user_game_history.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.redirect('/history');
});

module.exports = router;
