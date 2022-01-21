const express = require("express")

//DB
const {connection} = require("./config/db")
connection()

//Importando routes
const graphql = require('./routes/graphql')
const users = require('./routes/users')


const app = express()

graphql(app)
users(app)

//Middleware


app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000!")
})