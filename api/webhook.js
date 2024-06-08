// Require our Telegram helper package
// cloudflared tunnel --url http://localhost:3000
// https://api.telegram.org/bot<token>/setWebhook?url=https://patterns-serves-pmc-humor.trycloudflare.com/api/webhook

import { Buffer, Blob,  } from 'node:buffer';
import sharp from 'sharp';
import TelegramBot from 'node-telegram-bot-api';

module.exports = async (request, response) => {

    // const keyboardbtn = [[
    //     { text: 'Flip', callback_data: 'flip', },
    //     { text: 'Flop', callback_data: 'flop' }],
    // [{ text: 'Rotate', callback_data: 'rotate' },
    // { text: 'Resize', callback_data: 'resize' }],
    // [{ text: 'Compress', callback_data: 'compress' },
    // { text: 'Compress & resize', callback_data: 'compresswithresize' }],
    // [{ text: 'Negative', callback_data: 'negative' },
    // { text: 'Blur', callback_data: 'blur' }],
    // [{ text: 'RemoveAlpha', callback_data: 'removealpha' },
    // { text: 'Extract Channel', callback_data: 'extractchannel' }],
    // ]


    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
        const { body } = request;
        // console.log("request body", request.body)

        if (body.message) {
            // console.log("bodymess", body.message)
            const { text, photo, document, message_id, audio, video } = body.message;
            const chat = body.message?.chat
            // const from = body.message?.from



            if (text) {

                if (text === '/start') {
                    await bot.sendMessage(chat.id, "Welcome \n Bot is Created by- Ravi Shankar singh",);
                    return response.status(200).json({ status: "Ok" })
                }
                if (text === '/help') {
                    await bot.sendMessage(chat.id, `<b>Upload Image and get Image Info. </b>`, { parse_mode: "HTML" });
                    return response.status(200).json({ status: "Ok" })
                }
                if (text === '/picforme') {
                    const imaag = await fetch("https://picsum.photos/200");
                    await bot.sendPhoto(chat.id, imaag.url, { caption: "The Random image for you! \n Have a good luck." });
                    return response.status(200).json({ status: "Ok" })
                }

                let hi = "hi";
                if (text.toString().toLowerCase().indexOf(hi) === 0) {
                    await bot.sendMessage(chat.id, "Hello Dear User");
                    return response.status(200).json({ status: "Ok" })
                }

                let hello = "hello";
                if (text.toString().toLowerCase().indexOf(hello) === 0) {
                    await bot.sendMessage(chat.id, "Hello Dear user");
                    return response.status(200).json({ status: "Ok" })
                }

                if (text.toString().toLowerCase() === "tauvaa") {
                    await bot.sendMessage(chat.id, "Tauvee");
                    return response.status(200).json({ status: "Ok" })
                }
                if (text.toString().toLowerCase() === "kauvaa") {
                    await bot.sendMessage(chat.id, "Kauvee");
                    return response.status(200).json({ status: "Ok" })
                }
                if (text.toString().toLowerCase() === "pagal") {
                    await bot.sendMessage(chat.id, "Pagaliya");
                    return response.status(200).json({ status: "Ok" })
                }
                if (text.toString().toLowerCase() === "kissmiss") {
                    await bot.sendMessage(chat.id, "Chasmiss");
                    return response.status(200).json({ status: "Ok" })
                }
            }

            if (audio) {
                await bot.sendMessage(chat.id, "No Action for audio");
                await bot.sendMessage(chat.id, " <b>Please go with Menu</b>", { parse_mode: "HTML" });
                return response.status(200).json({ status: "Ok" })
            }
            if (video) {
                await bot.sendMessage(chat.id, "No Action for video");
                await bot.sendMessage(chat.id, " <b>Please go with Menu</b>", { parse_mode: "HTML" });
                return response.status(200).json({ status: "Ok" })
            }
            if (document) {
                await bot.sendMessage(chat.id, "No Action for document");
                await bot.sendMessage(chat.id, " <b>Please go with Menu</b>", { parse_mode: "HTML" });
                return response.status(200).json({ status: "Ok" })
            }
            if (photo) {
                const picMsgId = photo[photo.length - 1].file_id
                const img = await bot.getFile(picMsgId)
                const imgab = await fetch(`https://api.telegram.org/file/bot7035670601:AAGm8l2ATEOFuNoftUyBY8eG5jVuCT8UCgI/${img.file_path}`)

                // const bbb = await imgab.blob()
                const buff = await imgab.arrayBuffer()
                // let bl = new Blob([buff])
                const buf = Buffer.from(buff) // CONVERT TO BUFFER FROM BUFFER ARRAY
                //const ba = buf.toString('base64')
                //  const uuuuu = new File([buff],"abcd.jpg",{type:"image/jpg"});
                // const tags = ExifReader.load(buf)

                const xyz = await sharp(buf).metadata()
                const shp = sharp(buf)

                await bot.sendMessage(chat.id, `format: <b>${xyz.format}</b> \nsize: <b>${(xyz.size / 1024).toFixed(2)} KB</b> \nwidth: <b>${xyz.width}</b> \nheight: <b>${(xyz.height)} </b> \nalphaChannel: <b>${xyz.hasAlpha} </b> \ndensity: <b>${(xyz.density)} </b> \nsubsampling: <b>${xyz.chromaSubsampling} </b> \nchannels: <b>${(xyz.channels)} </b>`, {
                    "reply_to_message_id": message_id,
                    "parse_mode": "HTML"
                })

                // await bot.sendMessage(chat.id, `<b>What you want to do with you photo?</b>`, {
                //     "reply_to_message_id": message_id,
                //     parse_mode: "HTML",
                //     "reply_markup": { "remove_keyboard": false, "inline_keyboard": keyboardbtn, "one_time_keyboard": true, }
                // })

                return response.status(200).json({ status: "Ok" })

            }

        }

        // if (body.callback_query) {
        //     console.log("callback_query", body.callback_query)
        //     const { message, data } = body.callback_query
        //     await bot.deleteMessage(message.chat.id, message.message_id)
        //     // await bot.sendMessage(message.chat.id, data)
        //     const { message_id, chat, reply_to_message } = message
        //     const picId = reply_to_message.photo[reply_to_message.photo.length - 1].file_id
        //     const img = await bot.getFile(picId)
        //     const imgpath = await fetch(`https://api.telegram.org/file/bot7035670601:AAGm8l2ATEOFuNoftUyBY8eG5jVuCT8UCgI/${img.file_path}`)
          
        //     const buff = await imgpath.arrayBuffer()
        //     const buf = Buffer.from(buff)
        //     // console.log("arrayBuffer",buf)
        //     // const xyz = await sharp(buf).metadata()
        //     // const shp = sharp(buf)

        // }
        return response.status(200).json({ status: "Ok" })

    }
    catch (error) {
        console.error('Error sending message');
        console.log(error.toString());
        return response.status(505).json({ status: "Server Error" })
    }

};


