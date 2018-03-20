const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', 
        port: 587,
        auth: {
            user: 'ympjsencdzuybpy5@ethereal.email',
            pass: 'feDttypBmBHBFshJdg'
        }
    });

    let message = {
        from: 'dms test <dms_test@fake.domain>',
        to: 'fake recipient <fake_recipient@fake.domain>', 
        subject: 'DMS Test', 
        text: 'Testing the DMS!',
        html: 'Testing the <strong>DMS!</strong>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occured when sending. ' + error.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
