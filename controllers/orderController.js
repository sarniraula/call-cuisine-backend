const { formatOrder } = require("../utils/openaiService");
const { compareWithMenu } = require("../utils/menuService");
const Order = require("../models/Order");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const { generateTestOrder } = require("../utils/testOrderGenerator"); // Utility function for test orders


let finalOrder = {}; // Store latest order

const processOrder = async (req, res) => {
    try {
        console.log("Raw Order:", req.session.orderString);

        // AI-enhanced order formatting
        const structuredOrder = await formatOrder(req.session.orderString);
        if (!structuredOrder) return res.status(500).send("OpenAI failed to process order.");

        // Compare with menu data
        finalOrder = { items: compareWithMenu(structuredOrder) };
        console.log("Processed Order:", finalOrder);

        // Generate Unique Order ID
        const orderId = `ORD-${Date.now()}`;

        // Calculate Total Price
        let totalPrice = 0;
        finalOrder.items.forEach((item) => {
            if (item.price) totalPrice += item.price * item.quantity;
        });

        // Save to MongoDB
        const newOrder = new Order({
            orderId,
            items: finalOrder.items,
            totalPrice
        });

        await newOrder.save();
        console.log("Order Saved to Database");

        // Emit WebSocket event
        io.emit("new_order", newOrder);

        // Twilio Response
        const twiml = new VoiceResponse();
        twiml.say(`Your order is being processed. Thank you for ordering with us!`);
        req.session.destroy();

        res.type("text/xml");
        res.send(twiml.toString());
    } catch (error) {
        console.error("Error Processing Order:", error);
        res.status(500).send("Failed to process order.");
    }
};

// API to fetch the latest order
const getFinalOrder = (req, res) => {
    res.json(finalOrder);
};

const testOrder = async (req, res) => {
    try {
        const testOrder = generateTestOrder(); // Generate a test order
        const newOrder = new Order(testOrder); // Create a new Order object
        await newOrder.save(); // Save to DB

        //Emit WebSocket event
        io.emit("new_order", newOrder);

        console.log("Test Order Created:", newOrder);
        res.json({ success: true, message: "Test order generated!", order: newOrder });
    } catch (error) {
        console.error("Error generating test order:", error);
        res.status(500).json({ success: false, message: "Failed to generate test order" });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Emit WebSocket event to notify frontend
        // io.emit("order_deleted", id);

        console.log("Order Deleted:", deletedOrder);
        res.json({ success: true, message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Failed to delete order" });
    }
}

module.exports = { processOrder, getFinalOrder, testOrder, deleteOrder };
