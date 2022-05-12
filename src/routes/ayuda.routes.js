const { Router } = require('express');

const router = Router();

router.get('/ayuda', ( req, res ) => {
    res.render('./ayuda/ayuda');
});

module.exports = router;