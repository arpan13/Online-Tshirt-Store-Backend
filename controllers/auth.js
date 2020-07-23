const User=require("../models/user");
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup=(req,res)=>{ 
    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg,
            param :error.array()[0].param
        })
    }

    const user= new User(req.body);
    user.save((err,user)=>{
       if(err){
           return res.status(400).json({
               err:"Not able to save user in db"
           });
       }
       res.json({
           name:user.name,
           email:user.email,
           id:user._id
       });
    });
};

exports.signin=(req,res)=>{
    const error=validationResult(req);
     const {email,password}=req.body;

     if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg,
            param :error.array()[0].param
        })
    }

    User.findOne({email},(err,user)=>{
         if(err || !user){
             return res.status(400).json({
                 error:"User email does not exist"
             })
         }

         if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            })
         }
          //CREATE TOKEN
         const token=jwt.sign({_id:user._id},process.env.SECRET)
         //put token in cookie
         res.cookie("token",token,{expire:new Date() + 9999});

         //send resonse to front end

         const {_id,name,email,role}=user;
         res.json({
             token,user:{
                 _id,name,email,role
             }
         })


    })
    //
};

exports.signout=(req,res)=>{ 
    res.clearCookie("token");
    
    res.json({
        message:"USER SIGNOUT SUCESSFULLY"
    })
 };

//PROTECTED ROUTES
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});



//CUSTOM MIDDLE WARES

exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
      return res.status(403).json({
        error:"ACCESS DENIED"
      })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
if(req.profile.role===0){
  return res.status(403).json({
    error:"You are Not Admin,Access Denied"
  })
}
next();
}

