const Discord = require('discord.js');
const commaNumber = require('comma-number');
const Commando = require('discord-akairo');

module.exports = class Command extends Commando.Command {
	constructor() {
		super('copsandcrims', {
			aliases: ['copsandcrims', 'c&c', 'cac', 'cvc', 'cops', 'crims'],
			category: 'hypixel',
			description: 'Get Hypixel Cops and Crims stats of a player',
			args: [
				{
					id: 'player',
					prompt: {
						start: "Please specify a player's IGN to get the stats from."
					},
					type: 'string',
				},
			],
		});
	}

	async exec(message, { player }) {
		this.client.hypixelAPIReborn
			.getPlayer(player)
			.then(async (player) => {
				const embed = new Discord.MessageEmbed()
					.setTimestamp()
					.setAuthor('Cops and Crims Stats', 'https://i.imgur.com/OuoECfX.jpeg')
					.setTitle(`[${player.rank}] ${player.nickname}`)
					.setColor(this.client.config.discord.accentColor)
					.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }))
					.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/CVC-64.png')
					.addField('Coins', `\`${commaNumber(player.stats.copsandcrims.coins)}\``, true)
					.addField('Wins', `\`${commaNumber(player.stats.copsandcrims.wins)}\``, true)
					.addField('Round Wins', `\`${commaNumber(player.stats.copsandcrims.roundWins)}\``, true)
					.addField('Kills', `\`${commaNumber(player.stats.copsandcrims.kills)}\``, true)
					.addField('Criminal Kills', `\`${commaNumber(player.stats.copsandcrims.killsAsCrim)}\``, true)
					.addField('Cop Kills', `\`${commaNumber(player.stats.copsandcrims.killsAsCop)}\``, true)
					.addField('Deathes', `\`${commaNumber(player.stats.copsandcrims.deaths)}\``, true)
					.addField('Deathmatch Kills', `\`${commaNumber(player.stats.copsandcrims.deathmatch.kills)}\``, true)
					.addField('Headshot Kills', `\`${commaNumber(player.stats.copsandcrims.headshotKills)}\``, true)
					.addField('Bombs Defused', `\`${commaNumber(player.stats.copsandcrims.bombsDefused)}\``, true)
					.addField('Bombs Planted', `\`${commaNumber(player.stats.copsandcrims.bombsPlanted)}\``, true)
					.addField('KD Ratio', `\`${commaNumber(player.stats.copsandcrims.KDRatio)}\``, true);

				return message.reply({ embeds: [embed] });
			})
			.catch(async (e) => {
				if (e.message === this.client.HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
					const player404 = new Discord.MessageEmbed()
						.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
						.setDescription((await this.client.language('I could not find that player in the API. Check spelling and name history.', message)))
						.setColor(this.client.config.discord.accentColor)
						.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }));
					return message.reply({ embeds: [player404] });
				} else {
					if (mode) {
						const error = new Discord.MessageEmbed()
							.setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
							.setDescription(await this.client.language('An error has occurred', message))
							.addField('Error', `\`\`\`js\n${e}\n\`\`\``)
							.setColor(this.client.config.discord.accentColor)
							.setFooter((await this.client.language(`Requested by ${message.author.tag}`, message)), message.author.displayAvatarURL({ dynamic: true }));
						return message.reply({ embeds: [error] });
					}
				}
			});
	}
};
