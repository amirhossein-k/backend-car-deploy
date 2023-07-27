
const multer  = require('multer')
const  multerS3 = require('multer-s3');
const  AWS = require('aws-sdk');
const fs = require("fs");


const BUCKET = process.env.LIARA_BUCKET_NAME


const config ={
    endpoint: process.env.LIARA_ENDPOINT,
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
        region: process.env.REGION
    }
    
    const S3 = new AWS.S3(config)






const storage = multer.memoryStorage()
const upload =multer({
    storage,
    fileFilter:  (req, file, cb) => {
            if (
              file.mimetype === "image/png" ||
              file.mimetype === "image/jpg" ||
              file.mimetype === "image/jpeg" ||
              file.mimetype === "video/mp4" 
              
            ) {
              cb(null, true);
            } else {
              cb(null, false);
            }
          },
          
})

// const upload = multer({storage:storage,fileFilter:filefilter})

module.exports = {upload}