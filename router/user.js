const express = require('express'),
    router = express.Router(),
    User = require('../controller/user')

router.get('/', User.getUsers);
router.get('/:slug', User.getUser);
router.post('/', User.createUser);
router.delete('/:id', User.removeUser);
router.put('/:id', User.updateUser);

module.exports = router