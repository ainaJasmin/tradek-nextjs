import React, { useState } from 'react';
import styles from "../styles/homePage.module.css"; //create a trade.module.css for trade

const IndexPage = () => {
    const [amount, setAmount] = useState('');
    const [resultConvert, setResultConvert] = useState('');
    const [resultTrade, setResultTrade] = useState('');

    const handleConvert = async () => {
        try {
            const fromCurrency = document.getElementById("fromCurrency").value;
            const toCurrency = document.getElementById("toCurrency").value;
            const apiKey = "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
            const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${toCurrency}&tsyms=${fromCurrency}&api_key=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data[fromCurrency];
            const convertedAmount = amount / rate;
            setResultConvert(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(8)} ${toCurrency}`);
        } catch (error) {
            setResultConvert("Error: Unable to fetch exchange rate.");
            console.error(error);
        }
    };

    const handleTrade = async () => {
        //  if fromCurrency less than Wallet balance, cant click trade now -> display "insufficient balance"
        // else 
        // 1. 'amount' from setResultconvert minused from fromCurrency. toCurrency increase by 'convertedAmount'
        // 2. convertedAmount, dateTime noted 
    }

    return (
        <>
            <header></header>
            <div className="container">
                <form>

                    {/* select fromCurrency and toCurrency */}
                    <input type="text" className={styles.amount} name="amount" id="amount" placeholder="Enter Amount" required onChange={(e) => setAmount(e.target.value)} />
                    <label id="fromCurrencyName" className={styles.fromCurrencyName}></label>
                    <div id="select-field">
                        <select name="fromCurrency" id="fromCurrency" className={styles.fromCurrency}>
                            <option value="USD">USD - US Dollar</option>
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="XRP">XRP (XRP)</option>
                            <option value="DOGE">Dogecoin (DOGE)</option>
                            <option value="SOL">Solana (SOL)</option>
                            <option value="DOT">Polkadot (DOT)</option>
                            <option value="LTC">Litecoin (LTC)</option>
                        </select>
                        <select name="toCurrency" id="toCurrency" className={styles.toCurrency}>
                            <option value="USD" disabled>USD - US Dollar</option>
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="XRP">XRP (XRP)</option>
                            <option value="DOGE">Dogecoin (DOGE)</option>
                            <option value="SOL">Solana (SOL)</option>
                            <option value="DOT">Polkadot (DOT)</option>
                            <option value="LTC">Litecoin (LTC)</option>
                        </select>
                    </div>
                    <br />
                    {/* convert */}
                    <button type="button" id="currentRate" className={styles.currentRate} onClick={handleConvert}>
                        Current Rate
                    </button>
                    <p id="resultConvert">{resultConvert}</p>

                    {/* trade */}
                    <button type="button" id="tradeNow" className={styles.tradeNow} onClick={handleTrade}>
                        Trade Now
                    </button>
                    <p id="resultTrade" className={styles.resultTrade}>{resultTrade}</p>
                </form>
                
            </div>
        </>
    );
};

export default IndexPage;
