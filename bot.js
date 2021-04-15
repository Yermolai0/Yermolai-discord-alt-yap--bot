const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const AntiSpam = require('discord-anti-spam');
const db = require('wio.db')
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
    
                            // botun oynuyor kısmı //

client.on('ready', () => {
  var actvs = [
    `Yermolai ❤ Essero`,
    `#EsseroBuDostum`, 
    `Essero Bot`
];

    
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'WATCHING'});
    }, 15000);
    
  
                          // konsol logları //


      console.log ('_________________________________________');
      console.log (`s.a lan girdim ben  : ${client.user.username}`);
      console.log (`şu kadar sunucuda varım       : ${client.guilds.cache.size}`);
      console.log (`kullanıcılar bunlar      : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`durumum            : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
      console.log ('Yapımcı            : Yermolai      ');
      console.log ('Discordumuz        : https://discord.gg/YewmMTcsHh');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

 

           // belirlediğiniz kişiye rol verilir //
           
           // örnek kullanım: /rolver @kişi @rol


client.on("message", message => {
  if (message.content.startsWith('/rolver')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('yetkin yok')
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    member.roles.add(role)
    client.on("guildMemberAdd", member =>{
      const hg = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(member.guild.name + 'adlı kişiye başarı ile rol verildi')
      .setDescription(`tebrikler.`)
      .setFooter('iyi günler')
      .setTimestamp()
      member.send(hg)
    })
  }
});



            // komutu kullandığınız kişiden rol alır //

            // örnek kullanım: /rolal @kişi @rol //
                

client.on("message", message => {
  if (message.content.startsWith('/rolal')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('yetkin yok')
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    member.roles.remove(role)
    client.on("guildMemberAdd", member =>{
      const hg = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(member.guild.name + 'adlı kişiye başarı ile rol alındı')
      .setDescription(`iyi günler.`)
      .setFooter('düşün biraz')
      .setTimestamp()
      member.send(hg)
    })
  }
});

               // **sahip** yazan birine özelden mesaj atar //

client.on('message', msg => {
  if (msg.content.toLocaleLowerCase() === 'sahip') {
    msg.author.send('**KENNETH** ``tarafından özenle yapıldım``');
  }
});




      // belirlediğiniz kanala sunucunuza katılan birine hg mesajı atar //


client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
        '0': `<a:0_:809923796579385384>`,
          '1': `**1**`,
          '2': `**2**`,
          '3': `**3**`,
          '4': `**4**`,
          '5': `**5**`,
          '6': `**6**`,
          '7': `**7**`,
          '8': `**8**`,
          '9': `**9**`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "828986911837388810");//mesaj atılcak kanal id
    let register = '828921662974984242'
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
   const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  var kontrol;
if (kurulus < 1296000000) kontrol = 'Hesap Durumu: <a:tehlikeli:801043752310669343> Güvenilir Değil. <a:tehlikeli:801043752310669343>'
if (kurulus > 1296000000) kontrol = 'Hesap Durumu: <a:gvenli:801042113709342731> Güvenilir Gözüküyor. <a:gvenli:801042113709342731>'
  moment.locale("tr");
const embed = new Discord.MessageEmbed()
.setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
.setDescription(`
 ┊ <@`+member.id+`> **Sunucumuza Katıldı !** 

 ┊ **Seninle birlikte **{ `+üyesayısı+` }** kişiye ulaştık !**

 ┊ **Sunucumuzun kurallarına uymayı unutma, kurallarımızı okumanı tavsiye ederiz.**

 ┊ **İçeride keyifli vakitler geçirmeni dileriz.**
`)
.setImage(`https://i.ibb.co/qkhQ2wr/Peding-Hosgeldin.gif`)
  kanal.send(embed)
  kanal.send(`<@&${register}>`)

});


            // sunucuya yeni katılan birine özelden hg mesajı atar


client.on("guildMemberAdd", member =>{
  const hg = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle(member.guild.name + 'sunucumuza hoşgeldin')
  .setDescription(`Sunucumuza Hoşgeldin.`)
  .setFooter('Hoşgeldin')
  .setTimestamp()
  member.send(hg)
})

client.on("ready", () => {
  client.channels.cache.get("832180416373850122").join();
})



                    // reklam yapanlara karşı koruma //

client.on("message", message => {
  const reklam = ["discord.gg/", ".gg/", ". gg/", ". gg /", "https://", "http://"];
  if (reklam.some(word => message.content.includes(word)) ) {
      message.reply("`` REKLAM içeren cümleler kullanma ``")
      message.delete()
  }
});






                     // flood ypanlara karşı koruma //


const antiSpam = new AntiSpam({
	warnThreshold: 3, 
	muteThreshold: 4, 
	kickThreshold: 7, 
	banThreshold: 7, 
	maxInterval: 2000, 
	warnMessage: '{@user}, spam yapma.', 
	kickMessage: '**{user_tag}** spam yaptığı için atıldı.', 
	muteMessage: '**{user_tag}** spam yaptığı için susturuldu.',
	banMessage: '**{user_tag}** spam yaptığı için banlandı.', 
	maxDuplicatesWarning: 6, 
	maxDuplicatesKick: 10, 
	maxDuplicatesBan: 12, 
	maxDuplicatesMute: 8, 
	ignoredPermissions: [ 'ADMINISTRATOR'], // flood yapmaktan etkilenmeyeck rol
	ignoreBots: true, 
	verbose: true,
	ignoredMembers: [], 
	muteRoleName: "CEZALI", // verilecek rolün ismi 
	removeMessages: true 
});



                    //////////////////////////////////////////////////
                    //                                              //
                    //      kodlar Yermolai tarafından yapıldı      //
                    //                                              //
                    //                                              //
                    //  böyle yapmamın sebebi bir youtuberda gördüm //                                     //
                    //                                              //
                    //////////////////////////////////////////////////








 // buraya bot tokeninizi yazacaksınız veya ayarlar.json ' u etiketliyeceksiniz //

client.login('TOKEN');
