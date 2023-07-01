require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

mongoose.connect(URI).then(() => {
    console.log('Successfully connected to the database');
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}...`)
    })
}).catch((err) => {
    console.log(err)
    console.log(`Failed to connect to the database!`);
})

module.exports = app;