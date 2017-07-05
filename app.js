import Bot, {Message} from 'telegram-api';  // For file support, replace with {Message, File}
var config = require("./config");

var bot = new Bot({token: config.token_str});

bot.start();

bot.command('start', function(message) {
  var welcome = new Message().text('My Lord, I\'ll be at your service!').to(message.chat.id);
  bot.send(welcome);
});

bot.get(/Hello|Ciao|Hi/, function(message) {
  var answer = new Message().text('Hello, my Lord.').to(message.chat.id); 
  bot.send(answer);
});

bot.command('praise <people> [details]', function(message) {
  console.log("I bow to you, "+message.args.people+", "+message.args.details+"!");
});

console.log("[SERVER] Bot started.");
