const {Router} = require("express")

function users(app){
    const router = Router()
    app.use("/api/users",router)
    
    router.get("/",(req,res)=>{
        return res.send("GET users")
    })
    router.get("/:idUsuario",(req,res)=>{
        return res.send("GET user")
    })
    
}

module.exports = users