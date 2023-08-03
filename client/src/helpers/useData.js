const useData = (data) => {
    const headers = [
        {label: 'ID', key: 'id'},
        {label: 'SYMBOL', key: 'symbol'},
        {label: 'NAME', key: 'name'},
        {label: 'PRICE (USD)', key: 'current_price'},
        {label: 'REPORTED MARKETCAP', key: 'market_cap'},
        {label: 'CHANGE VS USD (1H)', key: 'price_change_percentage_1h_in_currency'},
        {label: 'CHANGE VS USD (24H)', key: 'price_change_percentage_24h_in_currency'},
        {label: 'CHANGE VS USD (7D)', key: 'price_change_percentage_7d_in_currency'},
        {label: 'CHANGE VS USD (30D)', key: 'price_change_percentage_30d_in_currency'},
        {label: 'CHANGE VS USD (YTD)', key: 'price_change_percentage_1y_in_currency'},
        {label: 'REAL VOLUME (24H)', key: 'total_volume'},
    ]


    const rows = data.map(item => {
        return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            current_price: item.market_data.current_price.usd,
            market_cap: item.market_data.market_cap.usd,
            price_change_percentage_1h_in_currency: item.market_data.price_change_percentage_1h_in_currency.usd,
            price_change_percentage_24h_in_currency: item.market_data.price_change_percentage_24h_in_currency.usd,
            price_change_percentage_7d_in_currency: item.market_data.price_change_percentage_7d_in_currency.usd,
            price_change_percentage_30d_in_currency: item.market_data.price_change_percentage_30d_in_currency.usd,
            price_change_percentage_1y_in_currency: item.market_data.price_change_percentage_1y_in_currency.usd,
            total_volume: item.market_data.total_volume.usd
        }
    });

    console.log(rows)

    return { headers, rows };

}

export default useData;