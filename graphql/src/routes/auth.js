const {Router} = require("express")
const Auth = require("../services/auth")
function auth(app){
    const router = Router()

    //Utilizando el servicio
    const authServ = new Auth()

    app.use("/api/auth",router)

    router.post("/login",async (req,res)=>{
        const details = await authServ.login(req.body)
        if(details.logged){
            return res.cookie("token",details.token,{
                httpOnly:true,
            }).json(details)
        }

        return res.status(401).json(details)
       
    })
    router.post("/validate",async (req,res)=>{

        const details = await authServ.verify(req.cookies.token)
        
        return res.json(details)
       
    })
}

module.exports = auth