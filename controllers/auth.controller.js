const AuthService = require('../services/auth.service')
const JWTService = require('../services/jwt.service');
const JWTServiceInstance = new JWTService();
const AuthServiceInstance = new AuthService();

async function postLogin(req, res) {
    try {
        console.log('reached1')
        await AuthServiceInstance.login(req.body);
        console.log('reached end')
        res.end();
    } catch (error) {
        res.status(401).json(error);
    }
}



async function postSignup(req, res) {
    try {
        await AuthServiceInstance.signup(req.body);
        res.json({ message: "A verification email has been sent to your mail id" })
    } catch (error) {
        console.log(error);
        res.status(409);
        res.json({
            message: error
        });
    }
}

async function getEncodedLinkOfSignupUsers(req, res) {
    try {
        console.log('request recieved')
        JWTServiceInstance.verify(req.params.encodedLink, process.env.JWT_SECRET);
        const decoded = JWTServiceInstance.decode(req.params.encodedLink)
        const date = new Date();
        if (decoded.signupExpiresAt < date) {
            throw "Token expired";
        }
        else {
            const { name, email, password } = decoded;
            await AuthServiceInstance.moveFromSignupUsersToUsers(name, email, password);
            const htmlContent = `
            <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
      <style>
            .container{
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50,-50%)
            }
      </style>
    </head>
    <body>
    <div class='container'>
      <h1>Authorization Success</h1>
      <p>Your account is verified now</p>
      <p> Click <a href='http://localhost:3000/login'>here</a> to login</p>
      </div>
    </body>
    </html>
            `
            res.set('Content-Type', 'text/html');
            res.send(htmlContent);
        }
    } catch (error) {
        console.log(error);
        const htmlContent = `
        <!DOCTYPE html>
<html>
<head>
  <title>Verification</title>
  <style>
        .container{
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50,-50%)
        }
  </style>
</head>
<body>
<div class='container'>
  <h1>Authorization Failed</h1>
  <p>Your token is expired or this link is not correct</p>
  </div>
</body>
</html>
        `
        res.set('Content-Type', 'text/html');
        res.send(htmlContent);
    }

}



module.exports = { postLogin, postSignup, getEncodedLinkOfSignupUsers }