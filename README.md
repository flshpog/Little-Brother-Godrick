# Little Brother Godrick - Discord AI Chatbot

A Discord bot that uses Claude AI to chat with users through the `/godrick` command. This bot is configured as a **user-installable app**, meaning it can be used in DMs and any server!

## Features

- `/godrick` slash command for AI conversations
- Maintains conversation history per user
- Works everywhere: servers, DMs, and group chats
- Powered by Claude AI (Anthropic)

## Setup Instructions

### 1. Get Your Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section on the left sidebar
4. Click "Reset Token" and copy the token (you'll need this!)
5. **IMPORTANT**: Enable these settings under "Privileged Gateway Intents":
   - Presence Intent (optional)
   - Server Members Intent (optional)
   - Message Content Intent (optional)

### 2. Get Your Application ID

1. In the same Discord Developer Portal
2. Go to "General Information" on the left sidebar
3. Copy your "Application ID" (also called CLIENT_ID)

### 3. Configure User Installation

1. In the Discord Developer Portal, go to "Installation"
2. Under "Installation Contexts", make sure both are checked:
   - **Guild Install** (for server installation)
   - **User Install** (for personal installation - this makes it work everywhere!)
3. Under "Install Link", select "Discord Provided Link"
4. Under "Default Install Settings", for both Guild Install and User Install:
   - Add the `applications.commands` scope

### 4. Get Your Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new API key and copy it

### 5. Configure Your Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. **Open the `.env` file and add your secrets**:
   ```
   DISCORD_TOKEN=your_actual_discord_bot_token_here
   CLIENT_ID=your_actual_application_id_here
   ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
   ```

   **IMPORTANT**: Never commit the `.env` file to git! It's already in `.gitignore`.

### 6. Install Dependencies

```bash
npm install
```

### 7. Deploy the Commands

This registers the `/godrick` command with Discord:

```bash
npm run deploy
```

You should see: "Successfully reloaded application (/) commands."

### 8. Start the Bot

```bash
npm start
```

You should see: "Ready! Logged in as YourBotName#1234"

### 9. Invite the Bot

#### For Server Installation:
1. Go to Discord Developer Portal > Your App > "Installation"
2. Copy the "Install Link"
3. Open it in your browser and select a server to add the bot

#### For User Installation (works everywhere!):
1. Use the same install link
2. When prompted, choose "Add to your account" instead of selecting a server
3. Now you can use `/godrick` in any DM or server!

## Usage

Once the bot is running and invited, you can use it like this:

```
/godrick prompt: Hello! How are you today?
```

The bot will respond with AI-generated messages and maintain conversation context!

## Customization

### Change the AI Personality

Edit the system prompt in `src/index.js:50`:

```javascript
system: "You are Godrick, a helpful and friendly AI assistant..."
```

### Change the AI Model

In your `.env` file, you can specify a different Claude model:

```
AI_MODEL=claude-3-5-sonnet-20241022
```

Available models:
- `claude-3-5-sonnet-20241022` (default, best balance)
- `claude-3-opus-20240229` (most capable, slower)
- `claude-3-haiku-20240307` (fastest, cheaper)

## Troubleshooting

**Bot doesn't respond to commands:**
- Make sure you ran `npm run deploy` to register commands
- Check that the bot is online (`npm start` is running)
- Verify your `.env` file has correct tokens

**"Invalid token" error:**
- Double-check your `DISCORD_TOKEN` in `.env`
- Make sure there are no extra spaces or quotes

**API errors:**
- Verify your `ANTHROPIC_API_KEY` is correct
- Check you have credits in your Anthropic account

## Project Structure

```
Little-Brother-Godrick/
├── src/
│   ├── index.js           # Main bot logic
│   └── deploy-commands.js # Command registration
├── .env                   # Your secrets (NOT in git)
├── .env.example          # Template for .env
├── .gitignore            # Keeps secrets safe
├── package.json          # Dependencies
└── README.md             # This file!
```

## Security

- Never share your `.env` file
- Never commit tokens to git
- Regenerate tokens if accidentally exposed

## License

MIT
