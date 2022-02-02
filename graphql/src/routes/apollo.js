const { ApolloServer } = require("apollo-server-express")
const {schema,resolvers,context} = require("../libs/apollo")

function apollo(app){
    //const router = Router()
    const server = new ApolloServer({
        typeDefs:schema,
        resolvers,
        context
    })
    
    server.start()
    .then((res)=>{
        server.applyMiddleware({app,path:"/apollo"})
        console.log(server.graphqlPath)
    })
    
}

module.exports = apollo