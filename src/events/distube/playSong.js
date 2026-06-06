const sendMusicCard = require('../../utils/sendMusicCard');

module.exports = {
    name: 'playSong',
    async execute(queue, song, client) {
        try {
            if (!queue.textChannel && song.metadata && song.metadata.message && song.metadata.message.channel) {
                queue.textChannel = song.metadata.message.channel;
            }

            if (queue.currentMessage) {
                await queue.currentMessage.delete().catch(() => {});
                queue.currentMessage = undefined;
            }

            await sendMusicCard(queue, song, client.localization);
        } catch (error) {
            console.error('❌ Error in playSong event:', error);
        }
    },
};
