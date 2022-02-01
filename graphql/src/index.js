const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
//DB
const {connection} = require("./config/db")
connection()

//Importando routes
const graphql = require('./routes/graphql')
const apollo = require('./routes/apollo')
const users = require('./routes/users')
const products = require('./routes/products')
const auth = require('./routes/auth')

const app = express()

// Agregando middleware para body parsing
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000']
}))
app.use(cookie())

graphql(app)
users(app)
products(app)
apollo(app)
auth(app)

//Middleware


app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000!")
})