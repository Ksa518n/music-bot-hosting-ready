const { 
    AttachmentBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    ActivityType
} = require('discord.js');
const generateMusicCard = require('./generateMusicCard');

async function sendMusicCard(queue, song, localization) {
    try {
        let currentTime = Math.floor(queue.currentTime || 0);
        const totalTime = song.duration;

        const cardBuffer = await generateMusicCard(song, currentTime, totalTime, queue);
        if (!cardBuffer) return;

        const buttons = {
            pause: new ButtonBuilder().setCustomId("pause").setLabel("⏸️").setStyle(ButtonStyle.Secondary),
            resume: new ButtonBuilder().setCustomId("resume").setLabel("▶️").setStyle(ButtonStyle.Success),
            skip: new ButtonBuilder().setCustomId("skip").setLabel("⏭️").setStyle(ButtonStyle.Primary),
            stop: new ButtonBuilder().setCustomId("stop").setLabel("⏹️").setStyle(ButtonStyle.Danger),
            volumeUp: new ButtonBuilder().setCustomId("volumeUp").setLabel("🔊").setStyle(ButtonStyle.Secondary),
            volumeDown: new ButtonBuilder().setCustomId("volumeDown").setLabel("🔉").setStyle(ButtonStyle.Secondary),
            repeat: new ButtonBuilder().setCustomId("repeat").setLabel("🔁").setStyle(ButtonStyle.Secondary),
            open: new ButtonBuilder().setLabel("🔗").setStyle(ButtonStyle.Link).setURL(song.url || "https://youtube.com"),
        };

        const row1 = new ActionRowBuilder().addComponents(buttons.pause, buttons.resume, buttons.skip, buttons.stop);
        const row2 = new ActionRowBuilder().addComponents(buttons.volumeUp, buttons.volumeDown, buttons.repeat, buttons.open);

        if (queue.textChannel && typeof queue.textChannel.send === "function") {
            const attachment = new AttachmentBuilder(cardBuffer, { name: 'musiccard.png' });
            const message = await queue.textChannel.send({
                components: [row1, row2],
                files: [attachment],
            });

            queue.currentMessage = message;

            // Update every 10 seconds to save resources and avoid rate limits
            const updateInterval = setInterval(async () => {
                try {
                    if (!queue || queue.paused || !queue.currentMessage) {
                        clearInterval(updateInterval);
                        return;
                    }

                    currentTime = Math.floor(queue.currentTime);
                    if (currentTime >= totalTime) {
                        clearInterval(updateInterval);
                        return;
                    }

                    const updatedCardBuffer = await generateMusicCard(song, currentTime, totalTime, queue);
                    if (updatedCardBuffer) {
                        const updatedAttachment = new AttachmentBuilder(updatedCardBuffer, { name: 'musiccard.png' });
                        await queue.currentMessage.edit({
                            files: [updatedAttachment],
                        });
                    }
                } catch (err) {
                    clearInterval(updateInterval);
                }
            }, 10000);
        }
    } catch (error) {
        console.error("❌ Error sending music card:", error);
    }
}

module.exports = sendMusicCard;
