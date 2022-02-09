const { port} = require("./config")
const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const passport = require("passport")

//DB
const {connection} = require("./config/db")
connection()

//Importando routes
const graphql = require('./routes/graphql')
const apollo = require('./routes/apollo')
const users = require('./routes/users')
const products = require('./routes/products')
const auth = require('./routes/auth')
const googleProvider = require("./middleware/google")

const app = express()

//Middleware
// Agregando middleware para body parsing
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000','https://studio.apollographql.com'],
    credentials:true
}))
app.use(cookie())
app.use(passport.initialize())

passport.use(googleProvider())

graphql(app)
users(app)
products(app)
apollo(app)
auth(app)

app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(port,()=>{
    console.log("Listening on port 4000!")
})