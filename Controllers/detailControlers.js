const asyncHandler = require("express-async-handler");
const Detail = require("../models/detailModel");
const uuid = require("uuid");
const createDetail = asyncHandler(async (req, res) => {
  const {
    header_img,
    profile_img,
    title,
    subtitle,
    slider_img,
    times_1,
    times_2,
    times_3,
    social_phone,
    social_address,
    social_ig,
  } = req.body;
  const id = uuid.v4();
  const detail = await Detail.create({
    header_img,
    profile_img,
    title,
    subtitle,
    slider_img,
    times_1,
    times_2,
    times_3,
    social_phone,
    social_address,
    social_ig,
    id,
  });
  if (detail) {
    res.status(201).json({
      _id: detail._id,
      header_img: detail.header_img,
      profile_img: detail.profile_img,
      title: detail.title,
      subtitle: detail.subtitle,
      slider_img: detail.slider_img,
      times_1: detail.times_1,
      times_2: detail.times_2,
      times_3: detail.times_3,
      social_phone: detail.social_phone,
      social_address: detail.social_address,
      social_ig: detail.social_ig,
      id: detail.id,
    });
  } else {
    res.status(400);
    throw new Error("Error Occurd");
  }
});
const updateDetail = asyncHandler(async (req, res) => {
  const {
    header_img,
    profile_img,
    title,
    subtitle,
    slider_img,
    times_1,
    times_2,
    times_3,
    social_phone,
    social_address,
    social_ig,
    id,
  } = req.body;

  const detail = await Detail.findOne({ id: id });

  if (detail) {
    detail.header_img = header_img;
    detail.profile_img = profile_img;
    detail.title = title;
    detail.subtitle = subtitle;
    detail.slider_img = slider_img;
    detail.times_1 = times_1;
    detail.times_2 = times_2;
    detail.times_3 = times_3;
    detail.social_phone = social_phone;
    detail.social_address = social_address;
    detail.social_ig = social_ig;

    const updatedDetail = await detail.save();
    res.json(updatedDetail);
  } else {
    res.status(404);
    throw new Error(`product not found ${id}`);
  }
});
const getDetail = asyncHandler(async (req, res) => {
  const detail = await Detail.findOne();
  if (detail) {
    res.status(201).json(detail);
  } else {
    res.status(400).json({ error: "error" });
    throw new Error("not found");
  }
});

module.exports = {
  createDetail,
  getDetail,
  updateDetail,
};
