const UserModel = require("../models/users")
class Users{
    async get(email){
        return await UserModel.findOne({email}).exec()
    }

    async getAll(query){
        console.log(query)
        return await UserModel.find(query)
    }

    async create(data){
        // const user = UserModel(data)
        // await user.save()
        const user = await UserModel.create(data)

        return {user,success:true}
    }
    async update(query){
        // const user = UserModel(data)
        // await user.save()
        const user = await UserModel.findOneAndUpdate({_id:query.id},query.user,{new:true})
        user.password = undefined
        return user
    }
}

module.exports = Users