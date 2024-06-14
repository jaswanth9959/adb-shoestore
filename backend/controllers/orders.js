import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/order.js";
import Payment from "../models/payment.js";
import Shoe from "../models/shoe.js";
import Review from "../models/review.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    customerId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    email,
    cardNumber,
    isWarranty,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }
  const payment = new Payment({ email, cardNumber });
  const createdPayment = await payment.save();

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      shoe: x.id,
      _id: undefined,
    })),
    customer: customerId,
    isPaid: true,
    paymentID: createdPayment._id,
    paidAt: Date.now(),

    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isWarranty,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.params.id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "customer deliveredBy"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { id, status, update_time, email_address } = req.body;

  const payment = new Payment({ id, status, update_time, email_address });
  const createdPayment = await payment.save();

  if (order) {
    order.isPaid = true;
    order.paymentID = createdPayment._id;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("customer");
  res.status(200).json(orders);
});

const getReadyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    orderStatus: { $in: ["Ready", "Out for Delivery"] },
  }).populate("customer");
  res.status(200).json(orders);
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.orderStatus === "Yet to Process") {
      order.orderStatus = "Ready";
    } else if (order.orderStatus === "Ready") {
      order.orderStatus = "Out for Delivery";
    } else {
      order.orderStatus = "Delivered";
      order.deliveredAt = Date.now();
      order.deliveredBy = req.body.userId;
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const deliveredByMe = asyncHandler(async (req, res) => {
  const orders = await Order.find({ deliveredBy: req.params.id }).populate(
    "customer deliveredBy"
  );
  res.status(200).json(orders);
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, name } = req.body;

  const shoe = await Shoe.findById(req.params.id);

  if (shoe) {
    const alreadyReviewed = shoe.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Shoe already reviewed");
    }

    const review = {
      name: name,
      rating: Number(rating),
      comment,
      user: userId,
    };

    shoe.reviews.push(review);

    const rev = new Review({ ...review, shoe: req.params.id });
    await rev.save();

    shoe.numReviews = shoe.reviews.length;

    shoe.rating =
      shoe.reviews.reduce((acc, item) => item.rating + acc, 0) /
      shoe.reviews.length;

    await shoe.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("shoe not found");
  }
});

export {
  addOrderItems,
  deliveredByMe,
  getMyOrders,
  getOrderById,
  getReadyOrders,
  updateOrderStatus,
  getAllOrders,
  createReview,
};
