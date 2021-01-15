const express = require('express'),
    router = express.Router(),
    User = require('../controller/user'),
    Auth = require('../controller/utils').validateToken;

router.post('/register', User.signUp);
router.post('/login', User.signIn);
router.get('/users', Auth, User.getUsers);
// router.get('/:slug', User.getUser);

// router.delete('/:id', User.removeUser);
// router.put('/:id', User.updateUser);

module.exports = router