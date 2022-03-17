const express = require("express")
const cors = require("cors")
const { port, env } = require("./config")

//Routes import:
const songs = require("./routes/songs")
const authors = require("./routes/authors")

const app = express()

app.use(cors({
    origin:["http://localhost:5500"]
}))
app.use(express.json())

songs(app)
authors(app)

app.get("/",(req,res)=>{
    return res.json({hola:"mundo"})
})


app.listen(port,()=>{
    console.log("Modo:",env)
    console.log("Listening... http://localhost:"+port)
})

