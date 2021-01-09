const jwt = require('jsonwebtoken');
const env = require('../config/env');
exports.generateTokenAndSetCookie = (response, userEmail) => {
    const token = jwt.sign({ data: userEmail }, env.JWT_KEY, { expiresIn: "24h" });
    return response.cookie("token", token, {
        expires: new Date(Date.now() + /*86400*/ (3600000 * 24)),
        secure: false, // set to true if your using https
        httpOnly: true,
    });
}