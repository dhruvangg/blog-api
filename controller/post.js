const slugify = require('slugify'),
    jwt = require('jsonwebtoken'),
    readingTime = require('reading-time');

const db = require("../models/index")

exports.createPost = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token)
    const { title, body, tags } = req.body;
    try {
        const blog = await db.Post.create({
            title,
            slug: slugify(req.body.title, { strict: true, lower: true }),
            read_time: readingTime(body),
            userId: user.id,
            tags,
            body
        })
        res.status(201).json({ "status": "ok", "message": "Created Blog Post", data: blog })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getPosts = async (req, res) => {
    // const { limit = 10, offset = 0 } = req.query;
    try {
        const posts = await db.Post.findAll({ include: 'User' })
        res.status(200).json({ "status": "ok", "message": "Get Blog Posts", posts })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getPost = async (req, res) => {
    try {
        const posts = await db.Post.findOne({ slug: req.params.slug })
        res.status(200).json({ "status": "ok", "message": "Get Blog Posts", post })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.removePost = async (req, res) => {
    try {
        await db.Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ "status": "ok", "message": "Removed Post" })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.updatePost = async (req, res) => {
    try {
        await db.Post.update({
            title: req.body.title,
            slug: slugify(req.body.title, { strict: true, lower: true }),
            read_time: readingTime(req.body.content),
            content: req.body.content,
            updatedAt: new Date().getTime()
        }, { where: { id: req.params.id } })
        res.status(200).json({ "status": "ok", "message": "Updated Post", "postId": req.params.id })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

