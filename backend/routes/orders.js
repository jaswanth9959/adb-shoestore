import express from "express";
const router = express.Router();
import {
  getMyOrders,
  getOrderById,
  addOrderItems,
  getAllOrders,
  updateOrderStatus,
  getReadyOrders,
  deliveredByMe,
} from "../controllers/orders.js";
router.route("/").post(addOrderItems).get(getAllOrders);
router.route("/ready").get(getReadyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/update").put(updateOrderStatus);
router.route("/mine/:id").get(getMyOrders);
router.route("/delivered/:id").get(deliveredByMe);
export default router;
