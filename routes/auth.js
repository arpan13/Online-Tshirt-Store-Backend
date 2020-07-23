const {signout,signup,signin,isSignedIn}= require("../controllers/auth");
const express = require('express')
const router = express.Router()
const { check,validationResult } = require('express-validator');

router.post("/signup",[
    check("name").isLength({min:3}).withMessage('must be at least 5 chars long'),
    check("email").isEmail().withMessage('Email is must Required'),
    check("password").matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
      ).withMessage('Must Contain 1 upperCase,1 special Character,1 Alphanumeric characters ')
],signup);

router.post("/signin",[
  check("email").isEmail().withMessage('Email is Required'),
  check("password").isLength({min:3}).withMessage('Password feild is required')
],signin);



router.get("/signout",signout);






module.exports=router;