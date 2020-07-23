const User=require("../models/user");


exports.getAllUsers=(req,res)=>{
    User.find((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        }
        return res.json(users);
    })
}