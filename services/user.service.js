const User = require("../models/user.model");

class UserService {
    async getUserByEmail(email) {
        const user = await User.findOne({ email: email })
        return user;
    }
    async getAllUsers() {
        const users = await User.find({});
        return users;
    }
    async updateVerificationRequest(email) {
        const newDate = new Date();
        await User.findOneAndUpdate({ email: email }, {
            $set: {
                "verification": {
                    "requested": true,
                    "requestedAt": newDate
                }
            }
        })
        return;
    }
}

module.exports = UserService;