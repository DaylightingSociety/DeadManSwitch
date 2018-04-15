'use strict';

const {ipcRenderer} = require('electron');
window.$ = window.jQuery = require('jquery');
window.bootstrap = require('bootstrap');

$('#provider').on("change", function() {
    if($('#provider').val() === "custom") {
        $('#domain-wrapper').removeClass('d-none');
        $('#port-wrapper').removeClass('d-none');
        $('#secure-wrapper').removeClass('d-none');
    } else {
        $('#domain-wrapper').addClass('d-none');
        $('#port-wrapper').addClass('d-none');
        $('#secure-wrapper').addClass('d-none');
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

$('form').on('submit', function(event) {
    if(!($('form').checkValidity())) {
       return;
    }

    const sendDate = new Date($('#date').val());

    const task = { //is this secure?
        sendDate: sendDate, 
          config: {}, 
         message: {
              from: $('#from').val(), 
              to: $('#to').val(), 
              subject: $('#subject').val(), 
              text: $('#text').val(), 
        }
    };
    
    var user = $('#username').val();
    var pass = $('#password').val();

    switch($('#provider').val()) {
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

    ipcRenderer.send('new_task', task);
});

$('#cancel').on("click", function() {
    ipcRenderer.send('cancel_task', null);
});
