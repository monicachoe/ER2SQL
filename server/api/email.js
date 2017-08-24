const router = require('express').Router();
module.exports = router;
var nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL,
            to: req.user.email,
            subject: 'API Key',
            text: req.user.apiKey
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
})