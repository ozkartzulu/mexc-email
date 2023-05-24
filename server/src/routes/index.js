
const { Router } = require('express')
const { getPriceBySymbol } = require('../controllers/handleMexc')

const router = Router()

router.get('/price/:symbol', (req, res) => {
    getPriceBySymbol(req, res)
})


module.exports = router