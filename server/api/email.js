const router = require('express').Router();
const utils = require('./utils');
module.exports = router;
var nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
    utils.validateUser(req.query.devId, req.query.apiKey, req.user)
    .then(user => {
        if (user){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
        
    var mailOptions = {
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
})