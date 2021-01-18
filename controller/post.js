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
    const { limit = 2, offset = 0 } = req.query;
    try {
        const total = await db.Post.count()
        const posts = await db.Post.findAll({ limit, offset, include: 'User' })
        res.status(200).json({ "status": "ok", "message": "Get Blog Posts", posts, total, limit, "page": offset + 1, total_pages: Math.ceil(total / limit) })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await db.Post.findOne({ slug: req.params.slug })
        res.status(200).json({ "status": "ok", "message": "Get blog post by slug", post })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.removePost = async (req, res) => {
    const { uuid } = req.params;
    try {
        await db.Post.destroy({ where: { uuid } })
        res.status(200).json({ "status": "ok", "message": "Removed Post" })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.updatePost = async (req, res) => {
    const { uuid } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token)
    const { title, body, tags } = req.body;
    try {
        await db.Post.update({
            title,
            slug: slugify(req.body.title, { strict: true, lower: true }),
            read_time: readingTime(body),
            userId: user.id,
            tags,
            body,
            updatedAt: new Date().getTime()
        }, { where: { uuid } })
        res.status(200).json({ "status": "ok", "message": "Updated Post", "postId": uuid })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

