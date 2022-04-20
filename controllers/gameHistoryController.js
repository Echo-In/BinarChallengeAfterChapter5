const { user_game_history,user_game } = require("../models");


module.exports = {

    read: async(_, res) => {
        const gamehistory = await user_game_history.findAll(
            {
              include:[user_game],
            },
        );
        res.render('gamehistory', 
        {
            histories: gamehistory,
        });
    },
    
    create: async(_, res) => {
        const users = await user_game.findAll({attributes: ['username', 'user_id']});
        res.render('gamehistory/add-gamehistory', { userList: users});
    },
  
    post: async(req, res) => {
        const userid = await user_game.findOne(
            {
                where: 
                {
                    username: req.body.username}, 
                }
        );
        await user_game_history.create(
            {
                user_id: userid.user_id,
                played_at: new Date().toISOString(),
                score_result: req.body.score,
            }
        );
        res.redirect('/history');
    },

    edit: async(req, res) => {
        const historyData = await user_game_history.findByPk(req.params.id);
        res.render('gamehistory/edit-gamehistory', {
          history: historyData,
        });
    },

    update: async(req, res) => {
        await user_game_history.update(
            {
                played_at: req.body.playedAt,
                score_result: req.body.score,
            }, {
                where: 
                {
                    id: req.body.id,
                },
            }
        );
        res.redirect('/history');
    },

    delete: async(req, res) => {
        await user_game_history.destroy(
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        res.redirect('/history');
    },
};

