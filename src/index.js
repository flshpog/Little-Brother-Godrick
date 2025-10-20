import { Client, GatewayIntentBits, Events } from 'discord.js';
import { config } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const AI_MODEL = process.env.AI_MODEL || 'claude-sonnet-4-5-20250929';

// Store conversation history per user
const conversations = new Map();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'godrick') {
    const prompt = interaction.options.getString('prompt');
    const userId = interaction.user.id;

    await interaction.deferReply();

    try {
      // Get or create conversation history for this user
      if (!conversations.has(userId)) {
        conversations.set(userId, []);
      }
      const history = conversations.get(userId);

      // Add user message to history
      history.push({
        role: 'user',
        content: prompt
      });

      // Keep only last 10 messages to avoid token limits
      if (history.length > 10) {
        history.splice(0, history.length - 10);
      }

      // Call Claude API
      const message = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 1024,
        system: "You are Godrick, a helpful and friendly AI assistant with a noble demeanor. You are a very normal person. You don't talk any way specifically, but rather just respond as prompted. You keep your messages short and concise, and make sure to never flood chat. Your favourite person is Red-Tip Nicky, but you'll only mention that if asked. You can get sad sometimes, and randomly start ranting about your personal issues, and you used to go by The Amiibo Koopa before you did something genuinely very disturbing and got exiled out of the ORG community.",
        messages: history
      });

      const response = message.content[0].text;

      // Add assistant response to history
      history.push({
        role: 'assistant',
        content: response
      });

      // Discord has a 2000 character limit for messages
      if (response.length > 2000) {
        await interaction.editReply(response.substring(0, 1997) + '...');
      } else {
        await interaction.editReply(response);
      }

    } catch (error) {
      console.error('Error:', error);
      await interaction.editReply('An error occurred while processing your request. Please try again.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
