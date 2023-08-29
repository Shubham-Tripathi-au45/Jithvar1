const { error } = require("console")
const signupModel= require("../models/signup")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer=require("nodemailer")
const randomstring= require("randomstring")

//Post Login
const loginPage = async (req,res)=>{
    const {email,password}= req.body
    try{
        const user = await signupModel.findOne({email})
        console.log("Userfound", user)

        const match = await bcrypt.compare(password,user.password)
        // res.status(201).send({status:"Success",msg:"Password matched"})
    if(!match){
        console.log("password not matched")
    }
      
    const id= user._id
    const userName= user.username
    const payLoad={email}
    const accessToken= jwt.sign(payLoad,process.env.AUTH_SECRET_KEY,{algorithm:"HS256",expiresIn:"1d"})
    console.log(accessToken,"Token created")
    res.cookie("jwt",accessToken,{maxAge:90000000})
    res.status(201).send({status:"Successfully "})
    
    }
    catch(err){
        res.send({status:"error"})
    }


}

//SendResetMail

const sendResetPasswordMail= async(username,email,token)=>{
    // console.log(email,"send")
    try{
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            requireTLS:true,
            auth:{
                user:process.env.GOOGLE_USER,
                pass:process.env.GOOGLE_PASSWORD
            },
            // tls: {
            //     ciphers:'SSLv3'
            // }
        })

        const mailOptions={
            from:process.env.GOOGLE_USER,
            to:email,
            subject:"Link for Reseting Password",
            html:`<p> Hi ${username}..Please copy the link  <a href="http://localhost:7000/reset-password?token=${token}></a> and reset your password`
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log("Mail has been sent:- ",info.response)
            }
        })
    }
    catch(err){
        res.status(400).send({success:false,msg:error.message})
    }
}


// Reset Password 

const forgotPassword = async(req, res)=> {
    const email= req.body.email
    console.log(email,"hello")
    try{
        const user= await signupModel.findOne({email:email})
        console.log(user)
        if(user){
const randomString = randomstring.generate()
const data = await signupModel.updateOne({email:email},{$set:{token:randomString}})
sendResetPasswordMail(user.username,user.email,randomString)
res.status(200).send({status:true,msg:"Please check mail box of your mail"})
        }
    }
    catch(err){
        res.status(404).send({status:false,msg:"Cannot fetch data"})
    }
  }

// const forgotPassword = async (req, res) => {
    
//       const {email} = req.body
//       console.log(email)
//       try{
//        const user = await signupModel.findOne(email)
//        if(!user){
//         console.log("user not found")
//        }

//          const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '15m'})
//          console.log(token)
        
//             let transporter = nodemailer.createTransport({
//                   host: 'smtp.gmail.com',
//                   port: 587,
//                   secure: false,
//                   auth: {
//                       user: process.env.GOOGLE_USER,
//                       pass: process.env.GOOGLE_PASSWORD
//                   },
//             });
//             const data = {
//                 to: email,
//                 subject: 'Reset Account Password Link',
//                 html: `
//                 <h3>Please click the link below to reset your password</h3>
//                 <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
//                 `,
//               }
              
//               return user.updateOne({resetLink: token}, (err, user) => {
//                 if (err) {
//                   return res.status(400).json({error: 'Reset password link error'})
//                 } else {
//                   transporter.sendMail(data, function(error, body) {
//                     if (error) {
//                       return res.status(400).json({error: error.message})
//                     }
//                     return res.status(200).json({message: 'Email has been sent, please follow the instructions'})
//                   })
//                 }
//               })
//         }
//       catch(err){
//         res.send(err)
//       }
        
       
    
//     }
  
  
module.exports={loginPage,forgotPassword}