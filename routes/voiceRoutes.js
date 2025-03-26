const express = require("express");
const { handleVoiceInput } = require("../controllers/voiceController");

const router = express.Router();

router.post("/voice", handleVoiceInput);

module.exports = router;
