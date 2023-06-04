const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { RSIcon, CarrotIcon } = require('../../icons.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Learn about Royal Robot commands!'),
	category: 'utility',
	async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0xFF9900)
            .setTitle('Royal Robot Command Guide')
            .setURL(RSIcon)
            // .setAuthor({ name: 'eatdacarrot', iconURL: CarrotIcon })
            .setDescription('A list of every command available to you')
            .setThumbnail(RSIcon)
            .addFields(
                { name: '```/help```', value: 'Shows the commands you have available to use' },
                { name: '```/register username```', value: 'Links your discord account to your albion account' },
                { name: '```/utc```', value: 'Shows the current UTC time' },
            )
            .setTimestamp()
            .setFooter({ text: 'eatdacarrot', iconURL: CarrotIcon });
            
        await interaction.reply({ embeds: [helpEmbed]});
	},
};