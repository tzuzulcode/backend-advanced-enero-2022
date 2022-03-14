const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {uploadFile} = require("../libs/aws-s3")


class Songs{
    async getAll(){
        const songs = await prisma.song.findMany({
            include:{
                author:true
            }
        })
        return songs
    }
    async create(song,cover){
        await uploadFile(cover.buffer,cover.originalname)
        
        const newSong = await prisma.song.create({
            data:song
        })

        return newSong
    }

    async update(id,data){
        const updated = await prisma.song.update({
            where:{
                id
            },
            data
        })

        return updated
    }

    async delete(id){
        const deleted = await prisma.song.delete({
            where:{
                id
            }
        })

        return deleted
    }
}

module.exports = Songs