
import { useState, useEffect } from "react"
import axios from 'axios'
import { listCoins } from './data'
import Coins from './components/Coins'

function App() {

  const [coins, setCoins] = useState(listCoins)

  const [percentMin, setPercentMin] = useState({})

  const [percentTotal, setPercentTotal] = useState({})

  useEffect(() => {
    
    const interval = setInterval( () => {
     
      for(const property in coins){
        const URL = `http://localhost:3001/api/price/${property}`
        axios.get(URL)
        .then( ({data}) => {
          const obj = coins[property]
          // get the last price of the list the prices in an alcoin
          let lastPrice = obj.prices.length > 0 ? +obj.prices[obj.prices.length - 1].price : 0
          // get the percentage of go up or go down for each minute
          let percentageMin = lastPrice > 0 ? ( ( (+data.price - lastPrice) * 100 ) / lastPrice ).toFixed(4) : 0
          
          // get the percentage of go up or go down since that begin el request
          if(lastPrice > 0) obj.percentage = ( ( (+data.price - obj.prices[0].price) * 100 ) / obj.prices[0].price ).toFixed(4)
          // add the price and percentage of each minute for every alcoin in list prices
          obj.prices = [...obj.prices, {price: data.price, percentage: percentageMin }]

          if(percentageMin > 3) setPercentMin({
            symbol: obj.symbol, 
            percentage: +percentageMin, 
            minPrice: obj.minPrice 
          })

          if(obj.percentage > 10) setPercentTotal({
            symbol: obj.symbol, 
            percentage: obj.percentage, 
            minPrice: obj.minPrice 
          })
          // update the state with the new object created
          setCoins( (coinsPrev) => {
            return {...coinsPrev, [property]: obj}
          } )
        } )
      }

    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect( () => {
    if(Object.keys(percentMin).length > 0){
      const URL_EMAIL = 'http://localhost:3001/api/mailer'
      axios.post(URL_EMAIL, percentMin)
      .then( ({data}) => {
        if(data.state) console.log('email percentage for minute sent!!!')
      })
      .catch(error => console.log(error.message))
    }
  }, [percentMin] )

  useEffect( () => {
    if(Object.keys(percentTotal).length > 0){
      const URL_EMAIL = 'http://localhost:3001/api/mailer'
      axios.post(URL_EMAIL, percentTotal)
      .then( ({data}) => {
        if(data.state) console.log('email percentage total sent!!!')
      })
      .catch(error => console.log(error.message))
    }
    
  }, [percentTotal] )

  return (
    <>
      <h1>Cryptocurrency</h1>
      <button >Show Price</button>
      <Coins coins={Object.values(coins)} />
    </>
  )
}

export default App
