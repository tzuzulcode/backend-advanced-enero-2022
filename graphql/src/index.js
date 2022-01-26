const express = require("express")

//DB
const {connection} = require("./config/db")
connection()

//Importando routes
const graphql = require('./routes/graphql')
const apollo = require('./routes/apollo')
const users = require('./routes/users')
const products = require('./routes/products')

const app = express()

// Agregando middleware para body parsing
app.use(express.json())

//graphql(app)
users(app)
products(app)

//Middleware


app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000!")
})