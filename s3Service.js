
const dotenv = require("dotenv");
dotenv.config();
const  multerS3 = require('multer-s3');
const multer  = require('multer')

const  aws = require('aws-sdk');


const config = {
    endpoint: process.env.LIARA_ENDPOINT,
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    region: process.env.REGION,
  };
  
  const BUCKET = process.env.LIARA_BUCKET_NAME;
  
  const S3 = new aws.S3(config);




const s3Uploade =async(file)=>{
    const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: `${Date.now().toString() + file.originalname}`,
        Body: file.buffer,
      };
      return await S3.upload(params).promise()
}
// multiple upload
const s3UploadeMuliple =async(files)=>{
 
    const params = files.map(file=>{

        return{
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: `${Date.now().toString() + file.originalname}`,
            Body: file.buffer,
        }
    })

    return await Promise.all(params.map(param=>S3.upload(param).promise()))
   
}
// delete single
const s3DeleteSingle =async(file,key)=>{

    const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: key,
       
      };
      return await S3.deleteObject(params).promise()
   
}
// delete multiple
const s3DeleteMultiple =async(files,key)=>{
    const params = files.map((file,index)=>{

        return{
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: key[index],
          
        }
    })

    return await Promise.all(params.map(param=>S3.deleteObject(param).promise()))

 
     
   
}

module.exports = {s3Uploade,s3UploadeMuliple,s3DeleteSingle,s3DeleteMultiple}