const ProductModel = require("../models/products")
class Products{
    async get(query){
        if(query.categories){
            query.categories = {
                $all:query.categories
            }
        }
        return await ProductModel.findOne(query).exec()
    }

    async getAll(query){
        if(query.categories){
            query.categories = {
                $all:query.categories
            }
        }
        return await ProductModel.find(query)
    }

    async create(query){
       return await ProductModel.create(query.product)

    }
    async update(query){
        // Reto corregir
        return await ProductModel.findOneAndUpdate({_id:query.id},query.product,{new:true})
        //return await ProductModel.findByIdAndUpdate(query.id,data.product)
    }
}

module.exports = Products