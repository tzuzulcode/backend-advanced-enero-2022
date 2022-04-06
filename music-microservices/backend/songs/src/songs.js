const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { uploadFile, downloadFile } = require("./libs/aws-s3")


class Songs {

  async getAudio(id) {
    const song = await prisma.song.findUnique({
      where: {
        id: Number.parseInt(id)
      },
      include: {
        file: true
      }
    })

    const audio = downloadFile(song.file.key)

    return audio
  }

  async getAll() {
    const songs = await prisma.song.findMany({
      include: {
        file: true
      }
    })
    return songs
  }

  async uploadAudio(id, file, fileName) {
    const uploaded = await uploadFile(file, fileName)
    const updated = await this.update(id, {
      file: {
        create: {
          key: uploaded.Key,
          bucket: uploaded.Bucket,
          location: uploaded.Location
        }
      }
    })


    return updated
  }

  async create(song) {

    const newSong = await prisma.song.create({
      data: {
        title: song.title,
      },
      include: {
        file: true
      }
    })

    return newSong
  }

  async update(id, data) {
    const updated = await prisma.song.update({
      where: {
        id
      },
      data
    })

    return updated
  }

  async delete(id) {
    const deleted = await prisma.song.delete({
      where: {
        id
      }
    })

    return deleted
  }
}

module.exports = Songs