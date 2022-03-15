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
    router.post("/",upload.single("cover"),async (req,res)=>{
        const song = await songService.create(req.body,req.file)
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