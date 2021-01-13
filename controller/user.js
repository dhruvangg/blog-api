const bcrypt = require("bcryptjs"),
    jwt = require('jsonwebtoken'),
    db = require("../models/index"),
    JWT_SECRET = process.env.JWT_SECRET

exports.signUp = async (req, res) => {
    const { username, email, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const user = await db.User.create({
            username,
            email,
            password
        })
        delete user.password;
        res.status(201).json({ "status": "ok", "message": user })
    } catch (error) {
        res.status(401).json({ "status": "error", "message": error.errors[0].message })
    }
}
exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } })
    if (!user) {
        return res.status(401).json({ status: 'error', error: 'Invalid username/password' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const payload = { id: user.id, username: user.username };
        const options = { expiresIn: '2d', issuer: 'http://localhost:8080' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options)
        return res.status(200).json({ status: 'ok', "message": "User signin successful", token })
    }
    return res.status(401).json({ "status": "error", "message": "Invalid Username/Password" })
}
exports.getUsers = async (req, res) => {
    try {
        const users = await db.User.findAll()
        res.status(201).json({ "status": "ok", "message": "Get User", users })
    } catch (error) {
        return res.status(401).json({ "status": "error", "message": error })
    }
}
exports.removeUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Remove User" })
}
exports.updateUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Update User" })
}
