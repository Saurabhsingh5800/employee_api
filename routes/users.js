const express=require('express');
const router = express.Router();
const userController = require('../controllers/user_api');
const passport = require('passport');
// create session router for login and get the token
router.post('/signin',userController.createSession);
// for signup 
router.post('/signup',userController.create);



// routes to all the crud functionality for the list model
// passport authenticate method to verify jwt token using passport jwt strategy
// router.post('/create',passport.authenticate('jwt',{session:false}),userController.create);
router.get('/employees',passport.authenticate('jwt',{session:false}),userController.getLists);
router.delete('/:id',passport.authenticate('jwt', {session: false}),userController.delete);
router.post('/:id/update',passport.authenticate('jwt', {session: false}),userController.update);
console.log("last one loaded");

module.exports = router;