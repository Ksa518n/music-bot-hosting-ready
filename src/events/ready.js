const { ActivityType } = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const config = require("../../config.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            console.log(chalk.blueBright(`
███╗   ███╗██╗   ██╗███████╗██╗ ██████╗     ██████╗  ██████╗ ████████╗
████╗ ████║██║   ██║██╔════╝██║██╔════╝     ██╔══██╗██╔═══██╗╚══██╔══╝
██╔████╔██║██║   ██║███████╗██║██║          ██████╔╝██║   ██║   ██║   
██║╚██╔╝██║██║   ██║╚════██║██║██║          ██╔══██╗██║   ██║   ██║   
██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╗     ██████╔╝╚██████╔╝   ██║   
╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝     ╚═════╝  ╚═════╝    ╚═╝   
            `));
            console.log(chalk.yellowBright(`✅ Logged in as ${client.user.tag}!`));
            
            const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const cpuLoad = os.loadavg()[0].toFixed(2);

            console.log(chalk.cyanBright(`📁 Guilds: ${client.guilds.cache.size}`));
            console.log(chalk.cyanBright(`👥 Users: ${client.users.cache.size}`));
            console.log(chalk.cyanBright(`🖥️ Memory Usage: ${memoryUsage} MB`));
            console.log(chalk.cyanBright(`🖥️ CPU Load (1m): ${cpuLoad}`));
            console.log(chalk.cyanBright(`⏱️ Uptime: ${uptime}`));

            try {
                await client.user.setActivity("🔊 Music Player!", { type: ActivityType.Listening });
            } catch (err) {
                console.error(chalk.redBright("❌ Failed to set initial activity:"), err);
            }
            console.log(chalk.greenBright("✅ Bot is fully operational and ready to serve!"));
        } catch (error) {
            console.error(chalk.redBright("❌ Error in ready event:"), error);
        }
    },
};
