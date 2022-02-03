const { buildSchema,GraphQLError } = require("graphql")
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
    users:(query,context)=>{
        if(context.role==="ADMIN"){
            return usersServ.getAll(query)
        }else{
            return new GraphQLError("No tienes permisos")
        }
        
    },
    updateUser:usersServ.update,
    product:productsServ.get,
    products:productsServ.getAll,
    createProduct:productsServ.create,
    updateProduct:productsServ.update
}

let schemas = buildSchema(`
    input ProductInput{
        name:String
        description:String
        categories:[String]
        stock:Int
        price:Float
    }
    input UserInput{
        role:String
        name:String
    }
    type Query{
        hello: String
        me: User
        users(role:String): [User]
        product(id:String,name:String,categories:[String]):Product
        products(name:String,categories:[String]): [Product]
    }

    type User{
        name: String
        email: String
        role: String
        id:String
    }
    type Product{
        id:String
        name:String
        description:String
        categories:[String]
        stock:Int
        price:Float
    }

    type Mutation{
        updateUser(id:String!,user:UserInput):User
        createProduct(product: ProductInput): Product
        updateProduct(id:String!, product: ProductInput): Product
    }
`)

module.exports = {root,schemas}