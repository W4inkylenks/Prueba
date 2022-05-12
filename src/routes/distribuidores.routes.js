const { Router } = require('express');
const router = Router();

const { 
    renderDistri
} = require('../controllers/distribuidores.controllers');

const { isAuthenticated } = require('../helpers/auth');

// Vista general

router.get('/distribuidores', isAuthenticated, renderDistri );

module.exports = router;    