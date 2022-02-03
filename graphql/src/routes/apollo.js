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
        server.applyMiddleware({
            app,
            path:"/apollo",
            cors:{
                credentials:true,
                origin:["http://localhost:3000","https://studio.apollographql.com"]
            }
        })
        console.log(server.graphqlPath)
    })
    
}

module.exports = apollo