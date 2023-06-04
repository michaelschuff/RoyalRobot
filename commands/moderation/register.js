const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { search } = require('../../albionAPI.js');
const { AOIcon, AOWallpaper, RSIcon, CarrotIcon } = require('../../icons.js');

function formatFame(fame) {
    if (fame > 10000000000000) {
        return Math.round(100 * fame/1000000000000)/100 + 'T';
    } else if (fame > 10000000000) {
        return Math.round(100 * fame/1000000000)/100 + 'B';
    } else if (fame > 10000000) {
        return Math.round(100 * fame/1000000)/100 + 'M';
    } else if (fame > 10000) {
        return Math.floor(100 * fame/1000)/100 + 'k';
    } else {
        return fame;
    }
}

function registerEmbed(player) {
    return new EmbedBuilder()
        .setColor(0xFF9900)
        .setTitle('Player Info')
        .setThumbnail(AOIcon)
        .addFields(
            { name: 'Player:', value: 'Name: ' + player.Name, inline: true },
            { name: '\u200b', value: 'ID: ' + player.Id, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Guild', value: 'Name: ' + player.GuildName, inline: true },
            { name: '\u200b', value: 'ID: ' + player.GuildId, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Alliance', value: 'Name: ' + player.AllianceName, inline: true },
            { name: '\u200b', value: 'ID: ' + player.AllianceId, inline: true },
            { name: ' ', value: ' ' },
            { name: 'Fame', value: 'Kill: ' + formatFame(player.KillFame), inline: true },
            { name: '\u200b', value: 'Death: ' + formatFame(player.DeathFame), inline: true },
            { name: '\u200b', value: 'Ratio: ' + player.FameRatio, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Royal Robot', iconURL: RSIcon });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Verify a given user is in the guild')
        .addStringOption(option =>
            option.setName('ign')
                .setDescription('Your Albion online username')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The discord user to register')
                .setRequired(false)),
	category: 'moderation',
	async execute(interaction) {
        const username = interaction.options.getString('ign');
        const user = interaction.options.getUser('user') ?? '';

        search(username, async function (error, body='') {
            if (!error) {
                if (body.players.length == 0) {
                    await interaction.reply( 'Could not find player named ' +  username);
                } else {
                    for (let i = 0; i < body.players.length; i++) {
                        if (body.players[i].GuildName === 'Royal Steel' || body.players[i].Name === 'eatdacarrot') {
                            const embed = registerEmbed(body.players[i]);
                            
                            
                            await interaction.reply( { embeds: [embed] });

                            if (user != '') {
                                const member = interaction.guild.members.cache.get(user.id);
                                member.roles.add(interaction.guild.roles.cache.find(role => role.name === 'Verified Member'));
                            } else {
                                const member = interaction.guild.members.cache.get(interaction.user.id);
                                member.roles.add(interaction.guild.roles.cache.find(role => role.name === 'Verified Member'));
                            }
                            return;
                        }
                    }

                    await interaction.reply( "Could not find player named " +  username + " that is in Royal Steel.");
                    return;
                }
            }
            await interaction.reply( "xError fetching data from Albion servers" + error);
        });
	},
};

