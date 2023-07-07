require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const verificationRoutes = require('./routes/verification.routes');
const patientRoutes = require('./routes/patient.routes');

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

const app = express();

mongoose.connect(URI).then(() => {
    console.log('Successfully connected to the database');
}).catch((err) => {
    console.log(err)
    console.log(`Failed to connect to the database!`);
})



// MIDDLEWARES 
app.use(cors());
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(fileUpload({
    useTempFiles: true
}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// ROUTES
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/verification', verificationRoutes)
app.use('/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)
})



module.exports = app;