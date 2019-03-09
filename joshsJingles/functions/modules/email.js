var nodemailer = require('nodemailer');

var defaultEmail = "joshsjingles@gmail.com";
var emailKey = "0bd48648-9dc2-4236-8d5b-303c3287ad0b";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "joshsjinglesemailer@gmail.com",
      pass: emailKey
    }
});
  

function sendEmail(subject, text, toWhom = defaultEmail){
    var mailOptions = {
        from: "joshsjinglesemailer@gmail.com",
        to: toWhom,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    }); 
}
  
exports.sendEmail = sendEmail;