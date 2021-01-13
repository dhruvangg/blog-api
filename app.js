const express = require("express"),
    path = require('path'),
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

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
})