const express = require("express")
const { upload } = require("../middleware/upload")
const SongService = require("../services/songs")

function songs(app){
    const router = express.Router()
    app.use("/songs",router)

    const songService = new SongService()


    router.get("/",async (req,res)=>{
        const songs = await songService.getAll()
        return res.json(songs)
    })
    router.get("/audio/:id",async (req,res)=>{
        const song = await songService.getAudio(req.params.id)
        return res.end(song.Body)
    })
    router.post("/",async (req,res)=>{
        const song = await songService.create(req.body)
        return res.json(song)
    })

    router.post("/uploadAudio/:id",upload.single("audio"),async (req,res)=>{
        const id = Number.parseInt(req.params.id)
        const song = await songService.uploadAudio(id,req.file.buffer,req.file.originalname)
        return res.json(song)
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