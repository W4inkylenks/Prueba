const { Router } = require('express');

const router = Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/estadisticas', isAuthenticated, ( req, res ) => {
    res.render('./estadisticas/estadisticas');
});


module.exports = router;