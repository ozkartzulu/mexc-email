
import { useState, useEffect } from "react"
import axios from 'axios'
import { listCoins } from './data'
import Coins from './components/Coins'

function App() {

  const [coins, setCoins] = useState(listCoins)

  useEffect(() => {
    
    const interval = setInterval( () => {
     
      for(const property in coins){
        const URL = `http://localhost:3001/api/price/${property}`
        axios.get(URL)
        .then( ({data}) => {
          const obj = coins[property]
          let lastPrice = obj.prices.length > 0 ? +obj.prices[obj.prices.length - 1].price : 0
          let percentageMin = lastPrice > 0 ? ( ( (+data.price - lastPrice) * 100 ) / lastPrice ).toFixed(4) : 0
          if(lastPrice > 0) obj.percentage = ( ( (+data.price - obj.prices[0].price) * 100 ) / lastPrice ).toFixed(4)
          obj.prices = [...obj.prices, {price: data.price, percentage: percentageMin }]
          setCoins( (coinsPrev) => {
            return {...coinsPrev, [property]: obj}
          } )
        } )

      }

    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect( () => {
  //   console.log(coins)
  // }, [coins] )

  return (
    <>
      <h1>Cryptocurrency</h1>
      <button >Show Price</button>
      <Coins coins={Object.values(coins)} />
    </>
  )
}

export default App
