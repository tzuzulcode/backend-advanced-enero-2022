const {gql} = require("apollo-server-express")
//const {makeExecutableSchema} = require("graphql-tools")
const {root} = require("./graphql")

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
    Query: root,
};

module.exports = {schema,resolvers}