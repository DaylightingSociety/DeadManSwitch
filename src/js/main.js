const nodemailer = require('nodemailer');
const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

var sendDate;
var waitMS;
var waitTime;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', 
    port: 587,
    auth: {
        user: 'ympjsencdzuybpy5@ethereal.email',
        pass: 'feDttypBmBHBFshJdg'
    }
});

var message = {
    from: 'dms test <dms_test@fake.domain>',
    to: 'fake recipient <fake_recipient@fake.domain>', 
    subject: 'DMS Test', 
    text: 'Testing the DMS!',
    html: 'Testing the <strong>DMS!</strong>'
};

function sendMailCallback(err, info) {
    if (err) {
        console.log('Error occured when sending. ' + error.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return;
};

function sendMail() {
    transporter.sendMail(message, sendMailCallback);
}

function createWindow() {
    win = new BrowserWindow({width: 600, height: 800});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'), 
        protocol: 'file', 
        slashes: true
    }));
}

app.on('ready', createWindow);

ipcMain.on('new_task', (event, arg) => {
    sendDate = new Date(arg.sendDate);
    waitMS = sendDate.getTime() - Date.now();
    waitTime = new Date(waitMS);

    console.log('sending in %d days, %d minutes, and %d seconds', waitTime.getDate(), waitTime.getMinutes(), waitTime.getSeconds());

    setTimeout(sendMail, waitMS); //this is async
});
