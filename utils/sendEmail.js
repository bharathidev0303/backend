var nodemailer = require('nodemailer');
const { google } = require('googleapis');


// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.Service_Mail_Id,
        pass: process.env.Service_Mail_Password
    },
    tls: {
        rejectUnauthorized: false
    },
    socketTimeout: 60000, // Increase the timeout to 60 seconds
    connectionTimeout: 60000
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
        , process.env.Service_Mail_Password
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
