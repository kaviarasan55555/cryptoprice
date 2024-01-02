// CryptoPrice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              // Add more coin IDs separated by commas
              ids: 'bitcoin,ethereum,ripple,litecoin,cardano,polkadot,stellar,chainlink,bitcoin-cash,binancecoin,tezos,tron,eos,monero,dash,neo,iota,waves,zcash,cosmos,theta,vechain,aave,uniswap,sushiswap,compound,yearn-finance,ren,loopring,band-protocol,the-graph',
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>1h % Change</th>
            <th>24h % Change</th>
            <th>7d % Change</th>
            <th>Market Cap (USD)</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>7d Price Graph</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>${crypto.current_price ? crypto.current_price.toFixed(2) : 'N/A'}</td>
              <td>{crypto.price_change_percentage_1h ? crypto.price_change_percentage_1h.toFixed(2) + '%' : 'N/A'}</td>
              <td>{crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) + '%' : 'N/A'}</td>
              <td>{crypto.price_change_percentage_7d ? crypto.price_change_percentage_7d.toFixed(2) + '%' : 'N/A'}</td>
              <td>${crypto.market_cap ? crypto.market_cap.toLocaleString() : 'N/A'}</td>
              <td>${crypto.total_volume ? crypto.total_volume.toLocaleString() : 'N/A'}</td>
              <td>{crypto.circulating_supply ? crypto.circulating_supply.toLocaleString() : 'N/A'}</td>
              <td>
                {crypto.id === 'bitcoin' && (
                  <img
                    src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"
                    alt="bitcoin-7d-price-graph"
                    className="sc-feda9013-0 fDilHY isUp"
                    loading="lazy"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrice;

