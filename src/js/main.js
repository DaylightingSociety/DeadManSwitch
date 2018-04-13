'use strict';

const nodemailer = require('nodemailer');
const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const jquery = require('jquery');

var sendDate;
var waitMS;
var waitTime;
var task;

function sendMailCallback(err, info) {
    if (err) {
        console.log('Error occured when sending. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    if(nodemailer.getTestMessageUrl(info)) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return;
};

function createWindow() {
    var win = new BrowserWindow({width: 600, height: 800});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'), 
        protocol: 'file', 
        slashes: true
    }));
    win.jQuery = jquery;
}

app.on('ready', createWindow);

ipcMain.on('new_task', (event, arg) => {
    var sendDate = new Date(arg.sendDate);
    var waitMS = sendDate.getTime() - Date.now();
    var waitTime = new Date(waitMS);
    var transporter = nodemailer.createTransport(arg.config);
    var message = arg.message; 

    console.log('sending in %d days, %d minutes, and %d seconds', waitTime.getDate(), waitTime.getMinutes(), waitTime.getSeconds());

    setTimeout(function(){
       task = transporter.sendMail(message, sendMailCallback);
    }, waitMS);
});

ipcMain.on('cancel_task', (event, arg) => {
    clearInterval(task);
});
