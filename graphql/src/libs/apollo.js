const {gql} = require("apollo-server-express")
//const {makeExecutableSchema} = require("graphql-tools")
const Users = require("../services/users")
const Products = require("../services/products")
const usersServ = new Users()
const productsServ = new Products()

const schema = gql`
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
`

const resolvers = {
    Query:{
        users:(parent, args, context, info)=>{
            return usersServ.getAll(args)
        },
        product:(parent, args, context, info)=>{
            return productsServ.get(args)
        },
        products:(parent, args, context, info)=>{
            return productsServ.getAll(args)
        },
    },
    Mutation:{
        updateUser:(parent, args, context, info)=>{
            console.log(args)
            return usersServ.update(args)
        },
        createProduct:(parent, args, context, info)=>productsServ.create(args),
        updateProduct:(parent, args, context, info)=>productsServ.update(args)
    }
};

module.exports = {schema,resolvers}