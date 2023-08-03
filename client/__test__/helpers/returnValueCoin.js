export const returnValueCoin = (coins, coin_id) => {
    const coin = coins.find(item=>item.id===coin_id);
    const coin_value = coin.market_data.current_price.usd;
    return coin_value;    
}

export const valueCoins = (coins) => {
    const bitcoin = returnValueCoin(coins, 'bitcoin');
    const ethereum = returnValueCoin(coins, 'ethereum');
    const cardano = returnValueCoin(coins, 'cardano');

    return {
        bitcoin,
        ethereum,
        cardano
    }
}