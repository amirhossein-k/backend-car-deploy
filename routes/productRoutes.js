const express = require("express");
const {
  createProduct,
  listProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
} = require("../Controllers/productControlers");
const router = express.Router();

router.route("/newproduct").post(createProduct);
router.route("/list").get(listProduct);
router.route("/:id").get(getProduct);
router.route("/:id").delete(DeleteProduct);
router.route("/:id").put(UpdateProduct);

module.exports = router;
