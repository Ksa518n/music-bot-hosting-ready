/*
██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
Copyright (c) 2024 Wick Studio
*/

module.exports = {    
    token: process.env.TOKEN || "", // token
    clientId: process.env.CLIENT_ID || "", // bot id
    prefix: process.env.PREFIX || "!", // prefix
    language: process.env.LANGUAGE || "ar", // ar for arabic | en for english
    verbose: true,
    musicCardPath: "./musicard.png",
    enableLogging: true,
    djRoleName: "Wick",
    aliases: {
      play: ["p", "start", "playmusic"],
      pause: ["hold", "stopmusic"],
      resume: ["r", "continue"],
      skip: ["s", "next", "jump"],
      stop: ["end", "terminate"],
      volumeUp: ["vup", "increasevolume"],
      volumeDown: ["vdown", "decreasevolume"],
      repeat: ["loop"],
      queue: ["q"],
      nowplaying: ["np"],
      clear: ["c"],
      remove: ["rm", "delete"]
  }
};