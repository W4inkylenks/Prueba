const { Router } = require('express');

const router = Router();

const { renderDisp } = require('../controllers/dispositivos.controllers')
const { isAuthenticated } = require('../helpers/auth');


router.get('/dispositivos', isAuthenticated, renderDisp);



module.exports = router;