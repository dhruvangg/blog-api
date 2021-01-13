exports.createUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Create User" })
}
exports.getUsers = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Get Users" })
}
exports.getUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Get User" })
}
exports.removeUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Remove User" })
}
exports.updateUser = async (req, res) => {
    res.status(201).json({ "status": "ok", "message": "Update User" })
}
