const { EmbedBuilder } = require("discord.js");
const { formatTime } = require("../../utils/formatTime");

module.exports = {
    name: "addSong",
    execute(queue, song) {
        try {
            if (!queue.textChannel && song.metadata && song.metadata.message && song.metadata.message.channel) {
                queue.textChannel = song.metadata.message.channel;
            }

            if (queue.textChannel && typeof queue.textChannel.send === "function") {
                const embed = new EmbedBuilder()
                    .setColor("#E040FB") // Neon Purple
                    .setAuthor({ name: "تمت إضافة أغنية جديدة", iconURL: song.user.displayAvatarURL() })
                    .setDescription(`**[${song.name}](${song.url})**`)
                    .addFields(
                        { name: "⏱️ المدة", value: `\`${formatTime(song.duration)}\``, inline: true },
                        { name: "👤 بواسطة", value: `\`${song.user.username}\``, inline: true }
                    )
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: "نظام الموسيقى المتطور" });

                queue.textChannel.send({ embeds: [embed] }).catch(console.error);
            }
        } catch (error) {
            console.error("❌ Error in addSong event:", error);
        }
    },
};
