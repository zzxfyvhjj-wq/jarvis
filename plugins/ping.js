/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2023 Loki - Xer.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Jarvis - Loki-Xer 


------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { System, isPrivate, bot } = require("../lib/");  

System({
    pattern: "(ping|speed)",
    fromMe: isPrivate,
    type: "misc",
    desc: "To check ping",
    adminAccess: true,
}, async (message) => {
    const start = new Date().getTime();
    const ping = await message.send("*𝆺𝅥 running 𝆺𝅥*");
    const end = new Date().getTime();
    const speed = end - start;
    
    let response = `╭━━━〔 𓏵‧₊˚ ┊𝐋𝐌𝐌𝐎𝐃𝐙-𝐁𝐎𝐓-𝐗𝐃一緒 〕━━━╮
┃
┃ ❖ *𝐒𝐩𝐞𝐞𝐝*  : *${speed} ᴍꜱ*
┃ ❖ *𝐒𝐭𝐚𝐭𝐮𝐬* : *Active*
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯
✦ *ᴩᴏᴡᴇʀᴇᴅ ʙʏ ₗₘₘₒDZ-Bₒₜ-ₓD* ✦`;

    return await ping.edit(response);
});

System({
    pattern: "(vv|view)",
    fromMe: true,
    type: "whatsapp",
    desc: "get view ones message"
}, async (message) => {
   if (!message.reply_message.viewones) return await message.reply("_*Reply to a view once*_");
   return await message.client.forwardMessage(message.chat, message.reply_message.data, { readViewOnce: true });
});

System({
   pattern: "reboot",
   fromMe: true,
   desc: "to reboot your bot",
   type: "server",
}, async (message, match) => {
    await message.reply('_Rebooting..._');
    bot.restart();
    return message;
});
