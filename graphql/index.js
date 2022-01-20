const express = require("express")

//Importando routes
const graphql = require('./src/routes/graphql')
const users = require('./src/routes/users')
const app = express()

graphql(app)
users(app)

//Middleware


app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido")
})

app.listen(4000,()=>{
    console.log("Listening on port 8000!")
})