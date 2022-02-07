const { port, oauthClientID, oauthClientSecret, oauthCallbackURL } = require("./config")
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
    clientID:oauthClientID,
    clientSecret:oauthClientSecret,
    callbackURL:oauthCallbackURL,
    passReqToCallback:true
},(req,accessToken, refreshToken, profile, cb)=>{
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

// app.get("/google/callback",passport.authenticate("google"),(req,res)=>{
//     return res.json({message:"Hola"})
// })
app.get("/google/callback",(req,res)=>{
    return passport.authenticate("google",(error,data)=>{
        return res.json({message:"Hola",data})
    })(req,res) // asegurandonos que res y req esten en el scope
})

// Reto: Pasar Passport hacia las rutas e integrarlo a los servicios

app.get('/',(req,res)=>{
    return res.send("Hola, bienvenido. Cambios")
})

app.listen(port,()=>{
    console.log("Listening on port 4000!")
})