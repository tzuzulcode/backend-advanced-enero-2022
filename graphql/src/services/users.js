const UserModel = require("../models/users")
class Users{
    async get(email){
        return await UserModel.findOne({email}).exec()
    }

    async getAll(){
        return await UserModel.find()
    }

    async create(data){
        // const user = UserModel(data)
        // await user.save()
        const user = await UserModel.create(data)

        return {user,success:true}
    }
}

module.exports = Users