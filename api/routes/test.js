'use strict';
const nodeMailer = require('nodemailer');

exports.sendMail = function (req, res) {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
            user: 'ifat@genesysoftwares.com',
            pass: 'i0IUXyAEdbEY'
        }
    });
    const mailOptions = {
        from: '"Your Name" <ifat@genesysoftwares.com>', // sender address
        to: 'ifat802@gmail.com', // list of receivers
        subject: 'Hello ', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).send({ success: false })
        } else {
            res.status(200).send({ success: true });
        }
    });
}