const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Gaganisgoodboy@";

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "User not exists!" });
        else if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ success: false, message: "Wrong password!" });
        }
        else {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, token: authtoken });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
}

const register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success: false, message: "Email already exists!" });
        const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }).then(() => res.json({ success: true }))
    } catch (error) {
        res.json({ success: false })
    }
}
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId }).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(400).send("Internal Server Error! :(")
    }
}
module.exports = {
    register,
    login,
    getUser
};