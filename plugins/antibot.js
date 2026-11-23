const { System } = require("../lib/");
const { isAdmin, isBotAdmins } = require("./client/");

let antibotGroups = {};

System({
    pattern: "myantibot",
    fromMe: true,
    type: "group",
    onlyGroup: true,
    desc: "Antibot that ignores group admins"
}, async (message, match) => {
    if (!match) return await message.reply("*Usage:* `.myantibot on` or `.myantibot off`");
    
    if (match.toLowerCase() === "on") {
        antibotGroups[message.jid] = true;
        return await message.reply("_*Custom Antibot Activated! (Group Admins are ignored)*_");
    } else if (match.toLowerCase() === "off") {
        antibotGroups[message.jid] = false;
        return await message.reply("_*Custom Antibot Deactivated!*_");
    }
});

System({
    on: "text",
    fromMe: false,
    onlyGroup: true
}, async (message) => {
    if (!antibotGroups[message.jid]) return;
    if (message.key.fromMe) return; // സ്വന്തം ബോട്ടിന്റെ മെസ്സേജുകൾ ഒഴിവാക്കുന്നു

    const botAdmin = await isBotAdmins(message);
    if (!botAdmin) return;

    const senderAdmin = await isAdmin(message, message.sender);
    if (senderAdmin) return; // ഗ്രൂപ്പ് അഡ്മിൻമാരെ ഒഴിവാക്കുന്നു

    // യഥാർത്ഥ ബോട്ടുകളുടെ (Baileys/WhatsApp Web) മെസ്സേജ് ഐഡികൾ മാത്രം തിരിച്ചറിയുന്നു
    const msgId = message.id || "";
    const isBotMsg = msgId.startsWith("BAE5") || msgId.startsWith("3EB0");

    if (isBotMsg) {
        await message.client.sendMessage(message.jid, { delete: message.key });
        await message.send(`_@${message.sender.split("@")[0]} Bots are not allowed for members!_`, {
            mentions: [message.sender]
        });
    }
});
