
const Mexc = require('../../mexc-sdk');
const apiKey = 'mx0vglCAaF6jItwCTX'
const apiSecret = '20e3da8402044d21bdc0a478d15916f5'
const client = new Mexc.Spot(apiKey, apiSecret);

const getPriceBySymbol = async (req, res) => {
    try {
        const symbol = req.params.symbol
        const data = await client.tickerPrice(symbol)
        res.json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getPriceBySymbol
}