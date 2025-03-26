require("dotenv").config();

const config = {
    PORT: process.env.PORT || 8000,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

module.exports = config;
