const { Router } = require('express');
const router = Router();
const { 
        renderIndex, 
        singIn, 
        renderSignUp, 
        singup, 
        logout,
        renderEdit,
        editUser
} = require('../controllers/users.controllers');

router.get('/', renderIndex);
router.post('/', singIn);
router.get('/users/signup', renderSignUp );
router.post('/users/signup', singup );
router.get('/users/logout', logout);
router.get('/users/edit', renderEdit);
router.put('/users/edit', editUser);

module.exports = router;