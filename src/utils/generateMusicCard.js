const { createCanvas, loadImage, registerFont } = require('canvas');
const fetch = require('node-fetch');
const sharp = require('sharp');
const path = require("path");

function registerCustomFonts() {
    try {
        registerFont(path.join(__dirname, 'fonts', 'Roboto-Bold.ttf'), { family: 'Roboto', weight: 'bold' });
        registerFont(path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'), { family: 'Roboto', weight: 'regular' });
        registerFont(path.join(__dirname, 'fonts', 'Roboto-Italic.ttf'), { family: 'Roboto', weight: 'italic' });
    } catch (error) {
        console.error("❌ Error registering custom fonts:", error);
    }
}
registerCustomFonts();

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function wrapAndTruncateText(ctx, text, x, y, maxWidth, maxChars, lineHeight) {
    let truncatedText = text;
    if (truncatedText.length > maxChars) {
        truncatedText = truncatedText.substring(0, maxChars - 3) + '...';
    }

    const words = truncatedText.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), x, y);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    return ctx;
}

async function getImageBuffer(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);
        const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();
        return jpegBuffer;
    } catch (error) {
        console.error("❌ Error fetching or converting image buffer:", error);
        throw error;
    }
}

async function generateMusicCard(song, currentTime, totalTime, queue) {
    try {
        if (!song) throw new Error("Song object is undefined.");

        const width = 1200;
        const height = 500;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Background: Deep Purple / Dark Gradient
        const bgGradient = ctx.createLinearGradient(0, 0, width, height);
        bgGradient.addColorStop(0, '#0F0C29');
        bgGradient.addColorStop(0.5, '#302B63');
        bgGradient.addColorStop(1, '#24243E');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);

        // Glassmorphism Overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        drawRoundedRect(ctx, 30, 30, width - 60, height - 60, 40);
        ctx.fill();

        // Thumbnail
        const thumbnailSize = 320;
        const thumbnailX = 60;
        const thumbnailY = (height - thumbnailSize) / 2;
        let thumbnail;
        try {
            const buffer = await getImageBuffer(song.thumbnail || 'https://via.placeholder.com/320');
            thumbnail = await loadImage(buffer);
        } catch (err) {
            thumbnail = await loadImage('https://via.placeholder.com/320');
        }

        ctx.save();
        drawRoundedRect(ctx, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 30);
        ctx.clip();
        ctx.drawImage(thumbnail, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize);
        ctx.restore();

        // Neon Border for Thumbnail
        ctx.strokeStyle = '#E040FB'; // Purple Neon
        ctx.lineWidth = 8;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#E040FB';
        drawRoundedRect(ctx, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 30);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 55px Roboto';
        ctx.textBaseline = 'top';
        wrapAndTruncateText(ctx, song.name, 420, 70, 720, 45, 65);

        // Subtitle (Artist/Uploader)
        ctx.fillStyle = '#B388FF'; // Light Purple
        ctx.font = '30px Roboto';
        const authorText = song.user ? `Requested by ${song.user.username}` : 'Music Bot';
        ctx.fillText(authorText, 420, 220);

        // Progress Bar Background
        const barWidth = 720;
        const barHeight = 12;
        const barX = 420;
        const barY = 320;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        drawRoundedRect(ctx, barX, barY, barWidth, barHeight, 6);
        ctx.fill();

        // Progress Bar Active
        const progress = Math.min(currentTime / totalTime, 1) * barWidth;
        const progGradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
        progGradient.addColorStop(0, '#7C4DFF');
        progGradient.addColorStop(1, '#E040FB');
        ctx.fillStyle = progGradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#E040FB';
        drawRoundedRect(ctx, barX, barY, progress, barHeight, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Time Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '22px Roboto';
        const timeText = `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
        ctx.fillText(timeText, barX, barY + 30);

        // Stats (Volume, Loop)
        ctx.font = '20px Roboto';
        ctx.fillStyle = '#B0BEC5';
        ctx.fillText(`🔊 ${queue.volume}%`, 420, 390);
        const loopText = queue.repeatMode === 0 ? "Off" : queue.repeatMode === 1 ? "Song" : "Queue";
        ctx.fillText(`🔁 ${loopText}`, 550, 390);

        // Final Glow Border
        ctx.strokeStyle = 'rgba(224, 64, 251, 0.3)';
        ctx.lineWidth = 4;
        drawRoundedRect(ctx, 15, 15, width - 30, height - 30, 50);
        ctx.stroke();

        return canvas.toBuffer();
    } catch (error) {
        console.error("❌ Error generating music card:", error);
        return null;
    }
}

module.exports = generateMusicCard;
