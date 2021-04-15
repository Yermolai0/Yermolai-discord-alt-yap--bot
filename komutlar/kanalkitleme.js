const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

let channel = message.mentions.channels.first() || message.channel;

let reason;
if(!message.mentions.channels.first()) {
if(args[0]) reason = args.slice(0).join(' ');
};
if(message.mentions.channels.first()) {
if(args[1]) reason = args.slice(1).join(' ');
};

let reasonn;
if(!reason) reasonn = '. sebep yok.';
if(reason) reasonn = ` for ${reason} reason.`;
message.channel.send(`Channel ${channel} has been locked.`).then(m => m.delete({timeout: 7000}));

let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false }, 'kilitleyen '+message.author.tag);
channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle(channel.name+' has been Locked.')
.setDescription(`Ne yazık ki, modlar bu kanalı kilitlemek zorunda kaldı${reasonn}Sebep yok. Lütfen bu karara saygı gösterin ve gelecekte yeniden AÇILABİLİR.`));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'kilit',
  description: 'komutu kullandığınız kanalı kiliter ve sadece yöneticiler yazabilir'
};