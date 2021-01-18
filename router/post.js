const express = require('express'),
    router = express.Router(),
    Post = require('../controller/post'),
    Auth = require('../controller/utils').validateToken;

router.get('/', Post.getPosts);
router.get('/:slug', Post.getPost);
router.post('/', Post.createPost);
router.delete('/:uuid', Post.removePost);
router.put('/:uuid', Post.updatePost);

module.exports = router