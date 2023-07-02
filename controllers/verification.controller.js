const UserService = require('../services/user.service');
const UserServiceInstance = new UserService();

async function postVerificationDetails(req, res) {
    try {
        const { email } = req.body;
        await UserServiceInstance.updateVerificationRequest(email);
        res.json({ message: "Done" });
    } catch (error) {

    }
}

module.exports = { postVerificationDetails }