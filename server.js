'use strict'
const { fetchLatestBaileysVersion, default: WASocket, makeWASocket, makeInMemoryStore, BufferJSON, initInMemoryKeyStore, DisconnectReason, AnyMessageContent, delay, useSingleFileAuthState, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, proto, downloadContentFromMessage, MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")
const { Boom } = require('@hapi/boom');
const { Sequelize, DataTypes } = require('sequelize');
const Pino = require('pino');
const fs = require('fs');
const axios = require("axios");
const moment = require("moment-timezone");
const DataBase = new Sequelize({ dialect: "sqlite", storage: './DB/DB.db'});
const { state, saveState } = useSingleFileAuthState('./session.json');
const desmsg = '*κ§ΰΌΊππ£π§ππ£π£ππ₯π¨π πππ©π’π’π₯ΰΌ»κ§*'



async function BlackSudo () {

    const { version, isLatest } = await fetchLatestBaileysVersion();
	console.log(`Using: ${version}, newer: ${isLatest}`);
    const Ammu = WASocket({
		printQRInTerminal: true,
		auth: state,
		logger: Pino({ level: "silent" }),
		version: version,
        	browser: ['BlackSudo', 'Safari','3.0'],
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
            const SUDO_n = ['917510153501','919188346721'];
            const SUDO = SUDO_n.includes(sender.split('@')[0]);
            const blacksudo_n = ['917510153501','919188346721','919562388758','917736943178','918921590693','918606261072','919447388010'];
            const BLACK_SUDO_N = blacksudo_n.includes(sender.split('@')[0]);
            const pushname = msg.pushName === undefined ? sender.split('@')[0] : msg.pushName;

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
            const gn_text = ["πππ€π€π ππ£ππππ© π«β¨","π€ππΈπΈπ­ π§ββπ·π²π°π±π½ βοΈβ¨","πβ‘α α α± πβ©Ι¨β‘Ο¦Ζ¬ π","πΦΦΦΥͺ β­οΈΥ²Γ­ΦΥ°Τ΅ π","πααͺαͺα πααααΌα’ π«β¨","κ§ΰΌβ good nΞΉgΠ½Ρ βΰΌκ§","π°πΈπΈπ­ π·π²π°π±π½π","ΔΓ΄Γ΅dβΕΓ?Δhtβ§ββ€β‘", "Β₯${β.ΔΓΔΔ ΓΓΔ’HΕ€.β}$Β₯", "β€οΈ* *Η€ΓΓΔ ΕΖΗ€Δ¦Ε¦* *β€οΈππ₯°", "β’ππ²π°π±π½βΎ", "κ§ΰΌΊ ***** *Η€ΓΓΔ ΕΖΗ€Δ¦Ε¦*  ***** ΰΌ»", "ββ βΏ βββ²ΓΓΔ βππΎππββ βΏ ββ", "πα΄³α΄Όα΄Όα΄°πΙ΄ΙͺΙ’Κα΄π₯", "Gα΄α΄α΄NΙͺΙ’Κα΄ βΎ", "κ§κ§βΰ¦ΰ§£Ϋβ¬  β¬Ϋΰ¦ΰ§£πΆπΎπΎπ³π½πΈπΆπ·", "βββββββ€β‘ΔΓΈΓΈΔ ΕΔ«ΔhΘβ€β‘βββββββγγ", "~*β₯____β‘|β’ΰ€ΰ₯α΄Ν’β’ β’ π³ππππβ β’", "GoodβοΈ»Μ·ΜΏβ»ΜΏββδΈnight", "β€οΈ πΎπ π π βππππ₯ β€οΈ", "β₯ββ₯βΒ»βΒ«β π£ππππ© βΒ»βΒ«βββ₯β₯", "β’.,ΒΈΒΈ,.β’Β―π *Η€π Οα΅ ππ¦βΌΠ½Ε¦*", "ΰΈΫ ΰΉπββ¬β π±", "β¨πΎπ π π βππππ₯ β½ββ¨", "GOoDnIgHtππ", "Gβ­β­D...NI:GHT", "β‘β¨Η€ΓΓΔ ΕΖΗ€Δ¦Ε¦β¨β‘", "β‘ΔΓΓΔ ΕΔͺΔHΘβ‘", "||____Gβ­β­d Night____||", "β‘βͺGβ’Oβ’Oβ’D~Nβ’Iβ’Gβ’Hβ’Tβͺβ‘", "ββαΆ«α΅κͺeβ―α΄³αΆΉΚ³αΆΉα­ββ΄Β³", "β€οΈ* *Η€ΓΓΔ ΕΖΗ€Δ¦Ε¦* *",  "β’Β°β’Β°β’Β°GOOD NIGHTΒ°β’Β°β’Β°β’", "β€οΈgood nightβ¨β‘", "α΄³α΄Όα΄Όα΄°|Ι΄ΙͺΙ’Κα΄β", "Night β€οΈππ₯°", "πα΄³α΄Όα΄Όα΄°πΙ΄ΙͺΙ’Κα΄", "Good Night π΄π΄", "Β°~||...βͺβͺGββD Ξ Β‘gHβ βͺβͺ...||~Β°", "Good night π΄π₯±", "π» Good Night π»"];
            const gm_text = ["βπGoodβ βmorningβπ₯°β","βοΈπΊπππ ππππππππ π","ππΆπππ π»πππππππ π₯°","πππΌπΌπ± ππΊπΌπΏπ»πΆπ»π΄ πΈ","π»ππΈπΈπ­ πΆπΈπ»π·π²π·π° π","πΌππππ πππ‘ππππ πΆ","πβΌβββ πβββ‘ββββ π₯°",   "β₯ π ππ¬πΈπ π¦ΟοΌ²ΕπΞ·π π€οΈ π£ΰ΅ ",   "πΒ΄ β’.ΒΈβ₯ΒΈ.β’* GΝβ¦oΝβ¦oΝβ¦dΝβ¦ MΝβ¦oΝβ¦rΝβ¦nΝβ¦iΝβ¦nΝβ¦gΝβ¦ *β’.ΒΈβ₯ΒΈ.β’Β΄π", "ΛβΒ°β’.ΛβΒ°β’ Good Morning β’Β°βΛ.β’Β°βΛ",  "(ΰΌGββd MβRNINgΰΌ)", "κ§ΰΌΊΙ’ΦΦΙ ΚΦΚΥΌΙ¨ΥΌΙ’ΰΌ»κ§", "κ§Ι’ΘΘΤΰΌαΉΘΡαΉΔ±αΉΙ’ΰΏ", "κ§ΰΌβ¬Good Morning β¬ΰΌκ§", "β‘GΓoΝ₯dmΝ£oΝ«rΞ?iΞ?gβ‘", "βπΆπΎπΎπ³ πΌπΎππ½πΈπ½πΆβ", "πΆπΎπΎπ³βοΈοΈβ‘πΌπΎππ½πΈπ½πΆ",  "β‘κ§Ι’ΘΘΤΰΌαΉΘΡαΉΔ±αΉΙ’ΰΏ,β‘","β£οΈ οΌ§ο½ο½ο½ οΌ­ο½ο½ο½ο½ο½ο½ β£οΈ", "πΉ Ι’α΄α΄α΄ α΄α΄ΚΙ΄ΙͺΙ΄Ι’ πΉ", "π πΎπ π π ππ π£ππππ π€οΈ", "π π’πππΉ πππππΎππ π", "π β²ΓΓΔ β₯Γβ±€β¦Εβ¦β² π»", "π GΣ¨Σ¨D MΣ¨Π―ΠIΠG π", "π πΆπππ πΌππππππ π€οΈ", "π ππΈπΈπ­ ππΈπ»π·π²π·π° π€οΈ",  "π₯° gΟΟβ ΠΌΟΡΞ·ΞΉΞ·g π", "π GΓ°Γ°Γ MΓ°rΓ±Γ―Γ±g π", "πΉ Good Morning πΉ", "πΉ Gββd ββα΅£βα΅’βg πΉ", "π α΄³α΅α΅α΅ α΄Ήα΅Κ³βΏβ±βΏα΅ π€οΈ", "π ππ¬π¬π‘ ππ¬π―π«π¦π«π€ π€οΈ", "πΊ π²πππ πΈππππππ πΊ",  "ποΈ ΙuΔ±uΙΉoW pooββ"];
	        const gf_text = ["Ι’α΄α΄α΄ α΄?α΄α΄ΚΙ΄α΄α΄Ι΄ π","ππΈπΈπ­ ππ―π½π?π»π·πΈπΈπ·", "πΎπ π π πΈππ₯ππ£ππ π π", "π’β΄β΄πΉ ππ»πβ―ππβ΄β΄π", "ππΈπΈπ­ ππ―π½π?π»π·πΈπΈπ·"];
	        const ge_text = ["Ι’α΄α΄α΄ α΄α΄ α΄Ι΄ΙͺΙ΄Ι’ π₯","ππΈπΈπ­ π?πΏπ?π·π²π·π°", "πΎπ π π ππ§πππππ", "π²πππ πππππππ", "π’β΄β΄πΉ β―πβ―ππΎπβ", "ππΈπΈπ­ π?πΏπ?π·π²π·π°"];
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
            const MSGDB = DataBase.define('deletemsgs', {
                msg_from: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
                msg_info: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                msg_id: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            });
            
            async function getid(jid = null, typ = 'delete') {
                var Msg = await MSGDB.findAll({
                    where: {
                        msg_from: jid,
                        msg_info: typ
                    }
                });
            
                if (Msg.length < 1) {
                    return false;
                } else {
                    return Msg[0].dataValues;
                }
            }
            async function setid(jid = null, typ = 'delete', id = null) {
                var Msg = await MSGDB.findAll({
                    where: {
                        msg_from: jid,
                        msg_info: typ
                    }
                });
            
                if (Msg.length < 1) {
                    return await MSGDB.create({ msg_from: jid, msg_info: typ, msg_id:id });
                } else {
                    return await Msg[0].update({ msg_from: jid, msg_info: typ, msg_id:id});
                }
            }
            
            async function deleteid(jid = null, typ = 'delete') {
                var Msg = await MSGDB.findAll({
                    where: {
                        msg_from: jid,
                        msg_info: typ
                    }
                });
            
                return await Msg[0].destroy();
            }
            await DataBase.sync();
            var nodb;
            async function delete_old(sendMsg) {
                try
                    {
                        var d_data = await getid(from,'delete');
                        if (d_data === false) {
                            
                            await setid(from, 'delete', sendMsg.key.id);
                        } else {
                            
                            await Ammu.sendMessage(from, { delete: {"remoteJid": from,"fromMe":true,"id":d_data.msg_id} });
                            await deleteid(from, 'delete');
                            await setid(from, 'delete', sendMsg.key.id);
                        }
                    } catch(err) {
                        console.log('[ERROR] => Message delete Akkanilla! => ',err);
                        var d_data = await getid(from,'delete');
                        if (d_data === false) {
                            
                            await setid(from, 'delete', sendMsg.key.id);
                        } else {
                            
                            await Ammu.sendMessage(from, { delete: {"remoteJid": from,"fromMe":true,"id":d_data.msg_id} });
                            await deleteid(from, 'delete');
                            await setid(from, 'delete', sendMsg.key.id);
                        }
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
                    var sections = [
                        {
                            title: "πHOME",
                            rows: [
                                {title: "β HOME", rowId: "home", description: "HOME"},
                                {title: "β ABOUT US", rowId: "about_us", description: "ABOUT US"},
                                {title: "β DEPARTMENTS", "rowId": "departments", description: "DEPARTMENTS"},
                                {title: "β PLACEMENT", "rowId": "placement", description: "PLACEMENT"},
                                {title: "β ACTIVITIES","rowId": "activities", description: "ACTIVITIES"},
                                {title: "β ADMISSION","rowId": "activities", description: "ACTIVITIES"},
                                {title: "β EOA","rowId": "eoa", description: "EOA"},
                                {title: "β MORE","rowId": "more", description: "MORE"},
                                {title: "β CONTACT US","rowId": "contact_us", description: "CONTACT US"}
                            ]
    
                        },
                    ]
                    var listMessage = {
                       text: '*Welcome to GPTC perumbavoor Whatsapp*\n\nPhone: 04842649251\nGmail:  gptcpbvr@gmail.com\nWebpage: https://gptcperumbavoor.ac.in\n\n Koovappady P.O.,\n Ernakulam - 683544, Kerala\n\n'+'π°οΈ : '+ihr+':'+min+':'+sec+' '+ampm+'\n π : '+day+'/'+mon+'/'+year,
                       footer: desmsg,
                       title: '*Hey @'+pushname+'*\n'+wish,
                       buttonText: 'πHOME',
                       sections
                    }
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg)                  
                break
                case 'home':
                    var button = [{buttonId: 'menu', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/College2.jpg'},
                        caption: "\n*β Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n\n*β Mission*\nβ­ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\nβ­ To apply technology in the traditional skills, thereby enhancing the living standard of the community.\n\n*β Accreditation Status*\nSelf-Assessment Report (SAR) is filed for NBA accreditation of Electronics and Communication Engineering, and Computer Engineering Programs. The accreditation visit is expected shortly.\n\n*β Quality Policy*\nIt is our commitment to impart quality skill education to our students. We understand that along with cognitive learning, the focus shall also be given to the sensory or psychomotor domain. We expect that our strategies shall help students behave or respond positively to the ever-progressing technological development and shall reap direct benefit from the scenario leading to sustainability. Sustainable development also promotes entrepreneurial thinking among the students.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg)  
                break
                case 'about_us':
                    await Ammu.sendMessage(from, { delete: msg.key });
                    
                    var button = [{buttonId: 'menu', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/College1.jpg'},
                        caption: "\n*βββββββββββABOUT USβββββββββββ*\n*Government Polytechnic College, Perumbavoor* had clear visibility in the state of Kerala as one of the best technical institutions providing quality skill education. With Skill β Excellence β Sustainability as our motto, we provide quality skill education to our students for their sustainable development. By nurturing the fundamental traits to excel in life through specialized training, the college is proposed as a center of excellence providing quality technical education to our students.Established in 1959 as a Junior Technical School, is upgraded to Polytechnic College in the year 1994. The college is managed by the Department of Technical Education under Higher Education, Government of Kerala. With an intake of 60 students to each Diploma program of\nβ­ Mechanical Engineering \nβ­ Computer Engineering\nβ­ Electronics and Communication Engineering and,\nall the programs are approved by the All India Council for Technical Education (AICTE), New Delhi, and are affiliated with the Kerala State Board of Technical Education. Department of Electronics and Communication Engineering and the Department of Computer Engineering had already filed Self-Assessment Report (SAR) for NBA accreditation, the expert visit is in due.\n           The college is situated in a sprawling campus of 6.93 acres, nestled among the lush greenery of Koovapady Panchayath in the middle of Ernakulum District, providing a pleasant atmosphere for the students for their emotional development.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg)
                break
                case 'π':
                case 'thank':
                case 'thanks':
                    var reactionMessage = {
                        react: {
                            text: "π",
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
                        buttonText: "πSTAFF",
                        sections
                    }
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg);
                break
                case 'principal':
                    var templateButtons = [ 
                        {index: 1, callButton: {displayText: 'Mobile Number', phoneNumber: '+919447388010'}},
                        {index: 2, urlButton:  {displayText: 'Email-id', url: 'mailto:aiju.thomas@gmail.com'}},
                        {index: 2, quickReplyButton: {displayText: 'π', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/53.jpg'},
                        caption: "         *Dr. AIJU THOMAS*\nβ Designation : Principal\n",
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
                        {index: 2, quickReplyButton: {displayText: 'π', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/55.jpg'},
                        caption: "         *BABU PRADEEP*\nβ Designation : Senior Superintendent\n",
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
                        {index: 2, quickReplyButton: {displayText: 'π', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/56.jpg'},
                        caption: "         *LISSY K K*\nβ Designation : Head Accountant\n",
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
                        {index: 2, quickReplyButton: {displayText: 'π', id:'office'}},
                    ] 
                    var buttonMessage = {
                        image: {url: 'images/14.jpg'},
                        caption: "         *Jini A R*\nβ Designation : Senior clerk\nβ Qualifications  :  Diploma in Electronics Production Technology\n",
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
                       buttonText: "πDepartments",
                       sections
                    }
                 
                    var sendMsg =  await Ammu.sendMessage(from, listMessage);
                    delete_old(sendMsg);
                break
                case '.gendep':
                    var button = [{buttonId: 'departments', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                            text: "\n*β Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n\n*β Institution Mission*\nβ­ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\nβ­ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                            footer: desmsg,
                            buttons: button,
                            headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.comen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/CT.jpg'},
                        caption: "\n*COMPUTER ENGINEERING*\nThe Computer Engineering Department was established in the year 1995. The department offers a three-year Diploma in Computer Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n*β Infrastructural Facilities*\nThe department is housed in Computer Engineering block with\nβ­ Well-appointed three numbers of classrooms.\nβ­ Five numbers of well-equipped laboratories\n\n*β Vision of the Department*\nExcel as a center of skill education in Computer Engineering moulding professionals who sincerely strive for the betterment of themselves and society.\n*β Mission of the Department*\nβ­ To impart state of the art, knowledge, skill and attitude to the graduates ensuring sustainable development.\nβ­ To develop adaptiveness for being competent to acquaint with the technological changes.",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.ecen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        image: {url: 'images/EC.jpg'},
                        caption: "\n*Electronics & Communication Engineering*\nThe Electronics and Communication Engineering Department was established in the year 1995. The department offers a three-year Diploma in Electronics and Communication Engineering. The program is approved by AICTE with an annual intake of 60 students. There is an additional intake of 3 students in the Fee waiver (FW) scheme and 6 in Lateral Entry (LE).\n\n*β Infrastructural Facilities*\nThe department is housed in Academic Block - 1 with\nβ­ Well-appointed three numbers of classrooms.\nβ­ Mini seminar hall with online conferencing facility\nβ­ Six numbers well-equipped laboratories\n\n*β Services Offered*\n\nProduction and Training Center (PAT)\nPAT is a project of the Department of Technical Education. PAT currently manufactures AVR trainer kits and 8051 trainer kits. These kits are currently being used by the majority of Polytechnic Colleges in the state.\n\n*β Self-Maintenance Cell (SMC)*\nSelf-maintenance Cell offers technical support by way of maintenance and repair of electronic equipment and computers of various departments. These services are now offered to other government and private organizations as outreach programs. varruction of a new academic block for the department for an estimated cost of Rs. 12 crores is in progress",
                        footerText: desmsg,
                        buttons: button,
                        headerType: 4
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.meen':
                    var button = [{buttonId: 'departments', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        text: "\n*MECHANICAL ENGINEERING*\n\n*β Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*β Institution Mission*\nβ­ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\nβ­ To apply technology in the traditional skills, thereby enhancing the living standard of the community.\n*β Mechanical Engineering Vision*\nExcel as a centre of skill education in mechanical engineering moulding professionals who strive for the betterment of society\n*β Mechanical Engineering Mission*\nβ­ Provide state of art knowledge, skill and transform the students into responsible professionals for the sustainable development of society.\nβ­ Provide good infrastructure facilities so that students will gain hands on experience by using various equipment and software.\nβ­ Inculcate the habit of self-learning to enhance the employability.",
                        footer: desmsg,
                        buttons: button,
                        headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break
                case '.genwksh':
                    var button = [{buttonId: 'departments', buttonText: {displayText: 'π'}, type: 1}]
                    var buttonMessage = {
                        text: "\n*WORKSHOP*\n\n*β Institution Vision*\nExcel as a centre of skill education moulding professionals who sincerely strive for the betterment of society.\n*β Institution Mission*\nβ­ To impart state of the art knowledge and skill to the graduate and moulding them to be competent, committed and responsible for the well being of society.\nβ­ To apply technology in the traditional skills, thereby enhancing the living standard of the community.",
                        footer: desmsg,
                        buttons: button,
                        headerType: 1
                    }
                    var sendMsg =  await Ammu.sendMessage(from, buttonMessage);
                    delete_old(sendMsg);
                break








                case 'log':
                    console.log(pushname,msg.pushName,msg.key.remoteJid,msg.key.id,args);
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
                                text: "π",
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
                                {
                                    title: "OFFICE", 
                                    rowId: "office"
                                },
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
                
                

                /////////////////////////////==========================//////////////////////
                case ',join':
                    if(!BLACK_SUDO_N) return
                    if(args == ' ') {
                        await Ammu.sendMessage(from,{text: 'Link not found!!'});
                    } else {
                        var join_requst = await Ammu.groupAcceptInvite(args);
                        console.log(join_requst);
                        await Ammu.sendMessage(from,{text:join_requst});
                    }

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
