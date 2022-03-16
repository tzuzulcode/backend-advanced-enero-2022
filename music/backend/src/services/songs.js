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
        const genres = song.genres.map(genre=>{
            return {
                genre:{
                    connect:{
                        id:Number(genre)
                    }
                }
            }
        })
        const coauthors = song.coauthors.map(coauthor=>{
            return {
                author:{
                    connect:{
                        id:Number(coauthor)
                    }
                }
            }
        })

        if(cover){
            
            const result = await uploadFile(cover.buffer,cover.originalname)
            const newSong = await prisma.song.create({
                data:{
                    title:song.title,
                    genres:{
                        create:genres
                    },
                    author:{
                        connect:{
                            id:Number(song.author)
                        }
                    },
                    coauthors:{
                        create:coauthors
                    },
                    file:{
                        create:{
                            key:result.Key,
                            bucket:result.Bucket,
                            location:result.Location
                        }
                    }
                },
                include:{
                    author:true,
                    file:true
                }
            })

            return newSong
        }

        const newSong = await prisma.song.create({
            data:{
                title:song.title,
                genre:song.genre,
                author:{
                    connect:{
                        id:Number(song.author)
                    }
                },
                file:{
                    connect:{
                        id:Number(song.coverId)
                    }
                }
            },
            include:{
                author:true,
                file:true
            }
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