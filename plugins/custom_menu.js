const { System, commands, config } = require("../lib/");

System({
    pattern: "menu",
    fromMe: false,
    desc: "Clean LMMODZ Menu",
    type: "misc"
}, async (message) => {
    const ownerName = config.BOT_INFO.split(";")[1] || "𝐋𝐌𝐌𝐎𝐃𝐙";
    const prefix = config.HANDLERS.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g, "") || ".";

    let menuText = `*𓏵‧₊˚ ┊𝐋𝐌𝐌𝐎𝐃𝐙-𝐁𝐎𝐓-𝐗𝐃一緒*\n\n`;
    menuText += `• *Owner :* ${ownerName}\n`;
    menuText += `• *Prefix :* ${prefix}\n`;
    menuText += `• *Mode :* ${config.WORK_TYPE}\n\n`;

    const categories = {};
    commands.forEach((cmd) => {
        if (cmd.pattern && !cmd.dontAddCommandList) {
            const type = cmd.type ? cmd.type.toUpperCase() : "MISC";
            if (!categories[type]) categories[type] = [];
            const cmdName = cmd.pattern.toString().replace(/[^a-zA-Z0-9]/g, "");
            if (cmdName) categories[type].push(cmdName);
        }
    });

    for (const [category, cmds] of Object.entries(categories)) {
        menuText += `*┌──「 ${category} 」*\n`;
        cmds.forEach((c) => {
            menuText += `*│* • ${prefix}${c}\n`;
        });
        menuText += `*└───────────*\n\n`;
    }

    menuText += `ₗₘₘₒDZ-Bₒₜ-ₓD`;

    await message.send(menuText.trim());
});
