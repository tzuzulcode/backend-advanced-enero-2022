const ProductModel = require("../models/products")
class Products{
    async get(params){
        return await ProductModel.find(params).exec()
    }

    async getAll(){
        return await ProductModel.find()
    }

    async create(data){
        const product = await ProductModel.create(data)

        return {product,success:true}
    }
}

module.exports = Products