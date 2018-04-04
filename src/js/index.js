'use strict';

const {ipcRenderer} = require('electron');
window.$ = window.jQuery = require('jquery');
window.bootstrap = require('bootstrap');

$('#provider').on("change", function() {
    if($('#provider').val() === "custom") {
        $('#domain-wrapper').show();
        $('#port-wrapper').show();
        $('#secure-wrapper').show()
    } else {
        $('#domain-wrapper').hide();
        $('#port-wrapper').hide();
        $('#secure-wrapper').hide();
    }
});

const gmailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
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

const mailConfig = {
    host: 'smtp.mail.com', 
    port: 465,
    secure: true, 
    auth: {
        user: '', 
        pass: ''
    }
};

$('#submit').on("click", function() {
    const sendDate = new Date($('#date').val());

    const task = { //is this secure?
        sendDate: sendDate, 
          config: {}, 
         message: {
              from: $('#from').text(), 
              to: $('#to').text(), 
              subject: $('#subject').text(), 
              text: $('#text').text(), 
        }
    };
    
    let user = $('#username').text();
    let pass = $('#password').text();

    switch(config.value) {
        case 'riseup':
            task.config = riseupConfig;
            break;
        case 'gmail':
            task.config = gmailConfig;
            break;
        case 'mail':
            task.config = mailConfig;
            break;
        case 'custom':
            task.config = {
                host: $('#domain').text(),
                port: $('#port').text(),
                secure: $('#secure').prop("checked"),
                auth: {}
            };
            break;
    }
    
    task.config.auth.user = user;
    task.config.auth.pass = pass;

    console.log(task);
    
    ipcRenderer.send('new_task', task);
});
