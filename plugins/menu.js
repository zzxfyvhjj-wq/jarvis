const { System, isPrivate, commands } = require("../lib/");

System({
    pattern: "menu|m|list",
    fromMe: isPrivate,
    type: "main",
    desc: "Custom RFK Menu",
}, async (message) => {
    let menuText = `╭━━━〔 ☭ 𝐑𝐅𝐊 𝐁𝐎𝐓 ☭ 〕━━━╮\n`;
    menuText += `┃ ☭ *𝐔𝐬𝐞𝐫 :* @${message.sender.split("@")[0]}\n`;
    menuText += `┃ ☭ *𝐁𝐨𝐭 :* 𝐑𝐅𝐊 𝐁𝐎𝐓\n`;
    menuText += `╰━━━━━━━━━━━━━━━━━━╯\n\n`;

    let cmdList = commands
        .filter((cmd) => cmd.pattern && !cmd.dontAddCommandList)
        .map((cmd) => {
            let pat = cmd.pattern.source || cmd.pattern.toString();
            return pat.replace(/^\^|\$$/g, "").split("|")[0].replace(/[^a-zA-Z0-9]/g, "");
        })
        .filter((name) => name.length > 0);

    [...new Set(cmdList)].sort().forEach((cmd) => {
        menuText += `☭ .${cmd}\n`;
    });

    menuText += `\n╰━━━〔 ☭ 𝐑𝐅𝐊 𝐌𝐎𝐃𝐒 ☭ 〕━━━╯`;

    return await message.send(menuText, {
        mentions: [message.sender]
    });
});
