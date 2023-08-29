const mongoose= require("mongoose")
const signupSchema= new mongoose.Schema({
    name:{
        type:String,
},
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    token:{
        type:String,
        default:''
    },

    
})

const signupModel= mongoose.model("SignUp",signupSchema)
module.exports=signupModel