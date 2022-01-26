const { graphqlHTTP } = require("express-graphql")
const {root,schemas} = require("../libs/graphql")

function graphql(app){
    //const router = Router()
    app.use('/graphql',graphqlHTTP({
        graphiql:true,//Habilita el sandbox
        rootValue:root,//Lista los schemas para consulta
        schema:schemas// Estructura de la información
    }))

    
}

module.exports = graphql