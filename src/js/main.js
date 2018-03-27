'use strict';

const nodemailer = require('nodemailer');
const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

var sendDate;
var waitMS;
var waitTime;

const gmailConfig = {
    host: 'smtp.gmail.com',
    port: 587, 
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
};

const etherealConfig = {
    host: 'smtp.ethereal.email', 
    port: 587,
    auth: {
        user: 'ympjsencdzuybpy5@ethereal.email',
        pass: 'feDttypBmBHBFshJdg'
    }
};

const riseupConfig = {
    host: 'mail.riseup.net', 
    port: 465,
    secure: true, 
    auth: {
        user: '',
        pass: ''
    }
};

const transporter = nodemailer.createTransport(etherealConfig);

function sendMailCallback(err, info) {
    if (err) {
        console.log('Error occured when sending. ' + error.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return;
};

function createWindow() {
    var win = new BrowserWindow({width: 600, height: 800});
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

    var message = arg.message; 

    setTimeout(function(){
       transporter.sendMail(message, sendMailCallback);
    }, waitMS);
});
