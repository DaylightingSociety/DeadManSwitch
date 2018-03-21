const {ipcRenderer} = require('electron');

var dateField = document.body.querySelector('form input[type="datetime-local"]');
var submit = document.body.querySelector('button');

submit.addEventListener("click", () => {
    const sendDate = new Date(dateField.value);
    const task = {
        sendDate: sendDate, 
        from: 'test', 
        to: 'test',
        subject: 'hey', 
        text: 'what\'s up'
    };
    
    ipcRenderer.send('new_task', task);
});
