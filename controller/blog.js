const slugify = require('slugify'),
    readingTime = require('reading-time');

const db = require("../models/index")

exports.createPost = async (req, res) => {
    try {
        const blog = await db.Blog.create({
            title: req.body.title,
            slug: slugify(req.body.title, { strict: true, lower: true }),
            read_time: readingTime(req.body.content),
            content: req.body.content
        })
        res.status(201).json({ "status": "ok", "message": "Created Blog Post", data: blog })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const blogs = await db.Blog.findAll()
        res.status(200).json({ "status": "ok", "message": "Get Blog Posts", data: blogs })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getPost = async (req, res) => {
    try {
        const blogs = await db.Blog.findOne({ slug: req.params.slug })
        res.status(200).json({ "status": "ok", "message": "Get Blog Posts", data: blogs })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.removePost = async (req, res) => {
    try {
        const blog = await db.Blog.destroy({ where: { id: req.params.id } })
        res.status(200).json({ "status": "ok", "message": "Removed Post" })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const blog = await db.Blog.update({
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

