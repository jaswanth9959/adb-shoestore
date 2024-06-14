import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import users from "./data/customers.js";
import shoes from "./data/shoes.js";
import staff from "./data/staff.js";
import category from "./data/category.js";
import Customer from "./models/customer.js";
import Shoe from "./models/shoe.js";
import Category from "./models/category.js";
import Staff from "./models/staff.js";
dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Customer.deleteMany();
    await Shoe.deleteMany();
    await Category.deleteMany();
    await Staff.deleteMany();
    const createdCategories = await Category.insertMany(category);
    await Customer.insertMany(users);
    const createdStaff = await Staff.insertMany(staff);
    const adminStaff = createdStaff[0]._id;

    const sampleShoes = shoes.map((shoe) => {
      return {
        ...shoe,
        createdBy: adminStaff,
        category: createdCategories[0]._id,
      };
    });

    await Shoe.insertMany(sampleShoes);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Customer.deleteMany();
    await Shoe.deleteMany();
    await Category.deleteMany();
    await Staff.deleteMany();
    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
