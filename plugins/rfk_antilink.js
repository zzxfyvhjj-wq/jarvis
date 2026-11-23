const { System, isPrivate } = require("../lib/");

let antiLinkGroups = {};

System({
    pattern: "rfklink ?(.*)",
    fromMe: isPrivate,
    type: "group",
    desc: "Custom Anti-Link (Admins ignored)",
    adminAccess: true,
}, async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command is only for groups._");
    
    const action = match ? match.trim().toLowerCase() : "";
    
    if (action === "on") {
        antiLinkGroups[message.chat] = true;
        return await message.reply("*☇ʳᶠᵏᵐᵒᵈˢ-ᵇᵒᵗ-ᵐᵈ☁ :* *Anti-Link Activated!* ✅\n_(Group Admins will not be removed)_");
    } else if (action === "off") {
        delete antiLinkGroups[message.chat];
        return await message.reply("*☇ʳᶠᵏᵐᵒᵈˢ-ᵇᵒᵗ-ᵐᵈ☁ :* *Anti-Link Deactivated!* ❌");
    } else {
        return await message.reply("*Usage:*\n• `.rfklink on` - Enable\n• `.rfklink off` - Disable");
    }
});

System({
    on: "text",
    fromMe: false,
}, async (message) => {
    if (!message.isGroup) return;
    if (!antiLinkGroups[message.chat]) return;

    const text = message.text || "";
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|chat\.whatsapp\.com\/[^\s]+)/gi;
    
    if (!urlRegex.test(text)) return;

    const groupMetadata = await message.client.groupMetadata(message.chat);
    const participants = groupMetadata.participants || [];
    const botId = message.client.user.id.split(":")[0] + "@s.whatsapp.net";
    
    const senderInfo = participants.find(p => p.id === message.sender);
    const botInfo = participants.find(p => p.id === botId);

    const isSenderAdmin = senderInfo && (senderInfo.admin === "admin" || senderInfo.admin === "superadmin");
    const isBotAdmin = botInfo && (botInfo.admin === "admin" || botInfo.admin === "superadmin");

    if (isSenderAdmin || message.fromMe) return;

    if (!isBotAdmin) return;

    await message.client.sendMessage(message.chat, { delete: message.key });
    await message.send(`*☇ʳᶠᵏᵐᵒᵈˢ-ᵇᵒᵗ-ᵐᵈ☁ :* @${message.sender.split("@")[0]} *Links are not allowed here!* 🚫`, {
        mentions: [message.sender]
    });
    await message.client.groupParticipantsUpdate(message.chat, [message.sender], "remove");
});
