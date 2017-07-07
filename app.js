import Bot, {Message} from 'telegram-api';  // For file support, replace with {Message, File}
var config = require("./config"); // The JS who holds configuration informations such as token_str for API authorization.

var bot = new Bot({token: config.token_str}); // Let's create the bot object, using token string from configuration file.

bot.start();  // Let's start the bot instance.

// For /start command, it's possible to cache Message instance because text doesn't change.
var message_welcome = new Message().text('My Lord, I\'ll be at your service!');

// Listens for /start command. Notice that you don't write slash as written inside official documentation.
bot.command('start', function(message){
  message_welcome.to(message.chat.id);  // With to method, you can choose which chat Telegram Bot has to answer to.
  bot.send(message_welcome);  // Send the message over Telegram API.
});

// Listens for a regexp (In this case, a phrase containing Hello, Ciao or Hi in any position).
// Notice: case insensitive with final 'i' in regexp. If you don't add it, it listens words only if first char is capital letter.
bot.get(/Hello|Ciao|Hi/i, function(message) {
  let message_hello = new Message() // This is how you can write a non-cached Message object.
    .text('Hello, my Lord.')
    .to(message.chat.id);
  bot.send(message_hello);
});

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

// It's also possible to communicate with Node.js app to change variable values such as temperature.
// Think so far: you might want to deal with MongoDB/MySQL database to store and read data!
// Notice: <param> guarantees that this required parameter is set by user input.
var temperature = 20; // For this example, I use default value.
bot.command('temperature <param>', function(message){
  let message_params_text;
  if(isFinite(message.args.param)){
    message_params_text = 'Temperature before: '+temperature+', after: '+message.args.param;
    temperature = message.args.param; // Store new value inside temperature var.
  }else{
    message_params_text = 'Error: the temperature you\'ve inserted is not a valid number.';
  }

  let message_temperature = new Message()
    .text(message_params_text)
    .to(message.chat.id);
  bot.send(message_temperature);
});

// Log in web-server console that Telegram Bot is started.
console.log("[SERVER] Bot started.");
