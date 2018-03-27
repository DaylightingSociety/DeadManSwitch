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

config.addEventListener("change", function() {
    if(config.value === "ethereal") {
        username.setAttribute('type', 'hidden');
        password.setAttribute('type', 'hidden');
    } else {
        username.setAttribute('type', 'text');
        password.setAttribute('type', 'text');
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
        case 'ethereal': //since ethereal is for testing, we won't need to supply creds
            task.config = etherealConfig;
            break;
        default:
            task.config = etherealConfig;
    }

    console.log(task.config);
    
    ipcRenderer.send('new_task', task);
});
