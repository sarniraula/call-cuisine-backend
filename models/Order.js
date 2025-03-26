const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
            available: Boolean,
            not_in_stock: Boolean
        }
    ],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
