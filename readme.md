# 🎵 Music Bot 🎵

**Music Bot** is a feature-rich Discord bot designed to provide seamless music playback and management within your Discord servers.

## 🛠️ Features

- **High-Quality Music Playback:** Supports a wide range of platforms including YouTube, SoundCloud, Spotify, and more.
- **Intuitive Commands:** Simple and effective commands for playing, pausing, skipping, and managing the music queue.
- **Interactive Buttons:** Control the music directly from Discord messages with interactive buttons.
- **Customizable Settings:** Tailor the bot's behavior to suit your server's needs with extensive configuration options.
- **Multi-Language Support:** Currently supports Arabic and English.
- **Robust Error Handling:** Ensures smooth operation with comprehensive error handling and logging.

## 📦 Installation

### 🔧 Prerequisites

- **Node.js:** Ensure you have [Node.js](https://nodejs.org/) installed (v16.9.0 or higher).
- **FFmpeg:** Required for audio processing.

### 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure the Bot:**
   - Fill in the required fields in `config.js` or use a `.env` file.
   - Example `.env`:
     ```
     TOKEN=YOUR_BOT_TOKEN
     CLIENT_ID=YOUR_CLIENT_ID
     PREFIX=!
     LANGUAGE=ar
     ```

3. **Run the Bot:**
   ```bash
   npm start
   ```

## 🎶 Music Commands

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `!play <song>`   | Play a song from YouTube or a supported platform. |
| `!pause`         | Pause the currently playing song.       |
| `!resume`        | Resume a paused song.                    |
| `!skip`          | Skip the currently playing song.         |
| `!stop`          | Stop the music and clear the queue.       |
| `!volumeUp`      | Increase the volume by 10%.               |
| `!volumeDown`    | Decrease the volume by 10%.               |
| `!repeat`        | Toggle the repeat mode.                   |
| `!queue`         | Display the current music queue.          |
| `!nowplaying`    | Show the song currently playing.          |
| `!clear`         | Clear the music queue and stop playback.  |
| `!remove <number>`| Remove a specific song from the queue.    |

## 📄 License

This project is licensed under the [MIT License](LICENSE).
