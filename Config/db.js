const mongoose = require('mongoose')
const ConnetDb = async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log('succes to mongo')
    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = ConnetDb