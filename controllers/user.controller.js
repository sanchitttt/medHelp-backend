const UserService = require('../services/user.service');
const UserServiceInstance = new UserService();

async function getUserDetails(req, res) {
    try {
        const { email } = req.query;
        if (email) {
            const user = await UserServiceInstance.getUserByEmail(email);
            res.json(user);
        }
        else {
            const users = await UserServiceInstance.getAllUsers();
            res.json(users);
        }
    } catch (error) {

    }
}

module.exports = { getUserDetails }