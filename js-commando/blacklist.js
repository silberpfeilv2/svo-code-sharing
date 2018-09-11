// Foalwy tarafından gönderildi. //

const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blacklist',
            aliases: ['karaliste', 'kara-liste'],
            group: 'admin',
            memberName: 'blacklist',
            description: 'Birini kara-listeye almak için kullanılır.',
            throttling: {
                usages: 2,
                duration: 3
            },
            guarded: true,

            args: [
                {
                    key: 'user',
                    label: 'kişi',
                    prompt: 'Kimi kara-liste altına almak istersin?',
                    type: 'user',
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg, { user }) {
        if (this.client.isOwner(user.id)) return msg.reply('kendini kara-listeye alamazsın!');

        const blacklist = this.client.provider.get('global', 'userBlacklist', []);
        if (blacklist.includes(user.id)) return msg.reply('bu kişi zaten kara-listede.');

        blacklist.push(user.id);
        this.client.provider.set('global', 'userBlacklist', blacklist);
            
        return msg.reply(`\`${user.tag}\` isimli kişi artık kara-listede.`);
    }
};
