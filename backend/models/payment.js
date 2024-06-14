import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    status: { type: String },
    cardNumber: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
