const express = require("express")
const AuthorService = require("../services/author")

function authors(app){
    const router = express.Router()
    app.use("/authors",router)

    const authorService = new AuthorService()


    router.get("/",async (req,res)=>{
        const songs = await authorService.getAll()
        return res.json(songs)
    })
    // router.post("/",async (req,res)=>{
    //     console.log(req.body)
    //     const song = await songService.create(req.body)
    //     return res.json(song)
    // })
}

module.exports = authors