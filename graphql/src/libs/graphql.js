const { buildSchema } = require("graphql")
const Users = require("../services/users")
const Products = require("../services/products")
const usersServ = new Users()
const productsServ = new Products()

//const {Router} = require("express")
const root = {
    hello:()=>{
        return 'Hola mundo'
    },
    // me:async ()=>{
    //     return await usersServ.get()
    // }
    users:async ()=>{
        return await usersServ.getAll()
    },
    products:async()=>{
        return await productsServ.getAll()
    },
    getProductsByName:async (args)=>{
        return await productsServ.get(args)
    }
}

let schemas = buildSchema(`
    type Query{
        hello: String
        me: User
        users: [User]
        products: [Product]
        getProductsByName(name:String):[Product]
    }

    type User{
        name: String
        email: String
        id:String
    }
    type Product{
        name:String
        description:String
        categories:[String]
        stock:Int
        price:Float
    }
`)

module.exports = {root,schemas}