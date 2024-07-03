var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Service_Mail_Id,
        pass: process.env.Service_Mail_Password
    }
});

function sendEmail(to, subject, text) {
    const mailOptions = {
        from: process.env.Service_Mail_Id,
        to: to,
        subject: subject,
        text: text
    };
    console.log("Mail Details",
    process.env.Service_Mail_Id
,process.env.Service_Mail_Password
);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = sendEmail;
