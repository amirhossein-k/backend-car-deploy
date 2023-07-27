const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = {
  namecar: {
    type: String,
    required: true,
  },
  factory: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  pic: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  age:{
    type:String,
    required:true
  },
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  color: {
    type:String,
    required:true
  },
  fuel:{
    type:String,
    required:true
  },
  engine:{
    type:String,
    required:true
  },
  healthbody:{
    type:String,
    required:true
  },
  garanti:{
    type:String,
    required:true
  },
  gearbox:{
    type:String,
    required:true
  },
  scriptt:{
    type:Object,
    required:false,
    
  }
};


const Product = mongoose.model("product", productSchema);
module.exports = Product;
