const qrcode = require('qrcode-terminal');
const axios = require('axios');

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

 client.on('message', async (message) => {
     console.log(message.body.toLowerCase());
	if(message.body.toLowerCase() === 'send dudes') {
        const meme  = await axios(' https://meme-api.herokuapp.com/gimme').then(res => res.data)
        
        message.reply('you mean nudes ?');  
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
	} else if (message.body.toLowerCase() === 'arpit'){
        const contact = await message.getContact();
        console.log(contact.pushname)
        message.reply(' yo whats up' + contact.pushname);
    } 
});

client.on('message', message => {
	console.log(message.body);
});

client.initialize();