const Users = require("./users")
const jwt = require("jsonwebtoken")
class Auth{
    constructor(){
        this.users = new Users()
    }

    async login(data){
        const user = await this.users.get(data.email)

        if(user && user.password===data.password){
            user.password = undefined
            user.__v = undefined


            const token = jwt.sign({...user},"12345",{expiresIn:"1d"})
            return{
                logged:true,
                user,
                token,
                message:"Inicio correcto"
            }
        }

        return {
            logged:false,
            message:"Credenciales incorrectas"
        }
    }

    async verify(token){
        const user = jwt.verify(token,"12345")
        console.log(user)

        return user
    }
}


module.exports = Auth