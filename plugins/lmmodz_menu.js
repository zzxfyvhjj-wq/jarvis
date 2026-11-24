const { System, commands, config } = require("../lib/");

System({
    pattern: "menu",
    fromMe: true,
    desc: "Custom LMMODZ Cyber Menu",
    type: "user"
}, async (message) => {
    const mediaUrl = config.BOT_INFO ? config.BOT_INFO.split(";")[2] : "";
    const pushName = message.pushName || "User";

    let menuText = `▀▄▀▄▀▄ 𝐋𝐌𝐌𝐎𝐃𝐙-𝐁𝐎𝐓-𝐗𝐃 ▄▀▄▀▄▀\n`;
    menuText += `      𓏵‧₊˚ ┊一緒 ₗₘₘₒDZ-Bₒₜ-ₓD\n\n`;
    menuText += `┌──〔 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎 〕──┐\n`;
    menuText += `│ ⚡ 𝐁𝐨𝐭    : 𝐋𝐌𝐌𝐎𝐃𝐙-𝐗𝐃\n`;
    menuText += `│ ⚡ 𝐃𝐞𝐯    : 𝐑𝐅𝐊 𝐌𝐎𝐃𝐙\n`;
    menuText += `│ ⚡ 𝐔𝐬𝐞𝐫   : ${pushName}\n`;
    menuText += `│ ⚡ 𝐒𝐭𝐚𝐭𝐮𝐬 : 𝐎𝐧𝐥𝐢𝐧𝐞 🟢\n`;
    menuText += `│ ⚡ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬: ${commands.length}\n`;
    menuText += `└────────────────────┘\n\n`;
    menuText += `╔═══《 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔 》═══╗\n`;

    commands.map((cmd) => {
        if (cmd.pattern) {
            const cmdName = cmd.pattern.toString().split(/\W+/)[1];
            if (cmdName) {
                menuText += `║ ▸ .${cmdName}\n`;
            }
        }
    });

    menuText += `╚════════════════════╝\n`;
    menuText += `   © 𝖫𝖬𝖬𝖮𝖣𝖹 𝖷 𝖱𝖥𝖪 𝖬𝖮𝖣𝖹`;

    if (mediaUrl && mediaUrl.endsWith(".mp4")) {
        return await message.send({ url: mediaUrl }, { caption: menuText, gifPlayback: true }, "video");
    } else if (mediaUrl && mediaUrl.startsWith("http")) {
        return await message.send({ url: mediaUrl }, { caption: menuText }, "image");
    } else {
        return await message.send(menuText);
    }
});
