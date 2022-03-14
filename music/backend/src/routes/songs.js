const express = require("express")
const { upload } = require("../middleware/upload")
const SongService = require("../services/songs")
const {uploadFile} = require("../libs/aws-s3")

function songs(app){
    const router = express.Router()
    app.use("/songs",router)

    const songService = new SongService()


    router.get("/",async (req,res)=>{
        const songs = await songService.getAll()
        return res.json(songs)
    })
    router.post("/",upload.single("img"),async (req,res)=>{
        const song = await songService.create(req.body,req.file)
        return res.json(song)
    })
    router.post("/caratula",upload.single("img"),async (req,res)=>{
        const result = await uploadFile(req.file.buffer,req.file.originalname)
        console.log(result)
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