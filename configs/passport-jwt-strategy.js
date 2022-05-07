const res = require('express/lib/response');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/employee');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'kgfchapter2'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    console.log(jwtPayLoad);

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
           
            return done(null, user);
            
        }else{
            // res.status(500).json({error:"localhost:8000/users/login kindly establish your identity through this"})
            return done(null, false);
        }
    })

}));

module.exports = passport;
