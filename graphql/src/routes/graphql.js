//const {Router} = require("express")
const root = {
    hello:()=>{
        return 'Hola mundo'
    }
}

let schemas = buildSchema(`
    type Query{
        hello: String
    }
`)
function graphql(app){
    //const router = Router()
    app.use('/graphql',graphqlHTTP({
        graphiql:true,//Habilita el sandbox
        rootValue:root,//Lista los schemas para consolta
        schema:schemas// Estrcutrura de la información
    }))
    
}

module.exports = graphql