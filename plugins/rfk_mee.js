const { System, isPrivate } = require("../lib/");

System({
    pattern: "mee",
    fromMe: isPrivate,
    type: "group",
    desc: "Tag yourself with audio",
}, async (message) => {
    const mediaUrl = "https://lokixer.onrender.com/file/jxzvgrgsdbgxf.mp4";

    await message.send(`@${message.sender.split("@")[0]}`, {
        mentions: [message.sender]
    });

    return await message.client.sendMessage(message.chat, {
        audio: { url: mediaUrl },
        mimetype: "audio/mp4",
        ptt: true
    }, { quoted: message });
});
