const { Router } = require('express');
const router = Router();

const { renderIndex, renderDisp } = require('../controllers/index.controllers');
const { isAuthenticated } = require('../helpers/auth');


router.get('/home', isAuthenticated, renderIndex);

module.exports = router;