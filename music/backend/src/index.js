const express = require("express")
const { port, env } = require("./config")

const app = express()


app.get("/",(req,res)=>{
    return res.json({hola:"mundo"})
})


app.listen(port,()=>{
    console.log("Modo:",env)
    console.log("Listening... http://localhost:"+port)
})

