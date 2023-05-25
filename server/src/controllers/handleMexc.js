require('dotenv').config()
const Mexc = require('../../mexc-sdk');
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET
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