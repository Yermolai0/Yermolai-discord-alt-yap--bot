exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed().setDescription(`:x: Yetkin yeterli değil!`))
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(new MessageEmbed().setDescription(`:x: Kullanıcı id hatalı veya kullanıcı yasaklı değil!`))
    }
    message.guild.members.unban(user);
    message.channel.send(new MessageEmbed().setDescription(`:white_check_mark: Başarılı!`))
};

exports.conf = {
    aliases: ["un-ban"]
};

exports.help = {
    name: 'unban',
    description: 'banladığınız kişilerin banını bu komut sayesinde kolay bir şekilde kaldırır'
};

                    // banladığınız kişilerin banını kaldırır //