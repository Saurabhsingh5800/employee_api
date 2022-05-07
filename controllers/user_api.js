
const User = require('../models/employee');
const jwt = require('jsonwebtoken');

/// create the session to establish user identity.user login controller
module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'kgfchapter2', {expiresIn:  '1000000000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


//  Thia one is for signup for a user
module.exports.create = function(req, res){
    if (req.body.password && req.body.email && req.body.age && req.body.department && req.body.name){

        User.findOne({email: req.body.email}, function(err, user){
    
            if(err){ return res.status(500).json({error:"internal server issue"});}
    
            if (!user){
                User.create(req.body, function(err, user){
                    return res.status(404).json({message:"account created kindly sign in to get token"});
                })
            }else{
                return res.status(404).json({message:"you already sign up kindly login to get token"});
            }
    
        });



        
    } else{
        return res.status(404).json({error:"field data is not correct"});
    }

   
}



///////////




module.exports.getLists=function(req,res){
    User.find({})
    .then(users=>{
        // removing extra information
        let filteredProducts = users.map((value,index)=>{
            return {id:value.id,name:value.name,age:value.age,email:value.email,department:value.department}
        });
        // return the employeess as  json responce.
        return res.status(200).json({employees:filteredProducts});        
    }).catch(err=>{
        return res.status(500).json({error:"internal server issue"});
    })

}


// this handle the deletion of the employees
module.exports.delete = function(req,res){
    // this find the employee by id and remove from the data base.
    User.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            return res.status(500).json({error:"employee id not matched"})
        }
        return res.status(200).json({message:"requested information deleted"})
    })  
}

// ALL the employees will updated here
module.exports.update=  async function(req,res){
                 
                 try {
                    const id = req.params.id;
                    const updatedData = req.body;
                    const options = { new: true };
            
                    const result = await User.findByIdAndUpdate(
                        id, updatedData, options
                    )
            
                    res.send(result)
                }
                catch (error) {
                    res.status(400).json({ message: error.message })
                }          
                
                
    }
    
