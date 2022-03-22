const express = require("express")
const {Readable} = require("stream")
const { downloadFile } = require("../libs/aws-mediaStore")
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
    router.get("/testAudio",async (req,res)=>{
        const song = await downloadFile()

        const readableStream = new Readable()
        
        readableStream._read = ()=>{}
        readableStream.push(song.Body)
        readableStream.push(null)

        const parts = req.headers?.range?.replace(/bytes=/,"").split("-") ?? ['0','']
        const start = parseInt(parts[0])
        const end = parts[1] ? parseInt(parts[1]): readableStream.readableLength - 1

        const size = readableStream.readableLength
        const chunksize = end-start +1

        res.writeHead(206,{
            "Content-Lenght":size,
            "Accept-Ranges":"bytes",
            "Content-Range":`bytes ${0}-${size-1}/${size}`
        })

        readableStream.pipe(res)



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