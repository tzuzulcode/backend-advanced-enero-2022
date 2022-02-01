const {Router} = require("express")
const Users = require("../services/users")
function users(app){
    const router = Router()

    //Utilizando el servicio
    const usersServ = new Users()

    app.use("/api/users",router)
    
    router.get("/",async (req,res)=>{
        const users = await usersServ.getAll()
        return res.json(users)
    })
    router.get("/:email",async (req,res)=>{
        const {email} = req.params
        const user = await usersServ.get(email)
        return res.json(user)
    })
    router.post("/",async (req,res)=>{
        const user = await usersServ.create(req.body)
        return res.json(user)
    })
    router.put("/:id",async (req,res)=>{
        const user = await usersServ.update({id:req.params.id,user:req.body})
        return res.json(user)
    })
    
}

module.exports = users