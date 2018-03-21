const {ipcRenderer} = require('electron');
const sendDate = new Date(2018, 3, 21);
const task = {
    sendDate: sendDate, 
    from: 'test', 
    to: 'test',
    subject: 'hey', 
    text: 'what\'s up'
};

ipcRenderer.send('new_task', task);

console.log('sent!')
