
// Require express
const express = require("express");
//call the express
const app = express();
// defining the port
const port = 8020;
// port database configation
const db = require('./configs/mongoose')
// import passport
const passport = require("passport");
// import passport jwt strategy that define in confings folder
const passportJwtStrategy=require('./configs/passport-jwt-strategy');

// use urlencoded to read the form data
app.use(express.urlencoded({extended:true}));
// use router
app.use('/',require('./routes'));
// fire up the server with localhost
app.listen(port,function(err){

    if(err){
        console.log("server is not connected");
    }
    console.log(`server is running succesfully at the ${port}`);
})