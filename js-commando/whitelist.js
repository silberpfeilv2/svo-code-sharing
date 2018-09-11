// Foalwy tarafından gönderildi. //

const { Command } = require('discord.js-commando');

module.exports = class WhitelistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'whitelist',
            aliases: ['beyazliste', 'beyaz-liste'],
            group: 'admin',
            memberName: 'whitelist',
            description: 'Birini kara-listeden silmek için kullanılır.',
            throttling: {
                usages: 2,
                duration: 3
            },
            guarded: true,

            args: [
                {
                    key: 'user',
                    label: 'kişi',
                    prompt: 'Kim kara-listeden çıkartılmalı?',
                    type: 'user'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg, { user }) {
        const blacklist = this.client.provider.get('global', 'userBlacklist', []);
        if (!blacklist.includes(user.id)) return msg.reply('bu kişi kara listede değil.');

        const index = blacklist.indexOf(user.id);
        blacklist.splice(index, 1);

        if (blacklist.length === 0) this.client.provider.remove('global', 'userBlacklist');
        else this.client.provider.set('global', 'userBlacklist', blacklist);

        return msg.reply(`${user.tag} affedildi.`);
    }
};
