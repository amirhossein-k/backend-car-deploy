const mongoose = require('mongoose')

const Schema = mongoose.Schema

const uploadMultiple = new Schema({
    title:{
        type:String,
        required: true
    },
    file:{
        type: [Object],
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('multipleFile',uploadMultiple)