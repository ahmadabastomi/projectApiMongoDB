const User = require('../models/user');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(12);
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.user_create = async function (req, res) {
    const password = req.body.password
    const hash = bcrypt.hashSync(password, salt);
    let user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: hash,
        }
    );

    try {
        await user.save(function (err) {
            if (err) {
                return next(err)
            }
            res.status(201).send('User Created successfully')
        })
    } catch (error) {
        res.status(400).send('Failed Create New Product')
    }
};

//Login 
exports.user_login = async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const check = bcrypt.compareSync(req.body.password, user.password);
            if (check) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                res.json({
                    id: user._id,
                    token: token
                })
            } else {
                res.send('Wrong Username / Password')
            }
        }
        else {
            res.send('Wrong Username / Password')
        }
    } catch (error) {
        res.status(404).send('Account Not Registered')
    }
};