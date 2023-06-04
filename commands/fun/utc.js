const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('utc')
		.setDescription('Replies with current UTC time'),
	category: 'fun',
	async execute(interaction) {
		await interaction.reply({ content: new Date().toUTCString(), ephemeral: true});
	},
};