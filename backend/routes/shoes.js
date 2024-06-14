import express from "express";
const router = express.Router();

import {
  createShoe,
  getShoeById,
  getShoes,
  updateShoe,
} from "../controllers/shoes.js";
import { createReview } from "../controllers/orders.js";

router.route("/").get(getShoes).post(createShoe);
router.route("/:id").get(getShoeById).put(updateShoe);
router.route("/:id/reviews").post(createReview);
export default router;
