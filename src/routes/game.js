const router = require('express').Router()
const validarToken= require('./../middlewares/validarToken.js');
const { startGame, joinGame,getGame,startNewRound,getAnswers,responseRaiting} = require('../controller/game');

router.post('/start',validarToken, startGame);
router.post('/join',validarToken, joinGame);
router.post('/getGame',validarToken, getGame);
router.post('/startNewRound',validarToken,startNewRound);
router.post('/submitAnswers',validarToken,getAnswers);
router.post('/scores',validarToken,responseRaiting);

module.exports=router;  