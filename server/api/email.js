const router = require('express').Router();
const utils = require('./utils');
const nodemailer = require('nodemailer');
module.exports = router;

router.get('/', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
    if (user){
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
      });            
      let mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'SimpleQL Endpoints',
        text: user.apiKey
      };        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
        }
      })
    }
  })
  .catch(next);
});