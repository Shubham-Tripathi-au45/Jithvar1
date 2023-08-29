const jwt=require("jsonwebtoken")
const authMiddleware= (req,res,next) =>{
    const token = req.cookies.jwt
    //Verfication of token
    if(token){
        try{
            const userData=jwt.verify(token,process.env.AUTH_SECRET_KEY)
            console.log(userData)
            req.userData = userData
            next()
        }
        catch(err){
            console.log("error in authMiddleware not authenticated")
            res.status(401).send({status:"error occured",msg:"Not authenticated"})
        }
        
    }
    else
        {
            res.status(500).redirect("http://localhost:8000/login")
        }
}
module.exports =  {authMiddleware}