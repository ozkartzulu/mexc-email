import { useState, useEffect } from 'react'
import Coin from './Coin'

const Coins = ({coins}) => {

    const [listPrices, setListPrices] = useState([])

    useEffect( () => {
        setListPrices(coins[0]?.prices)
    }, [coins] )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {coins?.map( (coin, index) => <th key={index}>{coin.symbol} <span>| {coin.percentage}%</span></th> )}
                    </tr>
                </thead>
                
                <tbody>
                    {listPrices?.map((item, position) => (
                        <tr key={position}>
                            {coins?.map( (coin, index) => <Coin key={index} coin={coin} position={position} /> )}
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}

export default Coins