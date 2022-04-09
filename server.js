'use strict'
const { fetchLatestBaileysVersion, default: WASocket, makeWASocket, makeInMemoryStore, BufferJSON, initInMemoryKeyStore, DisconnectReason, AnyMessageContent, delay, useSingleFileAuthState, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, proto, downloadContentFromMessage, MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")
const { Boom } = require('@hapi/boom');
const Pino = require('pino');
const fs = require('fs');
const axios = require("axios");
const moment = require("moment-timezone");
const { state, saveState } = useSingleFileAuthState('./sesson.json');


async function BlackSudo () {

    const { version, isLatest } = await fetchLatestBaileysVersion();
	console.log(`Using: ${version}, newer: ${isLatest}`);
    const Ammu = WASocket({
		printQRInTerminal: true,
		auth: state,
		logger: Pino({ level: "silent" }),
		version: version,
        	browser: ['BlackSudo', 'safari','3.0'],
	});
    Ammu.ev.on("creds.update", saveState);
    Ammu.ev.on("connection.update", async (up) => {
		const { lastDisconnect, connection } = up;
		if (connection) {
			console.log("Connection Status: ",connection);
            console.log('Server started');
		};
		if (connection === "close") {
			let reason = new Boom(lastDisconnect.error).output.statusCode;
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete and Scan Again`);
				Ammu.logout();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				Ammu.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Delete and Scan Again.`);
				Ammu.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
			} else {
				Ammu.end(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`);
			};
		};
    });

    Ammu.ev.on("messages.upsert", async (mp) => {
        try {
            if(!mp.messages) return
            const msg = mp.messages[0]
            if (!msg.message) return
            msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message;
            if (msg.key && msg.key.remoteJid === 'status@broadcast') return
            if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16) return
            const fromMe = msg.key.fromMe;
            const content = JSON.stringify(msg.message);
            const from = msg.key.remoteJid;
            const type = Object.keys(msg.message)[0];
            const cmd = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && msg.message.listResponseMessage.title) ? msg.message.listResponseMessage.title : "";
            const body = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ? msg.message.imageMessage.caption : (type == 'videoMessage') ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId || (type == 'listResponseMessage' ? msg.msg.singleSelectReply.selectedRowId : '') || msg.msg.text || msg.msg.caption || msg.msg || '') : '';
            const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : '';
            const command = body.trim().split(/ +/).shift().toLowerCase();
            const args = body.trim().split(/ +/).slice(1);
            const botNumber = Ammu.user.id.split(':')[0] + '@s.whatsapp.net';
            const owners = ['919188346721@s.whatsapp.net','917510153501@s.whatsapp.net'];
            const isGroup = from.endsWith('@g.us');
            const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid;
            const isOwner = owners.includes(sender);
            const pushname =   sender.split('@')[0]  // msg.pushName === undefined ? from.split('@')[0] : msg.pushName;

            var d = new Date();
            const hrs = d.getHours().toString().padStart(2, 0);
            const min = d.getMinutes().toString().padStart(2, 0);
            const sec = d.getSeconds().toString().padStart(2, 0);
            const day = d.getDate();
            const mon = d.getMonth() + 1;
            const year = d.getFullYear();
            const ampm = hrs >= 12 ? 'PM' : 'AM';
            const ihra = ['12','1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10','11','12'];
            const ihr = ihra[hrs];
            const gn_text = ["😘𝙂𝙤𝙤𝙙 🙈𝙣𝙞𝙜𝙝𝙩 💫✨","🤗𝓖𝓸𝓸𝓭 🧚‍♀𝓷𝓲𝓰𝓱𝓽 ❄️✨","🌌❡០០ᖱ 🌙⩎ɨ❡ϦƬ 🌎","😘ցօօժ ⭐️ղíցհԵ 💝","🌃Ꮐᝪᝪᗞ 🙈ᑎᏆᏀᕼᎢ 💫✨","꧁༒♛ good nιgнт ♛༒꧂","𝓰𝓸𝓸𝓭 𝓷𝓲𝓰𝓱𝓽💕","ğôõd○ňîğht♧◇♤♡", "¥${☆.ĞØĐĎ ÑÎĢHŤ.☆}$¥", "❤️* *ǤØØĐ ŇƗǤĦŦ* *❤️💕🥰", "•𝓝𝓲𝓰𝓱𝓽☾", "꧁༺ ***** *ǤØØĐ ŇƗǤĦŦ*  ***** ༻", "❀◕ ‿ ◕❀₲ØØĐ ℕ𝕀𝔾𝕙𝕋❀◕ ‿ ◕❀", "🍃ᴳᴼᴼᴰ🍁ɴɪɢʜᴛ🥀", "GᴏᴏᴅNɪɢʜᴛ ☾", "꧁꧁✞ঔৣ۝☬  ☬۝ঔৣ🅶🅾🅾🅳🅽🅸🅶🅷", "●●●●●●♤♡ğøøđ ňīğhț♤♡●●●●●●●》》", "~*⏥____♡|•गुᴅ͢• • 🇳𝐈𝐆𝐇𝐓⃠•", "Good▄︻̷̿┻̿═━一night", "❤️ 𝔾𝕠𝕠𝕕 ℕ𝕚𝕘𝕙𝕥 ❤️", "♥●❥╚»♛«╝ 𝙣𝙞𝙜𝙝𝙩 ╚»♛«╝●❥♥", "•.,¸¸,.•¯💖 *Ǥ𝕠όᵈ 𝓝𝔦ⒼнŦ*", "ทۖ เ🅖█▬█ 𝔱", "✨𝔾𝕠𝕠𝕕 ℕ𝕚𝕘𝕙𝕥 ☽⋆✨", "GOoDnIgHt😗💛", "G⚫⚫D...NI:GHT", "♡✨ǤØØĐ ŇƗǤĦŦ✨♡", "♡ĞØØĐ ŇĪĞHȚ♡", "||____G⭕⭕d Night____||", "♡▪G•O•O•D~N•I•G•H•T▪♡", "●⃝ᶫᵒꪜe☯ᴳᶹʳᶹ᭄●⁴³", "❤️* *ǤØØĐ ŇƗǤĦŦ* *",  "•°•°•°GOOD NIGHT°•°•°•", "❤️good night✨⚡", "ᴳᴼᴼᴰ|ɴɪɢʜᴛ⋆", "Night ❤️💕🥰", "🍃ᴳᴼᴼᴰ🍁ɴɪɢʜᴛ", "Good Night 😴😴", "°~||...♪♪G∅∅D Π¡gH†♪♪...||~°", "Good night 😴🥱", "👻 Good Night 👻"];
            const gm_text = ["❀🍃Good❀ ❀morning❀🥰❀","☘️𝐺𝑜𝑜𝑑 🌅𝑚𝑜𝑟𝑛𝑖𝑛𝑔 💐","🍃𝙶𝚘𝚘𝚍 🌻𝚖𝚘𝚛𝚗𝚒𝚗𝚐 🥰","🍀𝗚𝗼𝗼𝗱 😘𝗺𝗼𝗿𝗻𝗶𝗻𝗴 🌸","🌻𝓖𝓸𝓸𝓭 𝓶𝓸𝓻𝓷𝓲𝓷𝓰 💞","🌼🅖🅞🅞🅓 🅜🅞🅡🅝🅘🅝🅖 🐶","🍃Ⓖⓞⓞⓓ 🌈ⓜⓞⓡⓝⓘⓝⓖ 🥰",   "♥ 🌅 𝐆𝔬𝓸𝕕 𝐦σＲŇ𝓘η𝑔 🌤️ 🐣ൠ",   "💖´ •.¸♥¸.•* G͛⦚o͛⦚o͛⦚d͛⦚ M͛⦚o͛⦚r͛⦚n͛⦚i͛⦚n͛⦚g͛⦚ *•.¸♥¸.•´💖", "˜”°•.˜”°• Good Morning •°”˜.•°”˜",  "(༒G●●d M●RNINg༒)", "꧁༺ɢօօɖ ʍօʀռɨռɢ༻꧂", "꧁ɢȏȏԀ༒ṃȏяṅıṅɢ࿐", "꧁༒☬Good Morning ☬༒꧂", "⚡GØoͥdmͣoͫrήiήg⚡", "★🅶🅾🅾🅳 🅼🅾🆁🅽🅸🅽🅶★", "🄶🄾🄾🄳∞︎︎♡🄼🄾🅁🄽🄸🄽🄶",  "⚡꧁ɢȏȏԀ༒ṃȏяṅıṅɢ࿐,⚡","❣️ Ｇｏｏｄ Ｍｏｒｎｉｎｇ ❣️", "🌹 ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌹", "🌅 𝔾𝕠𝕠𝕕 𝕄𝕠𝕣𝕟𝕚𝕟𝕘 🌤️", "🌄 𝒢𝑜𝑜𝒹 𝑀𝑜𝓇𝓃𝒾𝓃𝑔 🌟", "🌅 ₲ØØĐ ₥ØⱤ₦ł₦₲ 🌻", "💕 GӨӨD MӨЯПIПG 💕", "🌅 𝙶𝚘𝚘𝚍 𝙼𝚘𝚛𝚗𝚒𝚗𝚐 🌤️", "🌅 𝓖𝓸𝓸𝓭 𝓜𝓸𝓻𝓷𝓲𝓷𝓰 🌤️",  "🥰 gσσ∂ мσяηιηg 🌅", "💐 GððÐ Mðrñïñg 💐", "🌹 Good Morning 🌹", "🌹 Gₒₒd ₘₒᵣₙᵢₙg 🌹", "🌅 ᴳᵒᵒᵈ ᴹᵒʳⁿⁱⁿᵍ 🌤️", "🌅 𝔊𝔬𝔬𝔡 𝔐𝔬𝔯𝔫𝔦𝔫𝔤 🌤️", "🌺 𝕲𝖔𝖔𝖉 𝕸𝖔𝖗𝖓𝖎𝖓𝖌 🌺",  "🌅️ ɓuıuɹoW poo⅁⛅"];
	        const gf_text = ["ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌞","𝓖𝓸𝓸𝓭 𝓐𝓯𝓽𝓮𝓻𝓷𝓸𝓸𝓷", "𝔾𝕠𝕠𝕕 𝔸𝕗𝕥𝕖𝕣𝕟𝕠𝕠𝕟", "𝒢ℴℴ𝒹 𝒜𝒻𝓉ℯ𝓇𝓃ℴℴ𝓃", "𝓖𝓸𝓸𝓭 𝓐𝓯𝓽𝓮𝓻𝓷𝓸𝓸𝓷"];
	        const ge_text = ["ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌥","𝓖𝓸𝓸𝓭 𝓮𝓿𝓮𝓷𝓲𝓷𝓰", "𝔾𝕠𝕠𝕕 𝕖𝕧𝕖𝕟𝕚𝕟𝕘", "𝕲𝖔𝖔𝖉 𝖊𝖛𝖊𝖓𝖎𝖓𝖌", "𝒢ℴℴ𝒹 ℯ𝓋ℯ𝓃𝒾𝓃ℊ", "𝓖𝓸𝓸𝓭 𝓮𝓿𝓮𝓷𝓲𝓷𝓰"];
            var gn_len = gn_text.length;
            var gm_len = gm_text.length;
		    var gf_len = gf_text.length;
            var ge_len = ge_text.length;
	        var gn = Math.floor(gn_len*Math.random());
	        var gm = Math.floor(gm_len*Math.random());
		    var gf = Math.floor(gf_len*Math.random());
	        var ge = Math.floor(ge_len*Math.random());
            var wish = hrs < 12 ? gm_text[gm] : hrs <= 17 ? gf_text[gf] : hrs <= 19 ? ge_text[ge] : hrs <= 24 ? gn_text[gn] : gm_text[gm]
		   
            switch (command) {

                case 'hi':
                case 'hlo':
                case 'hey':
                case 'hello':
                     Ammu.sendMessage(from, { text: 'Hey @'+sender.split('@')[0]+' Type menu to get info', mentions: [sender] });
                break
                case 'log':
                    console.log(pushname);
                    Ammu.sendMessage(from, { text: '@'+pushname});
                break
                case 'num':
                case 'number':
                    const vcard = 'BEGIN:VCARD\n'+ 'VERSION:3.0\n'+ `FN:GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n`+ `ORG: GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR ;\n`+ `TEL;type=CELL;type=VOICE;waid=04842649251:04842649251\n`+ 'END:VCARD'.trim()
                     Ammu.sendMessage(from, { contacts: { displayName: 'GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR', contacts: [{ vcard }]}},{quoted: msg });
                break
                case 'condact':
                case 'info':
                    const templateButtons = [
                        {index: 1, urlButton: {displayText: 'WEBSITE', url: 'https://gptcperumbavoor.ac.in'}},
                        {index: 2, callButton: {displayText: 'NUMBER', phoneNumber: '0484-2649251'}},
                        {index: 3, urlButton: {displayText: 'MAP', url: 'https://www.google.com/maps/place/Government+Polytechnic+College,+Perumbavoor/@10.1447946,76.4534265,13z/data=!4m5!3m4!1s0x0:0x47fd460af5bb0b36!8m2!3d10.1500656!4d76.4759264'}},
                        {index: 4, urlButton: {displayText: 'MAIL', url: 'gptcpbvr@gmail.com'}},
                    ]
            
                    const templateMessage = {
                        text: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala",
                        footer: '©️BlackSudo',
                        templateButtons: templateButtons
                    }
                    Ammu.sendMessage(from, templateMessage,{quoted: msg });
                break
                case 'like':
                        const reactionMessage = {
                            react: {
                                text: "💖",
                                key: msg.key
                            }
                        }      
                    Ammu.sendMessage(from, reactionMessage);
                break
                case 'departments':
                case 'course':
                case 'courses':
		    case 'menu':
                    const sections = [
                        {
                            title: "Departments",
                            rows: [
                                {title: "General Department", rowId: ".gendep", description: "For About General Department"},
                                {title: "Computer Engineering", rowId: ".comen", description: "For About Computer Engineering"},
                                {title: "Electronics & Communication Engineering", "rowId": ".ecen", description: "For About Electronics & Communication Engineering"},
                                {title: "Mechanical Engineering", "rowId": ".meen", description: "For About Mechanical Engineering"},
                                {title: "General Workshop","rowId": ".genwksh", description: "For About General Workshop"}
                            ]
    
                        },
                        {
                            title: "ABOUT",
                            rows: [
                                {title: "WEBSITE", rowId: "weblink"},
                                {title: "Departments", rowId: "departments"},
                                {title: "INFO", "rowId": "info"},
                           ]
                        },
                    ]
                    const listMessage = {
                       text: 'Phone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala',
                       footer: "©️BlackSudo",
                       title: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR",
                       buttonText: "Departments",
                       sections
                    }
                 
                    Ammu.sendMessage(from, listMessage);
                break
                case '.gendep':
                    const gendepbutton = [
                          {buttonId: 'info', buttonText: {displayText: 'INFO'}, type: 1},
                          {buttonId: 'departments', buttonText: {displayText: 'Departments'}, type: 1},
                    ]
                    const gendepbuttonMessage = {
                            text: "\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n\n*❏ Institution Mission*\n⚫ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⚫ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                            footer: '©️BlackSudo',
                            buttons: gendepbutton,
                            headerType: 1
                    }
                    Ammu.sendMessage(from, gendepbuttonMessage);
                break
                case '.comen':
                    const comenbutton = [
                        {buttonId: 'info', buttonText: {displayText: 'INFO'}, type: 1},
                        {buttonId: 'departments', buttonText: {displayText: 'Departments'}, type: 1},
                    ]
                    const comenbuttonMessage = {
                        image: {url: 'images/CT.jpg'},
                        caption: "\n*COMPUTER ENGINEERING*\nThe Computer Engineering Department was established in the year 1995. The department offers a three-year Diploma in Computer Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n*❏ Infrastructural Facilities*\nThe department is housed in Computer Engineering block with\n⚫ Well-appointed three numbers of classrooms.\n⚫ Five numbers of well-equipped laboratories\n\n*❏ Vision of the Department*\nExcel as a center of skill education in Computer Engineering moulding professionals who sincerely strive for the betterment of themselves and society.\n*❏ Mission of the Department*\n⚫ To impart state of the art, knowledge, skill and attitude to the graduates ensuring sustainable development.\n⚫ To develop adaptiveness for being competent to acquaint with the technological changes.",
                        footerText: '©️BlackSudo',
                        buttons: comenbutton,
                        headerType: 4
                    }
                  Ammu.sendMessage(from, comenbuttonMessage);
                break
                case '.ecen':
                    const ecenbutton = [
                        {buttonId: 'info', buttonText: {displayText: 'INFO'}, type: 1},
                        {buttonId: 'departments', buttonText: {displayText: 'Departments'}, type: 1},
                    ]
                    const ecenbuttonMessage = {
                        image: {url: 'images/EC.jpg'},
                        caption: "\n*Electronics & Communication Engineering*\nThe Electronics and Communication Engineering Department was established in the year 1995. The department offers a three-year Diploma in Electronics and Communication Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n\n*❏ Infrastructural Facilities*\nThe department is housed in Academic Block - 1 with\n⚫ Well-appointed three numbers of classrooms.\n⚫ Mini seminar hall with online conferencing facility\n⚫ Six numbers well-equipped laboratories\n\n*❏ Services Offered*\n\nProduction and Training Center (PAT)\nPAT is a project of the Department of Technical Education. PAT currently manufactures AVR trainer kits and 8051 trainer kits. These kits are currently being used by the majority of Polytechnic Colleges in the state.\n\n*❏ Self-Maintenance Cell (SMC)*\nSelf-maintenance Cell offers technical support by way of maintenance and repair of electronic equipment and computers of various departments. These services are now offered to other government and private organizations as outreach programs. Construction of a new academic block for the department for an estimated cost of Rs. 12 crores is in progress",
                        footerText: '©️BlackSudo',
                        buttons: ecenbutton,
                        headerType: 4
                    }
                    Ammu.sendMessage(from, ecenbuttonMessage);
                break
                case '.meen':
                    const meenbutton = [
                        {buttonId: 'info', buttonText: {displayText: 'INFO'}, type: 1},
                        {buttonId: 'departments', buttonText: {displayText: 'Departments'}, type: 1},
                    ]
                    const meenbuttonMessage = {
                        text: "\n*MECHANICAL ENGINEERING*\n\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*❏ Institution Mission*\n⚫ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⚫ To apply technology in the traditional skills, thereby enhancing the living standard of the community.\n*❏ Mechanical Engineering Vision*\nExcel as a centre of skill education in mechanical engineering moulding professionals who strive for the betterment of society\n*❏ Mechanical Engineering Mission*\n⚫ Provide state of art knowledge, skill and transform the students into responsible professionals for the sustainable development of society.\n⚫ Provide good infrastructure facilities so that students will gain hands on experience by using various equipment and software.\n⚫ Inculcate the habit of self-learning to enhance the employability.",
                        footer: '©️BlackSudo',
                        buttons: meenbutton,
                        headerType: 1
                    }
                    Ammu.sendMessage(from, meenbuttonMessage);
                break
                case '.genwksh':
                    const genwkshbutton = [
                        {buttonId: 'info', buttonText: {displayText: 'INFO'}, type: 1},
                        {buttonId: 'departments', buttonText: {displayText: 'Departments'}, type: 1},
                    ]
                    const genwkshbuttonMessage = {
                        text: "\n*WORKSHOP*\n\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*❏ Institution Mission*\n⚫ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⚫ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                        footer: '©️BlackSudo',
                        buttons: genwkshbutton,
                        headerType: 1
                    }
                  Ammu.sendMessage(from, genwkshbuttonMessage);
                break
                case 'weblink':
                    const weblink_templateButtons = [
                        {index: 1, urlButton: {displayText: 'WEBSITE', url: 'https://gptcperumbavoor.ac.in'}},
                        {index: 4, urlButton: {displayText: 'MAIL', url: 'mailto:gptcpbvr@gmail.com'}},
                    ]
            
                    const weblink_templateMessage = {
                        text: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala",
                        footer: '©️BlackSudo',
                        templateButtons: weblink_templateButtons
                    }
                    Ammu.sendMessage(from, weblink_templateMessage,{quoted: msg });
                break

                default:
            }

        } catch (e) {
            e = String(e);
            console.log('[ERROR] => ',e);
            Ammu.sendMessage('919188346721@s.whatsapp.net',{ text: '[ERROR] => ' + e});
        }

    });
}
BlackSudo ()
