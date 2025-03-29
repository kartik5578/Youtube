const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "default_secret";

const generateToken = (payload, expiry = process.env.JWT_EXPIRY || "1h") => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = { generateToken, verifyToken };