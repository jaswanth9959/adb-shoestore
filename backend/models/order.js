import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        size: { type: Number, required: true },
        brand: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String },
        shoe: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Shoe",
        },
      },
    ],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Yet to Process",
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    isWarranty: {
      type: Boolean,
    },
    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
