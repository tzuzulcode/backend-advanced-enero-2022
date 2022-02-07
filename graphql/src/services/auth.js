const { jwt_scret } = require("../config")
const Users = require("./users")
const jwt = require("jsonwebtoken")
class Auth{
    constructor(){
        this.users = new Users()
    }

    async login(data){
        const user = await this.users.get(data.email)

        if(user && user.password===data.password){
            const data = {
                email:user.email,
                role:user.role
            }

            const token = jwt.sign(data,jwt_scret,{expiresIn:"1d"})
            return{
                logged:true,
                data,
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
        const user = jwt.verify(token,jwt_scret)
        console.log(user)

        return user
    }
}


module.exports = Auth