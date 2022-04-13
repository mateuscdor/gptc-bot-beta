'use strict'
const { fetchLatestBaileysVersion, default: WASocket, makeWASocket, makeInMemoryStore, BufferJSON, initInMemoryKeyStore, DisconnectReason, AnyMessageContent, delay, useSingleFileAuthState, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, proto, downloadContentFromMessage, MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")
const { Boom } = require('@hapi/boom');
const Pino = require('pino');
const fs = require('fs');
const axios = require("axios");
const moment = require("moment-timezone");
const { state, saveState } = useSingleFileAuthState('./sesson.json');
const desmsg = '*꧁༺𝗚𝗣𝗧𝗖𖣘𝗣𝗘𝗥𝗨𝗠𝗕𝗔𝗩𝗢𝗢𝗥༻꧂*'



async function BlackSudo () {

    const { version, isLatest } = await fetchLatestBaileysVersion();
	console.log(`Using: ${version}, newer: ${isLatest}`);
    const Ammu = WASocket({
		printQRInTerminal: true,
		auth: state,
		logger: Pino({ level: "silent" }),
		version: version,
        	browser: ['BlackSud', 'Safari','3.0'],
	});
    Ammu.ev.on("creds.update", saveState);
    Ammu.ev.on("connection.update", async (up) => {
		const { lastDisconnect, connection } = up;
		if (connection) {
			console.log("Connection Status: ",connection);
            console.log('Server started');
		};
        if (connection === 'open') return Ammu.sendMessage('919188346721@s.whatsapp.net',{ text: 'IAM ONLINE '});
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

    //Ammu.ev.on("connection.update", async (up) => { });
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
            const isGroup = from.endsWith('@g.us');

            await Ammu.sendPresenceUpdate('unavailable', from)
            const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid;
            const sudon = ['919188346721','917510153501','919562388758'];
            const SUDO = sudon.includes(sender.split('@')[0]); //sender.split('@')[0] == '919188346721' || sender.split('@')[0] == '917510153501'
            const pushname = msg.pushName === undefined ? from.split('@')[0] : msg.pushName; // sender.split('@')[0] 

            var d = new Date();
            const hrs = d.getHours().toString().padStart(2, 0);
            const min = d.getMinutes().toString().padStart(2, 0);
            const sec = d.getSeconds().toString().padStart(2, 0);
            const day = d.getDate();
            const mon = d.getMonth() + 1;
            const year = d.getFullYear();
            const ampm = hrs >= 12 ? 'PM' : 'AM';
            const ihrv = hrs <= '09' ? hrs.split('0')[1] : hrs;
            const ihra = ['12','1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10','11','12'];
            const ihr = ihra[ihrv];
            const gn_text = ["😘𝙂𝙤𝙤𝙙 🙈𝙣𝙞𝙜𝙝𝙩 💫✨","🤗𝓖𝓸𝓸𝓭 🧚‍♀𝓷𝓲𝓰𝓱𝓽 ❄️✨","🌌❡០០ᖱ 🌙⩎ɨ❡ϦƬ 🌎","😘ցօօժ ⭐️ղíցհԵ 💝","🌃Ꮐᝪᝪᗞ 🙈ᑎᏆᏀᕼᎢ 💫✨","꧁༒♛ good nιgнт ♛༒꧂","𝓰𝓸𝓸𝓭 𝓷𝓲𝓰𝓱𝓽💕","ğôõd○ňîğht♧◇♤♡", "¥${☆.ĞØĐĎ ÑÎĢHŤ.☆}$¥", "❤️* *ǤØØĐ ŇƗǤĦŦ* *❤️💕🥰", "•𝓝𝓲𝓰𝓱𝓽☾", "꧁༺ ***** *ǤØØĐ ŇƗǤĦŦ*  ***** ༻", "❀◕ ‿ ◕❀₲ØØĐ ℕ𝕀𝔾𝕙𝕋❀◕ ‿ ◕❀", "🍃ᴳᴼᴼᴰ🍁ɴɪɢʜᴛ🥀", "GᴏᴏᴅNɪɢʜᴛ ☾", "꧁꧁✞ঔৣ۝☬  ☬۝ঔৣ🅶🅾🅾🅳🅽🅸🅶🅷", "●●●●●●♤♡ğøøđ ňīğhț♤♡●●●●●●●》》", "~*⏥____♡|•गुᴅ͢• • 🇳𝐈𝐆𝐇𝐓⃠•", "Good▄︻̷̿┻̿═━一night", "❤️ 𝔾𝕠𝕠𝕕 ℕ𝕚𝕘𝕙𝕥 ❤️", "♥●❥╚»♛«╝ 𝙣𝙞𝙜𝙝𝙩 ╚»♛«╝●❥♥", "•.,¸¸,.•¯💖 *Ǥ𝕠όᵈ 𝓝𝔦ⒼнŦ*", "ทۖ เ🅖█▬█ 𝔱", "✨𝔾𝕠𝕠𝕕 ℕ𝕚𝕘𝕙𝕥 ☽⋆✨", "GOoDnIgHt😗💛", "G⭐⭐D...NI:GHT", "♡✨ǤØØĐ ŇƗǤĦŦ✨♡", "♡ĞØØĐ ŇĪĞHȚ♡", "||____G⭕⭕d Night____||", "♡▪G•O•O•D~N•I•G•H•T▪♡", "●⃝ᶫᵒꪜe☯ᴳᶹʳᶹ᭄●⁴³", "❤️* *ǤØØĐ ŇƗǤĦŦ* *",  "•°•°•°GOOD NIGHT°•°•°•", "❤️good night✨⚡", "ᴳᴼᴼᴰ|ɴɪɢʜᴛ⋆", "Night ❤️💕🥰", "🍃ᴳᴼᴼᴰ🍁ɴɪɢʜᴛ", "Good Night 😴😴", "°~||...♪♪G∅∅D Π¡gH†♪♪...||~°", "Good night 😴🥱", "👻 Good Night 👻"];
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
            var wish_data = hrs < 12 ? gm_text[gm] : hrs <= 17 ? gf_text[gf] : hrs <= 19 ? ge_text[ge] : hrs <= 24 ? gn_text[gn] : gm_text[gm];
            var wish = '*'+wish_data+'*';
            function sleep(m) {return new Promise(r => setTimeout(r, m*60000));};
            async function delete_old(sendMsg) {
                try
                    {
                        var delete_umsg = JSON.parse(fs.readFileSync('json/delete/'+from.split('@')[0]+'.json'));
                        await Ammu.sendMessage(from, { delete: delete_umsg });
                        fs.writeFileSync('json/delete/'+from.split('@')[0]+'.json', JSON.stringify(sendMsg.key));
                    } catch {
                        fs.writeFileSync('json/delete/'+from.split('@')[0]+'.json', JSON.stringify(sendMsg.key));
                        console.log('[ERROR] => Message delete Akkanilla!');
                    }
            }

            if (isGroup) return
            switch (command) {
                case 'hi':
                case 'hlo':
                case 'hey':
                case 'hello':
                case 'menu':
                case 'hy':
                case 'hay':
                case 'hai':
                    //console.log(msg.message.extendedTextMessage.contextInfo.stanzaId)
                    //console.log(msg.message)
                    var sections = [
                        {
                            title: "📂HOME",
                            rows: [
                                {title: "❏ HOME", rowId: "home", description: "HOME"},
                                {title: "❏ ABOUT US", rowId: "about_us", description: "ABOUT US"},
                                {title: "❏ DEPARTMENTS", "rowId": "departments", description: "DEPARTMENTS"},
                                {title: "❏ PLACEMENT", "rowId": "placement", description: "PLACEMENT"},
                                {title: "❏ ACTIVITIES","rowId": "activities", description: "ACTIVITIES"},
                                {title: "❏ ADMISSION","rowId": "activities", description: "ACTIVITIES"},
                                {title: "❏ EOA","rowId": "eoa", description: "EOA"},
                                {title: "❏ MORE","rowId": "more", description: "MORE"},
                                {title: "❏ CONTACT US","rowId": "contact_us", description: "CONTACT US"}
                            ]
    
                        },
                    ]
                    var listMessage = {
                       text: '*Welcome to GPTC perumbavoor Whatsapp*\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala\n\n'+'🕰️ : '+ihr+':'+min+':'+sec+' '+ampm+'\n 📅 : '+day+'/'+mon+'/'+year,
                       footer: desmsg,
                       title: '*Hey @'+pushname+'*\n'+wish,
                       buttonText: '📁HOME',
                       sections
                    }
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg)                  
                break
                case 'home':
                    var button = [{buttonId: 'menu', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/College2.jpg'},
                        caption: "\n*❏ Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n\n*❏ Mission*\n⭐ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⭐ To apply technology in the traditional skills, thereby enhancing the living standard of the community.\n\n*❏ Accreditation Status*\nSelf-Assessment Report (SAR) is filed for NBA accreditation of Electronics and Communication Engineering, and Computer Engineering Programs. The accreditation visit is expected shortly.\n\n*❏ Quality Policy*\nIt is our commitment to impart quality skill education to our students. We understand that along with cognitive learning, the focus shall also be given to the sensory or psychomotor domain. We expect that our strategies shall help students behave or respond positively to the ever-progressing technological development and shall reap direct benefit from the scenario leading to sustainability. Sustainable development also promotes entrepreneurial thinking among the students.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg)  
                break
                case 'about_us':
                    await Ammu.sendMessage(from, { delete: msg.key });
                    
                    var button = [{buttonId: 'menu', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/College1.jpg'},
                        caption: "\n*═══════════ABOUT US═══════════*\n*Government Polytechnic College, Perumbavoor* had clear visibility in the state of Kerala as one of the best technical institutions providing quality skill education. With Skill – Excellence – Sustainability as our motto, we provide quality skill education to our students for their sustainable development. By nurturing the fundamental traits to excel in life through specialized training, the college is proposed as a center of excellence providing quality technical education to our students.Established in 1959 as a Junior Technical School, is upgraded to Polytechnic College in the year 1994. The college is managed by the Department of Technical Education under Higher Education, Government of Kerala. With an intake of 60 students to each Diploma program of\n⭐ Mechanical Engineering \n⭐ Computer Engineering\n⭐ Electronics and Communication Engineering and,\nall the programs are approved by the All India Council for Technical Education (AICTE), New Delhi, and are affiliated with the Kerala State Board of Technical Education. Department of Electronics and Communication Engineering and the Department of Computer Engineering had already filed Self-Assessment Report (SAR) for NBA accreditation, the expert visit is in due.\n           The college is situated in a sprawling campus of 6.93 acres, nestled among the lush greenery of Koovapady Panchayath in the middle of Ernakulum District, providing a pleasant atmosphere for the students for their emotional development.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg)
                break
                case '🔙':
                case 'thank':
                case 'thanks':
                    var reactionMessage = {
                        react: {
                            text: "💖",
                            key: msg.key
                        }
                    }
                    Ammu.sendMessage(from, reactionMessage);
                break
                case '.genaraladmin':
                case 'office':
                case 'staff':
                case 'staffs':
                    var  sections = [
                        {
                            title: "STAFFS",
                            rows: [
                                {title: "Dr. AIJU THOMAS", rowId: "principal", description: "Principal"},
                                {title: "BABU PRADEEP", rowId: "seniorsuperintendent",  description: "Senior Superintendent"},
                                {title: "LISSY K K", rowId: "headaccountant",  description: "Head Accountant"},
                                {title: "Jini A R", "rowId": "seniorclerk",   description: "Senior clerk"},
                            ] 
                        },
                    ]
                    var listMessage = {
                        text: 'The college is established by Higher Education Department of Government of Kerala under Department of Technical Education. Hierarchy of Governance is as shown below.\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala',
                        footer: desmsg,
                        title: "*OFFICE*",
                        buttonText: "📁STAFF",
                        sections
                    }
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg);
                break
                case 'principal':
                    var templateButtons = [ 
                        {index: 1, callButton: {displayText: 'Mobile Number', phoneNumber: '+919447388010'}},
                        {index: 2, urlButton:  {displayText: 'Email-id', url: 'mailto:aiju.thomas@gmail.com'}},
                        {index: 2, quickReplyButton: {displayText: '🔙', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/53.jpg'},
                        caption: "         *Dr. AIJU THOMAS*\n❏ Designation : Principal\n",
                        footerText: desmsg,
                        templateButtons: templateButtons,
                        headerType: 4
                    }

                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg); 
                break
                case 'seniorsuperintendent':
                    var templateButtons = [ 
                        {index: 1, callButton: {displayText: 'Mobile Number', phoneNumber: '+919446684378'}},
                        {index: 2, quickReplyButton: {displayText: '🔙', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/55.jpg'},
                        caption: "         *BABU PRADEEP*\n❏ Designation : Senior Superintendent\n",
                        footerText: desmsg,
                        templateButtons: templateButtons,
                        headerType: 4
                    }

                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg); 
                break
                case 'headaccountant':
                    var templateButtons = [ 
                        {index: 1, callButton: {displayText: 'Mobile Number', phoneNumber: '+919495424817'}},
                        {index: 2, quickReplyButton: {displayText: '🔙', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/56.jpg'},
                        caption: "         *LISSY K K*\n❏ Designation : Head Accountant\n",
                        footerText: desmsg,
                        templateButtons: templateButtons,
                        headerType: 4
                    }

                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg); 
                break
                case 'seniorclerk':
                    var templateButtons = [ 
                        {index: 1, callButton: {displayText: 'Mobile Number', phoneNumber: '+919562857224'}},
                        {index: 2, urlButton:  {displayText: 'Email-id', url: 'mailto:arjiniprasad@gmail.com'}},
                        {index: 2, quickReplyButton: {displayText: '🔙', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/14.jpg'},
                        caption: "         *Jini A R*\n❏ Designation : Senior clerk\n❏ Qualifications  :  Diploma in Electronics Production Technology\n",
                        footerText: desmsg,
                        templateButtons: templateButtons,
                        headerType: 4
                    }

                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case 'departments':
                    var sections = [
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
                    ]
                    var listMessage = {
                       text: 'Phone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala',
                       footer: desmsg,
                       title: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR",
                       buttonText: "📁Departments",
                       sections
                    }
                 
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg);
                break
                case '.gendep':
                    var button = [{buttonId: 'departments', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                            text: "\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n\n*❏ Institution Mission*\n⭐ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⭐ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                            footer: desmsg,
                            buttons: button,
                            headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.comen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/CT.jpg'},
                        caption: "\n*COMPUTER ENGINEERING*\nThe Computer Engineering Department was established in the year 1995. The department offers a three-year Diploma in Computer Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n*❏ Infrastructural Facilities*\nThe department is housed in Computer Engineering block with\n⭐ Well-appointed three numbers of classrooms.\n⭐ Five numbers of well-equipped laboratories\n\n*❏ Vision of the Department*\nExcel as a center of skill education in Computer Engineering moulding professionals who sincerely strive for the betterment of themselves and society.\n*❏ Mission of the Department*\n⭐ To impart state of the art, knowledge, skill and attitude to the graduates ensuring sustainable development.\n⭐ To develop adaptiveness for being competent to acquaint with the technological changes.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.ecen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/EC.jpg'},
                        caption: "\n*Electronics & Communication Engineering*\nThe Electronics and Communication Engineering Department was established in the year 1995. The department offers a three-year Diploma in Electronics and Communication Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n\n*❏ Infrastructural Facilities*\nThe department is housed in Academic Block - 1 with\n⭐ Well-appointed three numbers of classrooms.\n⭐ Mini seminar hall with online conferencing facility\n⭐ Six numbers well-equipped laboratories\n\n*❏ Services Offered*\n\nProduction and Training Center (PAT)\nPAT is a project of the Department of Technical Education. PAT currently manufactures AVR trainer kits and 8051 trainer kits. These kits are currently being used by the majority of Polytechnic Colleges in the state.\n\n*❏ Self-Maintenance Cell (SMC)*\nSelf-maintenance Cell offers technical support by way of maintenance and repair of electronic equipment and computers of various departments. These services are now offered to other government and private organizations as outreach programs. varruction of a new academic block for the department for an estimated cost of Rs. 12 crores is in progress",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.meen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        text: "\n*MECHANICAL ENGINEERING*\n\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*❏ Institution Mission*\n⭐ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⭐ To apply technology in the traditional skills, thereby enhancing the living standard of the community.\n*❏ Mechanical Engineering Vision*\nExcel as a centre of skill education in mechanical engineering moulding professionals who strive for the betterment of society\n*❏ Mechanical Engineering Mission*\n⭐ Provide state of art knowledge, skill and transform the students into responsible professionals for the sustainable development of society.\n⭐ Provide good infrastructure facilities so that students will gain hands on experience by using various equipment and software.\n⭐ Inculcate the habit of self-learning to enhance the employability.",
                        footer: desmsg,
                        buttons: button,
                        headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.genwksh':
                    var button = [{buttonId: 'departments', buttonText: {displayText: '🔙'}, type: 1}]
                    var buttonMessage = {
                        text: "\n*WORKSHOP*\n\n*❏ Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*❏ Institution Mission*\n⭐ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\n⭐ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                        footer: desmsg,
                        buttons: button,
                        headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break








                case 'log':
                    console.log(pushname,msg.pushName,msg.key.remoteJid,args);
                    //delete_old(from);
                    var loadi = await Ammu.sendMessage(from, { text: '@'+pushname, mention: [sender]});
                    console.log(loadi.key)
                break
                case 'num':
                case 'number':
                    var vcard = 'BEGIN:VCARD\n'+ 'VERSION:3.0\n'+ `FN:GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n`+ `ORG: GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR ;\n`+ `TEL;type=CELL;type=VOICE;waid=04842649251:04842649251\n`+ 'END:VCARD'.trim()
                    Ammu.sendMessage(from, { contacts: { displayName: 'GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR', contacts: [{ vcard }]}},{quoted: msg });
                break
                case 'condact':
                case 'info':
                    var templateButtons = [
                        {index: 1, urlButton: {displayText: 'WEBSITE', url: 'https://gptcperumbavoor.ac.in'}},
                        {index: 2, callButton: {displayText: 'NUMBER', phoneNumber: '0484-2649251'}},
                        {index: 3, urlButton: {displayText: 'MAP', url: 'https://www.google.com/maps/place/Government+Polytechnic+College,+Perumbavoor/@10.1447946,76.4534265,13z/data=!4m5!3m4!1s0x0:0x47fd460af5bb0b36!8m2!3d10.1500656!4d76.4759264'}},
                        {index: 4, urlButton: {displayText: 'MAIL', url: 'gptcpbvr@gmail.com'}},
                    ]
            
                    var templateMessage = {
                        text: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala",
                        footer: desmsg,
                        templateButtons: templateButtons
                    }
                    Ammu.sendMessage(from, templateMessage,{quoted: msg });
                break
                case 'like':
                        var reactionMessage = {
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
		        
                    var sections = [
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
                                {title: "OFFICE", rowId: "office"},
                                {title: "WEBSITE", rowId: "weblink"},
                                {title: "Departments", rowId: "departments"},
                                {title: "INFO", "rowId": "info"},
                           ]
                        },
                    ]
                    var listMessage = {
                       text: 'Phone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala',
                       footer: desmsg,
                       title: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR",
                       buttonText: "Departments",
                       sections
                    }
                 
                    Ammu.sendMessage(from, listMessage);
                break
                
                
                
                case 'weblink':
                    var weblink_templateButtons = [
                        {index: 1, urlButton: {displayText: 'WEBSITE', url: 'https://gptcperumbavoor.ac.in'}},
                        {index: 4, urlButton: {displayText: 'MAIL', url: 'mailto:gptcpbvr@gmail.com'}},
                    ]
                
                    var weblink_templateMessage = {
                        text: "GOVERNMENT POLYTECHNIC COLLEGE PERUMBAVOOR\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala",
                        footer: desmsg,
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
