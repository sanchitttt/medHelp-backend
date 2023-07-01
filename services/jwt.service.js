const jwt = require('jsonwebtoken');

class JWTService {
    encode(payload) {
        const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 60 * 24 * 30
        })
        return newToken;
    }
    verify(token) {
        try {
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
    decode(token){
        return jwt.decode(token);
    }
}

module.exports = JWTService;