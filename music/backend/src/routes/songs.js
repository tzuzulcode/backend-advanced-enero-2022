const express = require("express")
const { upload } = require("../libs/aws-s3")
const SongService = require("../services/songs")

function songs(app){
    const router = express.Router()
    app.use("/songs",router)

    const songService = new SongService()


    router.get("/",async (req,res)=>{
        const songs = await songService.getAll()
        return res.json(songs)
    })
    router.post("/",async (req,res)=>{
        console.log(req.body)
        const song = await songService.create(req.body)
        return res.json(song)
    })
    router.post("/caratula",upload.single("img"),async (req,res)=>{
        console.log(req.file)
        console.log(req.body)
        return res.json({"success":true})
    })
    router.put("/:id",async (req,res)=>{
        const id = Number.parseInt(req.params.id)
        const song = await songService.update(id,req.body)
        return res.json(song)
    })
    router.delete("/:id",async (req,res)=>{
        const id = Number.parseInt(req.params.id)
        const song = await songService.delete(id)
        return res.json(song)
    })
}

module.exports = songs