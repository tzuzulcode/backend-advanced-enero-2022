const { graphqlHTTP } = require("express-graphql")
const {root,schemas} = require("../libs/graphql")
const jwt = require("jsonwebtoken")

function graphql(app){
    //const router = Router()
    app.use('/graphql',graphqlHTTP((request,response,params)=>{
        const token = request.cookies.token
        let context;
        if(token){
            const {email,role} = jwt.verify(token,"12345")
            context = {email,role}
        }else{
            context = {role:"UNAUTHENTICATED"}
        }
        return ({
            graphiql:true,//Habilita el sandbox
            rootValue:root,//Lista los schemas para consulta
            schema:schemas,// Estructura de la información,
            context
        })
    }))
}

module.exports = graphql