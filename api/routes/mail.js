const express = require('express');
const multer = require('multer');
const nodeMailer = require('nodemailer');


const router = express.Router();

let storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        console.log(file);
        if (file.originalname.length > 6)
            callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length - 6, file.originalname.length));
        else
            callback(null, file.fieldname + '-' + Date.now() + file.originalname);

    }
});



// const fileFilter = (req, file, cb) => {
//     console.log(file.size);
//     cb(new Error('size big'), true);
// }


const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});


router.post('/', upload.any() , async (req, res, next) => {

    // const transporter = nodeMailer.createTransport({
    //     host: 'smtp.zoho.com',
    //     port: 465,
    //     secure: true,  //true for 465 port, false for other ports
    //     auth: {
    //         user: 'ifat@genesysoftwares.com',
    //         pass: 'i0IUXyAEdbEY'
    //     }
    // });

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boomb714@gmail.com',
            pass: 'boom123456'
        }
    });
    const mailOptions = {
        from: '"Your Name" <boomb714@gmail.com>', // sender address
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
   
    // res.status(200).json({
    //     message: 'Handling POST request'
    // })
});


module.exports = router;