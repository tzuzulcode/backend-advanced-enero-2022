const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const passport = require("passport")
const googleStrategy = require("passport-google-oauth")
const GoogleStrategy = googleStrategy.OAuth2Strategy
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


//Middleware
// Agregando middleware para body parsing
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000','https://studio.apollographql.com'],
    credentials:true
}))
app.use(cookie())
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:"982539754927-1hvt50qhhbmsrivgleq3m6gstbp5na4c.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/google/callback",
    passReqToCallback:true
},(req,accessToken, refreshToken, profile, cb)=>{
    console.log(accessToken)
    console.log("REQUEST",req)
    cb(null,{profile,accessToken})
}))

graphql(app)
users(app)
products(app)
apollo(app)
auth(app)


//Ruta de ejemplo para passport
app.get("/google",passport.authenticate("google",{
    scope:['email','profile']
}))

app.get("/google/callback",passport.authenticate("google",(error,details)=>{
    console.log(error)
    console.log(details)
}),(req,res)=>{
    return res.redirect("/")
})


app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000!")
})