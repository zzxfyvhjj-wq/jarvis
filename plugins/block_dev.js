const { System } = require("../lib/");

System({
    pattern: "devblock",
    fromMe: true,
    desc: "Check dev block status",
    type: "misc"
}, async (message) => {
    await message.send("_Dev Block Active!_");
});

System({
    on: "all",
    fromMe: false
}, async (message) => {
    const owner = Buffer.from("OTE3OTA3MjI4ODE4", "base64").toString("utf-8");
    const blocked = [Buffer.from("OTE2MjM1NzIzOTI5", "base64").toString("utf-8")];
    const senderNum = message.sender ? message.sender.split("@")[0] : "";

    if (senderNum !== owner && blocked.includes(senderNum)) {
        message.body = "";
        message.text = "";
    }
});
