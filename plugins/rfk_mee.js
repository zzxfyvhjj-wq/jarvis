const { System, isPrivate } = require("../lib/");

System({
    pattern: "mee",
    fromMe: isPrivate,
    type: "group",
    desc: "Tag yourself",
}, async (message) => {
    return await message.send(`@${message.sender.split("@")[0]}`, {
        mentions: [message.sender]
    });
});
