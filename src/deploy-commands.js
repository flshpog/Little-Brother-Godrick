import { REST, Routes, ApplicationIntegrationType, InteractionContextType } from 'discord.js';
import { config } from 'dotenv';

config();

const commands = [
  {
    name: 'godrick',
    description: 'Chat with Godrick, your AI assistant',
    options: [
      {
        name: 'prompt',
        type: 3, // STRING type
        description: 'Your message to Godrick',
        required: true,
      },
    ],
    // This makes the command usable everywhere (DMs and all servers)
    integration_types: [
      ApplicationIntegrationType.GuildInstall,  // Can be installed to servers
      ApplicationIntegrationType.UserInstall,   // Can be installed to user accounts
    ],
    contexts: [
      InteractionContextType.Guild,           // Works in servers
      InteractionContextType.BotDM,          // Works in bot DMs
      InteractionContextType.PrivateChannel, // Works in DMs and group DMs
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
    console.log('The /godrick command is now available everywhere!');
  } catch (error) {
    console.error(error);
  }
})();
