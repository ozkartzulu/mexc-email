require('dotenv').config()
const nodemailer = require('nodemailer')


const handlerMailerTest = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    let info = await transporter.sendMail(message)
        .then((resp) => res.json({
            msg: 'ok',
            info: resp.messageId,
            preview: nodemailer.getTestMessageUrl(resp)
        }))
}

const handlerMailer = async (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    const htmlBody = `
    <h1 style='font-size: 18px; text-align: center;'>You need review you mexc accout</h1>
    `

    const message = {
        from: process.env.EMAIL, // sender address
        to: "ozkart.zand.io@gmail.com", // list of receivers
        subject: "MEXC Buy Alcoin", // Subject line
        text: "Alert!!, you need check out you mexc account", // plain text body
        html: htmlBody, // html body
    }

    let info = await transporter.sendMail(message)
        .then((resp) => res.json({
            msg: 'You email was sent'
        }))
        .catch(error => res.status(500).json({ error }))
}

module.exports = {
    handlerMailerTest,
    handlerMailer
}