const { System } = require("../lib/");
const { isAdmin, isBotAdmins } = require("./client/");
const config = require("../config");

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
    if (message.key.fromMe) return;

    // 1. ബോട്ട് ഓണറുടെയും SUDO ലിസ്റ്റിലുള്ളവരുടെയും നമ്പറുകൾ ഒഴിവാക്കുന്നു
    const senderNum = message.sender.split("@")[0].split(":")[0];
    const sudoList = (config.SUDO || "").split(",");
    if (sudoList.includes(senderNum) || message.isSudo) return;

    // 2. ബോട്ട് അഡ്മിൻ ആണോ എന്ന് പരിശോധിക്കുന്നു
    const botAdmin = await isBotAdmins(message);
    if (!botAdmin) return;

    // 3. ഗ്രൂപ്പ് അഡ്മിൻ ആണോ എന്ന് പരിശോധിക്കുന്നു (JID & LID സപ്പോർട്ടോടെ)
    const groupMetadata = await message.client.groupMetadata(message.jid);
    const participants = groupMetadata.participants || [];
    const adminIds = participants
        .filter(p => p.admin === "admin" || p.admin === "superadmin")
        .map(p => p.id.split("@")[0].split(":")[0]);

    if (adminIds.includes(senderNum)) return;

    // 4. ബോട്ടുകളുടെ മെസ്സേജ് ഐഡി തിരിച്ചറിയുന്നു
    const msgId = message.id || "";
    const isBotMsg = msgId.startsWith("BAE5") || msgId.startsWith("3EB0");

    if (isBotMsg) {
        await message.client.sendMessage(message.jid, { delete: message.key });
        await message.send(`_@${senderNum} Bots are not allowed for members!_`, {
            mentions: [message.sender]
        });
    }
});
