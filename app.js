import Bot, {Message} from 'telegram-api';  // For file support, replace with {Message, File}
var config = require("./config"); // The JS who holds configuration informations such as token_str for API authorization.

var bot = new Bot({token: config.token_str}); // Let's create the bot object, using token string from configuration file.

bot.start();  // Let's start the bot instance.

// For /start command, it's possible to cache Message instance because text doesn't change.
var message_welcome = new Message().text('My Lord, I\'ll be at your service!');

// Listens for /start command. Notice that you don't write slash as written inside official documentation.
bot.command('start', function(message){
  let welcome = message_welcome.to(message.chat.id);
  bot.send(welcome);
});

// Listens for a regexp (In this case, a phrase containing Hello, Ciao or Hi in any position).
// Notice: case insensitive with final 'i' in regexp. If you don't add it, it listens words only if first char is capital letter.
bot.get(/Hello|Ciao|Hi/i, function(message) {
  let answer = new Message()
    .text('Hello, my Lord.')
    .to(message.chat.id); 
  bot.send(answer);
});

// Listens for command 'praise', with required parameter <people>, with optional parameter [details].
bot.command('praise <people> [details]', function(message) {
  var answer = new Message()
    .text("I bow to you, "+message.args.people+", "+message.args.details+"!")
    .to(message.chat.id);
});


console.log("[SERVER] Bot started.");
