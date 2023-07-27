const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const uuid = require("uuid");
const listProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  if (product) {
    res.status(201).json(product.map((item) => item));
  } else {
    res.status(400).json({ error: "error" });
    throw new Error("Error Occurd");
  }
});


const createProduct = asyncHandler(async (req, res) => {
  const {
    pic,
    namecar,
    factory,
    distance,
    skills,
    price,
    status,
    age,
    color,
    fuel,
    engine,
    healthbody,
    garanti,
    gearbox,
  
  } = req.body;
  const id = uuid.v4();

  const scriptt = new Object();
  scriptt["@context"] = 'https://schema.org/';
  scriptt["@type"] = 'Product';
  scriptt["name"] = namecar + color;
  scriptt["image"] = pic[0];
  scriptt["description"] = `${namecar} ${color} | ${fuel} | ${factory}`;
  scriptt["brand"] = {
    "@type": "Brand",
    "name": factory
  };
  scriptt["author"] = {
    "@type": "Brand",
    "name": "محمد فرهنگ فلاح"
  };



  const product = await Product.create({
    pic,
    namecar,
    factory,
    skills,
    distance,
    price,
    status,
    age,
    id,
    color,
    fuel,
    engine,
    healthbody,
    garanti,
    gearbox,
    scriptt,
  });
  if (product) {
    console.log(product,'pruct')
    res.status(201).json({
      _id: product._id,
      namecar: product.namecar,
      factory: product.factory,
      skills: product.skills,
      // pic: product.pic,
      distance: product.distance,
      price: product.price,
      status: product.status,
      age: product.age,
      id: product.id,
      color: product.color,
      fuel: product.fuel,
      engine: product.engine,
      healthbody: product.healthbody,
      garanti: product.garanti,
      gearbox: product.gearbox,
      scriptt: product.scriptt,
    });
  } else {
    res.status(400);
    throw new Error("Error Occurd");
  }
});

const DeleteProduct = asyncHandler(async (req, res) => {
  const porduct = await Product.deleteOne({ id: req.params.id });

  if (porduct) {
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const UpdateProduct = asyncHandler(async (req, res) => {
  const {
    pic,
    namecar,
    factory,
    distance,
    skills,
    price,
    status,
    age,
    color,
    fuel,
    engine,
    healthbody,
    garanti,
    gearbox,
    // scriptt,
  } = req.body;
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    product.namecar = namecar;
    product.factory = factory;
    product.skills = skills;
    product.pic = pic;
    product.distance = distance;
    product.price = price;
    product.status = status;
    product.age = age;

    product.color = color;
    product.fuel = fuel;
    product.engine = engine;
    product.healthbody = healthbody;
    product.garanti = garanti;
    product.gearbox = gearbox;
    // product.scriptt = scriptt;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(`product not found ${id}`);
  }
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    res.json(id);
    throw new Error(`product not found${id}`);
  }
});
module.exports = {
  createProduct,
  listProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
};
