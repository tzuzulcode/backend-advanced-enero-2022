const AWS = require("aws-sdk")
const mediaStore = new AWS.MediaStoreData({
    endpoint:"https://v2wejok6zlhnys.data.mediastore.us-west-2.amazonaws.com",
    region:"us-west-2"
})

// function uploadFile(file,name){
//     const ext = path.extname(name)
//     const Key = uuid.v4()+ext
//     return new Promise((resolve,reject)=>{
//         s3.upload({
//             Bucket:aws_bucket_name,
//             Key,
//             Body:file//buffer
//         },(err,data)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 resolve(data)
//             }
//         })
//     })
    
// }

function downloadFile(){
    return new Promise((resolve,reject)=>{
        mediaStore.getObject({
            Path:"song/Duumu_For_Her.mp3"
        },(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

module.exports = {downloadFile}