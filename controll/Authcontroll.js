const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const maxAge = 60;

//function To create time base token
const createToken = ( id ) => {
    return jwt.sign({id},'verySecretValue',{expiresIn:maxAge});
}

//compair bcrypt password in login and send login data 
const login = (req,res,next) =>{
    var Username = req.body.Username;
    var {Password,Username} = req.body;
    User.findOne({Username:Username})
    .then((user) =>{
       if(user){
           //console.log(user);
           bcrypt.compare(Password,user.Password,(err,result) => {
               if(err){
                   res.json({
                       error: err
                   })
               }
               if(result){  
                   const token = createToken(user._id); 
                   res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000});
                    res.status(200).json({
                       message:"Login Successfull ->",
                       user,
                       token:token,
                       userType:user.userType,
                       id: user._id
                   })
               }  else{
                res.status(200).json({
                    message:"Password Does Not Match!"
                })
            }
             
           })
       }  else{
        res.status(200).json({
            message:"No User Found!"
        })
    }
    })
    .catch(error =>{
        res.status(501).json({
            message:"An Error Occured!"
        })
    })

}

//create new user 
const registor = (req,res,next) => {
    bcrypt.hash(req.body.Password,10,(err, hashpass) => {
        if(err){
            res.status(501).json({
                error: err
            })
        }
        let user = new User ({
            Username: req.body.Username,
            Password: hashpass,
            userType: req.body.userType
        });    
        user.save()
        .then(user =>{
            res.status(200).json({
                message: user
            })
        })
        .catch(err => {
            res.status(501).json({
                message:"An Error occured!"
            })
        })
    })

    
}

//Find user name as per name and id
const getuser = (req,res,next) =>{
     User.findOne({$or:[{Username:req.body.Username},{_id:req.body.id}]})
    .then(response =>{
        if(response){
            res.status(200).json({
                message: [response]
            })
        }
        else{
            res.status(200).json({
                message: "null"
            })
        }
    })
    .catch(err =>{
        res.status(501).json({
            message:"An Error Occured!"
        })
    })
}

//delete specific user 
const destroy = (req,res,next) => {
    let  UserID = req.body.UserID;
    User.findOneAndDelete(UserID)
    .then(response => {
        res.status(200).json({
            message:"User has deleted"
        })
    })
    .catch(err =>{
        res.status(501).json({
            message: "An Error Occured! "
        })
    })

}

module.exports = {registor,getuser,destroy,login};