const User = require('../models/user');
const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const dotenv = require('dotenv');
dotenv.config();

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
},
    function (jwtPayload, cb) {
        //find the user in db if needed
        return User.findById(jwtPayload.id)
            .then(user => {
                console.log(jwtPayload.id)
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));