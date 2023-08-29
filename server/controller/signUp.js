const { sign } = require("crypto")
const signupModel= require("../models/signup")
// const express= require("express")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
 
//Post Signup

const postSignup = async (req,res) =>{
     const userData= req.body
     const {password}= userData
     const hashedpassword = await bcrypt.hash(password,5)
     userData.password= hashedpassword
     try{
        const user= await signupModel.create(userData)
        res.status(201).send({status:"Sucessfully",msg:"New user created successfully"})

     }
     catch(err){
        res.status(404).send({status:"Invalid attempt",msg:"User cannot be created"})
     }
}
module.exports={postSignup}
