const { processOrder } = require("./orderController");
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const handleVoiceInput = async (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult;

    if (!req.session.memory) req.session.memory = {};

    console.log("User Speech:", userSpeech);

    if (!req.session.memory.firstOrder) {
        if (userSpeech) {
            req.session.memory.firstOrder = userSpeech;
            req.session.orderString = userSpeech;

            const gather = twiml.gather({ input: "speech", method: "POST", action: "/voice" });
            gather.say("Anything else?");
        } else {
            const gather = twiml.gather({ input: "speech", method: "POST", action: "/voice" });
            gather.say("Hi, welcome to Neilgrease. Would you like to order anything?");
        }
    } else if (!req.session.memory.secondOrder) {
        if (userSpeech) {
            req.session.memory.secondOrder = userSpeech;
            req.session.orderString += " and " + userSpeech;

            return processOrder(req, res);
        } else {
            const gather = twiml.gather({ input: "speech", method: "POST", action: "/voice" });
            gather.say("Anything else?");
        }
    }

    res.type("text/xml");
    res.send(twiml.toString());
};

module.exports = { handleVoiceInput };
