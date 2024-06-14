import asyncHandler from "../middlewares/asyncHandler.js";
import Shoe from "../models/shoe.js";
import Category from "../models/category.js";
const getShoes = asyncHandler(async (req, res) => {
  const shoes = await Shoe.find({}).populate("category");
  res.json(shoes);
});

const getShoeById = asyncHandler(async (req, res) => {
  const shoe = await Shoe.findById(req.params.id).populate("category");
  res.json(shoe);
});

const createShoe = asyncHandler(async (req, res) => {
  const {
    userId,
    name,
    category,
    brand,
    stock,
    image,
    description,
    sizeOptions,
    price,
    gender,
    color,
  } = req.body;
  const item = new Shoe({
    createdBy: userId,
    name,
    category,
    brand,
    stock,
    image,
    description,
    sizeOptions,
    price,
    gender,
    color,
  });
  try {
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.log(error);
  }
});

const updateShoe = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    stock,
    image,
    description,
    sizeOptions,
    price,
    gender,
    color,
  } = req.body;

  const item = await Shoe.findById(req.params.id);

  if (item) {
    item.name = name;
    item.price = price;
    item.description = description;
    item.sizeOptions = sizeOptions;
    item.image = image;
    item.category = category;
    item.color = color;
    item.brand = brand;
    item.stock = stock;
    item.gender = gender;
    const updateditem = await item.save();
    res.json(updateditem);
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});

export { getShoes, getShoeById, createShoe, updateShoe };
