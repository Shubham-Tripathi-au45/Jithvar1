const express = require("express")
const app= express()
require("dotenv").config()
const port = process.env.PORT || 7000;

const userRoute= require("./routes/login")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const {initDB}= require("./dbConfig")
initDB()

app.listen(port,()=>{
    console.log("Server successfully connected to PORT 8000")
    app.use("/",userRoute)
})
