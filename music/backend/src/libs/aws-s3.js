const path = require("path")
const AWS = require("aws-sdk")
const { aws_bucket_name } = require("../config")
const s3 = new AWS.S3()
const uuid = require("uuid")

function uploadFile(file,name){
    const ext = path.extname(name)
    const Key = uuid.v4()+ext
    return new Promise((resolve,reject)=>{
        s3.upload({
            Bucket:aws_bucket_name,
            Key,
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

module.exports = {uploadFile}