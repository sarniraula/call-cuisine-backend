const express = require("express");
const { 
    getFinalOrder, 
    getPendingOrders, 
    updateOrderStatus, 
    getDailyOrderStats, 
    testOrder, 
    deleteOrder, 
    deleteAll
} = require("../controllers/orderController");

const router = express.Router();

router.get("/final_order", getFinalOrder);

router.get("/pending-orders", getPendingOrders);

router.put("/update-order/:orderId", updateOrderStatus);

router.get("/daily-stats", getDailyOrderStats);

router.get("/test-order", testOrder);

router.delete("/order/:id", deleteOrder);

router.delete("/delete-all", deleteAll);

module.exports = router;