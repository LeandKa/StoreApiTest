const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { env } = require("process");



module.exports = async (req, res, next) => {

    const authHeaders = req.headers.usertoken;
    if (!authHeaders) {
        return res.status(401).json({ "Message:": "There is not authentication" });
    } else {
        try {
            const decoded = await promisify(jwt.verify)(authHeaders, process.env.JWT_SECRET);
            req.userId = decoded.id;
            return next();
        } catch (err) {
            return res.status(401).json({ "Message:": "Token not valid" });
        }
    }
}