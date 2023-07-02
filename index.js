require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const verificationRoutes = require('./routes/verification.routes');


const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

mongoose.connect(URI).then(() => {
    console.log('Successfully connected to the database');
}).catch((err) => {
    console.log(err)
    console.log(`Failed to connect to the database!`);
})


// CORS
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// ROUTES
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/verification', verificationRoutes)


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)
})


module.exports = app;