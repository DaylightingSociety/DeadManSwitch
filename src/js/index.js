const {ipcRenderer} = require('electron');

var dateField = document.body.querySelector('input[type="datetime-local"]');
var from = document.body.querySelector('input[name="from"]');
var to = document.body.querySelector('input[name="to"');
var subject = document.body.querySelector('input[name="subject"]');
var text   = document.body.querySelector('input[name="text"]');
var submit = document.body.querySelector('button');
var config = document.body.querySelector('select');
var username = document.body.querySelector('input[name="username"]');
var password = document.body.querySelector('input[name="password"]');
var domain = document.body.querySelector('input[name="domain"]');
var port = document.body.querySelector('input[name="port"]');
var secure = document.body.querySelector('input[id="secure"]');
var secureLabel = document.body.querySelector('label');

config.addEventListener("change", function() {
    if(config.value === "ethereal") {
        username.setAttribute('type', 'hidden');
        password.setAttribute('type', 'hidden');
    } else {
        username.setAttribute('type', 'text');
        password.setAttribute('type', 'text');
    }

    if(config.value === "custom") {
        domain.setAttribute('type', 'text');
        port.setAttribute('type', 'text');
        secure.setAttribute('type', 'checkbox');
        secureLabel.setAttribute('style', 'display: inline;');
    } else {
        domain.setAttribute('type', 'hidden');
        port.setAttribute('type', 'hidden');
        secure.setAttribute('type', 'hidden');
        secureLabel.setAttribute('style', 'display: none;');
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
    securee: true, 
    auth: {
        user: '', 
        pass: ''
    }
};

submit.addEventListener("click", function() {
    const sendDate = new Date(dateField.value);

    const task = { //is this secure?
        sendDate: sendDate, 
          config: {}, 
         message: {
              from: from.value, 
                to: to.value,
           subject: subject.value, 
              text: text.value
        }
    };
    
    switch(config.value) {
        case 'riseup':
            task.config = riseupConfig;
            task.config.auth.user = username.value;
            task.config.auth.pass = password.value;        
            break;
        case 'gmail':
            task.config = gmailConfig;
            task.config.auth.user = username.value;
            task.config.auth.pass = password.value;        
            break;
        case 'mail':
            task.config = mailConfig;
            task.config.auth.user = username.value;
            task.config.auth.pass = password.value;
            break;
        case 'ethereal': //since ethereal is for testing, we won't need to supply creds
            task.config = etherealConfig;
            break;
        case 'custom':
            task.config = {
                host: domain.value,
                port: port.value,
                secure: secure.checked,
                auth: {
                    user: username.value, 
                    pass: password.value,
                }
            };
            break;
        default:
            task.config = etherealConfig;
    }

    console.log(task.config);
    
    ipcRenderer.send('new_task', task);
});
