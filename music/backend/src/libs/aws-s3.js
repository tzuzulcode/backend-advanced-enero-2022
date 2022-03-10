const AWS = require("aws-sdk")
const { aws_bucket_name } = require("../config")
const multer = require("multer")
const s3 = new AWS.S3()

function uploadFile(file,name){
    return new Promise((resolve,reject)=>{
        s3.upload({
            Bucket:aws_bucket_name,
            Key:name,
            Body:file//buffer
        },(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
    
}

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

module.exports = {uploadFile,upload}