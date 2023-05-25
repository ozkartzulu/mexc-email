
const { Router } = require('express')
const { getPriceBySymbol } = require('../controllers/handleMexc')
const { handlerMailerTest, handlerMailer } = require('../controllers/nodemailer')

const router = Router()

router.get('/price/:symbol', (req, res) => {
    getPriceBySymbol(req, res)
})

router.post('/mailer-test', (req, res) => {
    handlerMailerTest(req, res)
})

router.post('/mailer', (req, res) => {
    handlerMailer(req, res)
})


module.exports = router