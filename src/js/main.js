const nodemailer = require('nodemailer');
const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const sendDate = new Date(2018, 2, 21, 23, 0, 0, 0);
const waitMS = sendDate.getTime() - Date.now();
const waitTime = new Date(waitMS);

if (waitMS < 0) {
    //do something
}

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', 
    port: 587,
    auth: {
        user: 'ympjsencdzuybpy5@ethereal.email',
        pass: 'feDttypBmBHBFshJdg'
    }
});

let message = {
    from: 'dms test <dms_test@fake.domain>',
    to: 'fake recipient <fake_recipient@fake.domain>', 
    subject: 'DMS Test', 
    text: 'Testing the DMS!',
    html: 'Testing the <strong>DMS!</strong>'
};

let sendMailCallback = function(err, info) {
    if (err) {
        console.log('Error occured when sending. ' + error.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return;
};

let sendMail = function() {
    transporter.sendMail(message, sendMailCallback);
}

console.log('waiting for %d minutes and %d seconds', waitTime.getMinutes(), waitTime.getSeconds()); 

setTimeout(sendMail, waitMS); //this is async

ipcMain.on('new_task', (event, arg) => {
    console.log('hello!');
    console.log(arg);
});


function createWindow() {
    win = new BrowserWindow({width: 600, height: 800});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'), 
        protocol: 'file', 
        slashes: true
    }));
}

app.on('ready', createWindow);
