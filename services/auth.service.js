const { generateOtp, sendEmail } = require('../helper/nodemailer');
const SignedUpUsers = require('../models/signedUpUsers.model');
const JWTService = require('./jwt.service');
const JWTServiceInstance = new JWTService();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

class AuthService {
    async login(data) {
        const { email, name, image, password } = data;
        try {
            const exists = await User.findOne({ email: email });
            if (exists) {
                if (!password) { // Google login

                }
                else { // Not a google login
                    const passwordMatches = bcrypt.compareSync(password, exists.password);
                    if (passwordMatches) {
                        return exists;
                    }
                    else {
                        throw "Invalid credentials"
                    }
                }

            }
            else {
                if (!password) { // Google login
                    const newUser = await User.create({
                        ...data,
                        status: 'nonVerified'
                    });
                    return newUser;
                }
                else { // Not a google login
                    throw "Account doesn't exist. Signup instead!"
                }
            }
            return;

        } catch (error) {
            throw error;
        }
    }
    async signup(data) {
        const { name, email, password } = data;
        try {
            const existsInUsers = await User.findOne({ email: email });
            if (existsInUsers) {
                throw ('User is already registered. Login instead!');
            }
            else {
                const existsInSignedUpUsers = await SignedUpUsers.findOne({ email: email });
                const date = new Date();
                const expiredDate = date.setMinutes(date.getMinutes() + 10);
                if (existsInSignedUpUsers) {
                    await SignedUpUsers.findOneAndUpdate({ email: email }, {
                        $set: {
                            "signupExpiresAt": expiredDate
                        }
                    })
                    const payload = {
                        ...data,
                        signupExpiresAt: expiredDate
                    }
                    const token = JWTServiceInstance.encode(payload, process.env.JWT_SECRET);
                    await sendEmail(email, token, 'VERIFY');
                }
                else {
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashedPassword = bcrypt.hashSync(password, salt)
                    const payload = {
                        ...data,
                        password: hashedPassword,
                        signupExpiresAt: expiredDate
                    }
                    const newSignedUpUser = await SignedUpUsers.create(payload)
                    const token = JWTServiceInstance.encode(payload, process.env.JWT_SECRET);
                    await sendEmail(email, token, 'VERIFY');
                }
                return;

            }
        } catch (error) {
            throw (error)
        }
    }
    async moveFromSignupUsersToUsers(name, email, password) {
        try {
            await SignedUpUsers.findOneAndDelete({ email: email });
            await User.create({
                name: name,
                email: email,
                password: password,
                status: 'nonVerified'
            })
        } catch (error) {

        }
    }
}

module.exports = AuthService;