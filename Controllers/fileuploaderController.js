'use strict'

const singleFile =require('../models/uploadeSingle')
const multipleFile = require('../models/uploadMultiple')
const fs = require('fs')
const {  s3Uploadev2multiple,s3Uploadev3 } = require('../s3Service')
const {s3Uploade,s3UploadeMuliple,s3DeleteSingle,s3DeleteMultiple} = require('../s3Service')

const singleFileUpload = async(req,res)=>{
  console.log(req.file);
  try {
    
    const result = await s3Uploade(req.file)

        const file = {
            fileName: req.file.originalname,
            filePath: result.Location,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormater(req.file.size, 2),
            fileKey: result.Key
          };
          const singlefile = new singleFile({
            title: req.body.title,
            file: file,
          });
          await singlefile.save();
      
          res.status(201).json(singlefile);
    
    
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// 
const MultipleFileUpload = async(req,res,next)=>{
    try{

      const result = await s3UploadeMuliple(req.files)
  
      let proplocation =[]
      let propkey =[]
      result.forEach((item,index)=>{
        proplocation.push(item.Location)
        propkey.push(item.Key)
      })
    
    
      
        let filesArray =[]

        req.files.forEach((item,index)=>{
         
          const file = {
              fileName: item.originalname,
              filePath: proplocation[index],
              fileType: item.mimetype,
              fileSize: fileSizeFormater(item.size, 2),
              fileKey: propkey[index]
          }

          filesArray.push(file)

        })

      

        const multiplefile = new multipleFile({
            title: req.body.title,
            file: filesArray
        })
        await multiplefile.save()
        res.status(201).json(multiplefile)
      

      }catch (error) {
        res.status(400).send(error.message);
      }
}

const deleteMultipleFile = async(req,res,next)=>{
    try{
        const {title}= req.body
        const files =  await multipleFile.find()
       
        let filter = files.filter(item=> item.title === title)
       
  
        
      
        let fileTitle = null
        filter.forEach(item=>  {
          fileTitle = item.title
            item.file.forEach(file=>{
  
              fs.unlink(file.filePath,(err)=>{
                if(err){
                  console.error(err)
                  return
                }
              })
            })
            
        })
  
       
     
  
        await multipleFile.findOneAndDelete(filter)
        res.status(201).send(`Delete File ${fileTitle} successfuly`)
        
        
  
    } catch (erorr) {
        res.status(400).send(erorr.message);
      }
  }

//   
const updateMultipleFile =async(req,res,next)=>{
    try{
      const {title,key}= req.body
     
      const resultdelete = await s3DeleteMultiple(req.files,key)
      const result = await s3UploadeMuliple(req.files)
      const files =  await multipleFile.findOne({title:title})
   
    
      let proplocation =[]
      let propkey =[]
      result.forEach((item,index)=>{
        proplocation.push(item.Location)
        propkey.push(item.key)
      })

      let filesArray = []
    
        req.files.forEach((item,index)=>{
          const file = {
              fileName: item.originalname,
              filePath: proplocation[index],
              fileType: item.mimetype,
              fileSize: fileSizeFormater(item.size, 2),
              fileKey: propkey[index]
            };
            filesArray.push(file)

        })
     

      if(files){
        files.title=  req.body.title,
        files.file= filesArray
  
        const updateFiles=await files.save()
        res.status(201).json(updateFiles)
      }
    
    }catch (erorr) {
      res.status(400).send(erorr.message);
    }
  }
  
  const updateSingleFile =async(req,res,next)=>{
    try{
      const {title,key}= req.body
      const resultdelete = await s3DeleteSingle(req.file,key)
      const result = await s3Uploade(req.file)
      const files =  await singleFile.findOne({title:title})
  
       const  file = {
          fileName:  req.file.originalname,
          filePath:  result.Location,
          fileType:  req.file.mimetype,
          fileSize: fileSizeFormater( req.file.size, 2),
          fileKey: result.Key
        };

      // if(files){
        files.title=  req.body.title,
        files.file= file

  
        await files.save()
        res.status(201).json(files)

      // }
      // }
    }catch (erorr) {
      res.status(400).send(erorr.message);
    }
  }


const fileSizeFormater = (bytes,decimal)=>{
    if(bytes === 0){
        return '0 Bytes'
    }

    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index= Math.floor(Math.log(bytes) / Math.log(1000))
    return(
        parseFloat((bytes / Math.pow(1000,index)).toFixed(dm)) + ' ' + sizes[index]

    )
    
}

module.exports = {
    singleFileUpload,MultipleFileUpload,deleteMultipleFile,updateMultipleFile,updateSingleFile
}