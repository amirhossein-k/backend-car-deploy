const mongoose = require("mongoose");

const DetailSchema = {
  header_img: {
    type: String,
    required: false,
  },
  profile_img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  slider_img: {
    type: [String],
    required: false,
  },
  times_1: {
    type: String,
    required: true,
  },
  times_2: {
    type: String,
    required: true,
  },
  times_3: {
    type: String,
    required: true,
  },
  social_phone: {
    type: String,
    required: true,
  },
  social_address: {
    type: String,
    required: true,
  },
  social_ig: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
};
const Detail = mongoose.model("detail", DetailSchema);
module.exports = Detail;
