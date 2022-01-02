const TeleBot = require('telebot');
const bot = new TeleBot('1845190866:AAHrxpzEFZuoQ7u1-PyJ0H0hwJieJZxmWNQ');
const API = 'https://thecatapi.com/api/images/get?format=src&type=';

const replyMarkup = bot.keyboard([
    ['/kitty', '/kittygif']
], {resize: true, once: false});

bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

bot.on(['/start', '/help'], function (msg) {

    return bot.sendMessage(msg.chat.id,
        ' Используй команды: /kitty, /kittygif and /about', {replyMarkup}
    );

});

bot.on('/about', function (msg) {

    let text = ' Этот бот сделан пользователем @shifter_7 ' +
        'Для демонстрации написания бота на ЯП node.js, и апи. Сделан для лолза';

    return bot.sendMessage(msg.chat.id, text);

});

bot.on(['/kitty', '/kittygif'], function (msg) {

    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(' ')[0];

    if (cmd == '/kitty') {
        promise = bot.sendPhoto(id, API + 'jpg', {
            fileName: 'kitty.jpg',
            serverDownload: true
        });
    } else {
        promise = bot.sendDocument(id, API + 'gif#', {
            fileName: 'kitty.gif',
            serverDownload: true
        });
    }

    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        bot.sendMessage(id, ` Произошла ошибка ${ error }, попробуйте еще раз.`);
    });

});

bot.start();