const router = require('express').Router()
const validarToken= require('./../middlewares/validarToken.js');
const functions= require('./../controller/task')

router.get('/task',validarToken,functions.getAll);
router.get('/task/:id',validarToken,functions.getTask);
router.post('/task',validarToken,functions.create);
router.delete('/task/:id',validarToken,functions.delete);
router.put('/task/:id',validarToken,functions.update);