# Telegram Bot in Node.JS

## What are you talking about?
This repository lets you run and configure a Telegram bot, easily, in order to interact with user input and manage data.

Everything is ready for production environment! Just follow those README steps in order to create and configure your bot. Enjoy!

This repository uses NPM package 'telegram-api', provided by https://github.com/mdibaiee. Feel free to star his repositories if you liked this one. He did a very good job on making things simple and I actually learnt how to do it from his repositories.

By forking this repository, you have a working base which you can start develop your bot features without have troubles regarding Babel configuration for production environment in order to use ES6.

## How to create the bot

### Step 1: create a 'user bot' and connect it with Node.js
- Open Telegram application on your computer;
- Contact BotFather through Telegram here: https://telegram.me/BotFather. This bot will be used to create your bot;
- As image suggests, follow those steps:
![image](http://i.imgur.com/POZq2tq.png)
- BotFather will provide you an API key. This API key is used to make requests to Telegram API in order to listen messages from your bot user, make bot answer accordingly and much more. Save it for next step.

### Step 2: configure your Node.js application
- Create config.js in the repository root with this content. Replace API_TOKEN with the API key you got from BotFather:
```javascript
module.exports = {token_str:'API_TOKEN'};
```
This file will be automatically ignored from .gitignore to secure your API key in GitHub.


- Install dependencies:
```
npm install
```
All dependencies will be installed accordingly: telegram-api to communicate with Telegram API and babel packages for ES6 and command-line utilities for development and production environment.

Done! Your bot is now configured.

## Run the bot
- Start your application:
```
npm start
```
If it prints:
```
[SERVER] Bot started.
```
...congratulations! Now bot will do what you want.

![image](http://i.imgur.com/v6fmG6f.png)

## ES6-ready with Babel in production environment
The easiest way to start your Node.js app for ES6 support, as I wrote above, is:
```
npm start
```
It actually runs: `"start": "babel-node src/index.js --presets es2015"`
However, this is NOT recommended in production environment. Benchmarking on my computer (i3 3317u) actually adds 2 seconds to application startup time and it is not cool.

Let's tweak things. Instead of npm start, do like this:

- Build your project for ES6:
```
npm run build
```
It actually runs: `"build": "babel src -d babel-dist --presets es2015"` so it compiles Node.js files in src folder and creates a copy, ES6-ready inside babel-dist folder, already gitignored.

- Run (serve) your ES6-ready build:
```
npm run serve
```
It actually runs: `"serve": "node babel-dist/index.js"` so it runs the compiled application and you can notice the startup time is gone. Your application is now production-ready!

You just build one time the app each time you make changes. To run it, use always `npm run serve` as many times as you want.

OPTIONAL: If you're lazy and you want to avoid the risk of running babel-node, change start routine with `"start": "node babel-dist/index.js"` and run it with `npm start` instead.

### More details about Babel and ES6 presets
I'm using es2015 presets. You can change them inside .babelrc in case you need to use other presets or add more.

```javascript
{
  "presets": ["es2015"]
}
```

## Secure your API key
In .gitignore:
```
config.js
```
API key will not be published inside your GitHub repository.
I have separated configuration logic from application logic in order to secure this key, but in a production environment it might not be enough.

Secure your API key as much as possible.
If your key gets stolen --- Bad things could happen with your bot.

If you're working on this repository with someone else, I suggest to NOT publish config.js but to share your configuration file privately with your collaborators OR let them build their own 'bot-users' with their own API keys.

## Documentation
I have personally commented my own code in order to make things as much clear as possible.

The file src/index.js is a loader for src/app.js file. To change your bot behavior, change src/app.js accordingly.

For example, listening a command:
```javascript
// Cache the message to save resources.
var message_bot_answer = new Message().text('Ping...? Pong!');

// Listens for /ping command. Notice that you don't write slash as written inside official documentation.
bot.command('ping', function(message){
  message_bot_answer.to(message.chat.id);  // With to method, you can choose which chat Telegram Bot has to answer to. In this case, bot will answer to the people who sends /pong.
  bot.send(message_bot_answer);  // Send the message over Telegram API.
});
```

Listening user words inside a sentence:
```javascript
// Listens for a regexp (In this case, a phrase containing Hello, Ciao or Hi in any position).
// Notice: case insensitive with final 'i' in regexp. If you don't add it, it listens words only if first char is capital letter.
bot.get(/Hello|Ciao|Hi/i, function(message) {
  let message_hello = new Message() // This is how you can write a non-cached Message object.
    .text('Hello, my Lord.')
    .to(message.chat.id);
  bot.send(message_hello);
});
```

Listens a command with parameters:
```javascript
// Listens for command 'praise', with required parameter <people>, with optional parameter [details].
// Notice: since details parameter is optional, it can be null. You might want to check if it's null.
bot.command('praise <people> [details]', function(message) {
  let extra_details;  // String to contact to the message.
  if(message.args.details != null) extra_details=", "+message.args.details+"!"; // Add extra text if details argument is here.
  else                             extra_details="";
  let message_praise = new Message()
    .text("I bow to you, "+message.args.people+extra_details)
    .to(message.chat.id);
  bot.send(message_praise);
});
```

If you need more functionalities you can look at the official documentation of NPM package 'telegram-api' here: https://github.com/mdibaiee/node-telegram-api/wiki. Documentation is well-written, just follow the right steps in order to achieve your functionality.