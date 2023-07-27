const express = require("express");
const {
  createDetail,
  getDetail,
  updateDetail,
} = require("../Controllers/detailControlers");
const router = express.Router();

router.route("/").get(getDetail);
router.route("/").post(createDetail);
router.route("/").put(updateDetail);

module.exports = router;
