const { sequelize } = require("./models");

const express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    cors = require('cors'),
    fs = require('fs'),
    PORT = 8080 || process.env.PORT;

require('dotenv').config()

const app = express()
app.use(cors())
app.use(fileUpload());
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get("/status", (req, res) => {
    res.json({ "status": "ok" })
})
app.use('/posts', require('./router/post'))
app.use('/', require('./router/user'))

app.listen(PORT, async () => {
    console.log(`App is running on http://localhost:${PORT}`);
    await sequelize.authenticate()
    console.log("DB Connected");
})