const express = require('express');
const router = express.Router();




// this is the routing that use for users authentication that starts with
router.use('/users',require('./users'));
// this is routing to routes that start with  /contacts 
// router.use('/v1',require('./v1'))
// console.log("v1 load");

module.exports = router;