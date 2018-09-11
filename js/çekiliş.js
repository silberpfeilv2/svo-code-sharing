// YnsYmn tarafından gönderildi. // 

const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const embedçekiliş = new Discord.RichEmbed()
        .setTitle("Çekiliş Kazananı")
        .setDescription(`Çekilişi Kazanan: ${message.guild.members.random().displayName}`)
    console.log("[p]çekiliş komutu " + message.author.username + " tarafından kullanıldı.")
    message.delete();
    message.channel.sendEmbed(embedçekiliş);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['çekilişyap', 'çekiliş-yap', 'lottery'],
    permLevel: 0
};

exports.help = {
    name: 'çekiliş',
    description: 'Çekiliş yapar.',
    usage: 'çekiliş'
};
