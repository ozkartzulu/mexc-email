
const Coin = ({coin, position}) => {
    return (
        <>
            <td>{coin.prices[position]?.price} <span> {coin.prices[position]?.percentage}%</span></td>
        </>
    )
}

export default Coin