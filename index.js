const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const parser = require('./parser.js')


const token = '608783806:AAEIm9YHSELLgbNGz8Q6Ib4cmmwS48ly4Tk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        if (body) {
          const data = JSON.parse(body);
          const chatId = data.message.from.id
          const messageText = data.message.text;
          //throw parser;
          const currencyInfo = await parser.getExchangeRate(messageText);
          // throw currencyInfo;
          await bot.sendMessage(chatId, currencyInfo);
         
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(body);            
        }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('OK');
      }
    });
};

