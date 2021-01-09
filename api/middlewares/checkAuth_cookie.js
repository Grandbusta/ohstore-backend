const jwt = require('jsonwebtoken')
const env = require('../config/env')
const { User } = require('../models/pImgRel')

/**
 * @author MasterCraft
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
exports.verifyUser = (request, response, next) => {
    // const token = request.headers.authorization.split(" ")[1] || request.cookies.token;
    const token = request.cookies.token || false;
    if (!token) response.status(403).json({ error: "invalid token" });
    else {
        jwt.verify(token, env.JWT_KEY, (error, value) => {
            if (error) response.status(500).json({ error });
            // request.user = value.data;
            // next();


            /** ================== */
            const userData = await User.findOne({
                where: { email: value.data.email },
                attributes: ['id', 'email', 'first_name', 'last_name', 'user_status']
            });
            if (userData.email && (userData.user_status === 'active')) {
                req.userData = userData;
                next();
            } else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        });
    }
}

exports.verifyAdmin = (request, response, next) => {
    // const token = request.headers.authorization.split(" ")[1] || request.cookies.token;
    const token = request.cookies.token || false;
    if (!token) response.status(403).json({ error: "invalid token" });
    else {
        jwt.verify(token, env.JWT_KEY, (error, value) => {
            if (error) response.status(500).json({ error });
            // request.user = value.data;
            // next();


            /** ================== */
            const userData = await User.findOne({ where: { email: decoded.email }, attributes: ['email', 'user_type'] });
            if (userData.user_type === 'admin') {
                req.userData = userData;
                next()
            } else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        });
    }
}