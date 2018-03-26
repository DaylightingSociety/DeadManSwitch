const {ipcRenderer} = require('electron');

var dateField = document.body.querySelector('input[type="datetime-local"]');
var from      = document.body.querySelector('input[name="from"]');
var to        = document.body.querySelector('input[name="to"');
var subject   = document.body.querySelector('input[name="subject"]');
var text      = document.body.querySelector('input[name="text"]');
var submit    = document.body.querySelector('button');

submit.addEventListener("click", () => {
    const sendDate = new Date(dateField.value);
    const task = { //is this secure?
        sendDate: sendDate, 
        message: {
            from: from.value, 
            to: to.value,
            subject: subject.value, 
            text: text.value,
            html: "<strong>no support for html yet!</strong>"
        }
    };
    
    ipcRenderer.send('new_task', task);
});
