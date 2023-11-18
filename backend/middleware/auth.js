const jwt = require('jsonwebtoken');
const JWT_SECRET = "Gaganisgoodboy@";
const isLogin = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) res.status(401).send("Please Login first!");
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send("Please Login first!");
    }
}
module.exports = { isLogin };