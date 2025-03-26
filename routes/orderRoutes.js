const express = require("express");
const { getFinalOrder, testOrder, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.get("/final_order", getFinalOrder);

router.get("/test-order", testOrder);

router.delete("/order/:id", deleteOrder);

module.exports = router;
