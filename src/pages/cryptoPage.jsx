import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {firebase} from "../app/db.js";
import {firestore} from "../app/db.js";
import 'firebase/firestore';
//assuming rahi has a getMarketprice function in his code
import { getMarketPrice } from '../pages/market'; 

const db = firestore;

const CryptoPage = () => {
  const router = useRouter();
  const { crypto } = router.query; 
  //once Parsa finishes his thing, i neeed to get the user id and put it in here
  const userId = ""; 
  const [cryptoOptions, setCryptoOptions] = useState([]);

  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(crypto);
  const [selectedExchangeCrypto, setSelectedExchangeCrypto] = useState('');
  const [type, setType] = useState('buy'); 
  const [balance, setBalance] = useState(0);
  const [cryptoHoldings, setCryptoHoldings] = useState({});

  const getUserBalance = async () => {
    const doc = await db.collection('User Info').doc(userId).get();
    return doc.exists ? doc.data().balance : 0;
  };

  const getUserCryptoHoldings = async () => {
    const doc = await db.collection('cryptoHoldings').doc(userId).get();
    return doc.exists ? doc.data() : {};
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const balance = await getUserBalance(); 
      const cryptoHoldings = await getUserCryptoHoldings(); 
      setBalance(balance);
      setCryptoHoldings(cryptoHoldings);
      setCryptoOptions(Object.keys(cryptoHoldings));
    };

    fetchUserDetails();
  }, []);

  const handleTransaction = async () => {
    try {
      const priceCrypto = await getMarketPrice(selectedCrypto);
      const priceExchangeCrypto = await getMarketPrice(selectedExchangeCrypto);

      const transactionAmount = parseFloat(amount);
      const exchangeAmount = transactionAmount ; // i still don't know how to do this

      if (type === 'buy') {
        if (balance < transactionAmount ) {
          console.error('Insufficient balance for this transaction.');
          return;
        }
        // Update balance and holdings
        const newBalance = balance - transactionAmount;
        const newHoldings = (cryptoHoldings[selectedCrypto] || 0) + (transactionAmount/priceCrypto);
        setBalance(newBalance);
        setCryptoHoldings({...cryptoHoldings, [selectedCrypto]: newHoldings});
        // Update balance and holdings in the database
        await db.collection('User Info').doc(userId).update({balance: newBalance});
        await db.collection('cryptoHoldings').doc(userId).update({[selectedCrypto]: newHoldings});
      } else if (type === 'sell') {
        if ((cryptoHoldings[selectedCrypto] || 0) < (transactionAmount/priceCrypto)) {
          console.error(`Insufficient ${selectedCrypto} holdings for this transaction.`);
          return;
        }
        // Update balance and holdings
        const newBalance = balance + transactionAmount;
        const newHoldings = cryptoHoldings[selectedCrypto] - (transactionAmount/priceCrypto);
        setBalance(newBalance);
        setCryptoHoldings({...cryptoHoldings, [selectedCrypto]: newHoldings});
        // Update balance and holdings in the database
        await db.collection('User Info').doc(userId).update({balance: newBalance});
        await db.collection('cryptoHoldings').doc(userId).update({[selectedCrypto]: newHoldings});
        //Not sure how to do this exchange thing
      } else if (type === 'exchange') { 
        if ((cryptoHoldings[selectedCrypto] || 0) < transactionAmount) {
          console.error(`Insufficient ${selectedCrypto} holdings for this transaction.`);
          return;
        }
        // Update holdings
        const newHoldingsCrypto = cryptoHoldings[selectedCrypto] - transactionAmount;
        const newHoldingsExchangeCrypto = (cryptoHoldings[selectedExchangeCrypto] || 0) + exchangeAmount;
        setCryptoHoldings({...cryptoHoldings, [selectedCrypto]: newHoldingsCrypto, [selectedExchangeCrypto]: newHoldingsExchangeCrypto});
        // Update holdings in the database
        await db.collection('cryptoHoldings').doc(userId).update({[selectedCrypto]: newHoldingsCrypto, [selectedExchangeCrypto]: newHoldingsExchangeCrypto});
      }

      const transactionData = {
        type,
        crypto: selectedCrypto,
        amount: transactionAmount,
        price: priceCrypto,
        exchangeCrypto: selectedExchangeCrypto,
        exchangeAmount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      //need some adjustments to the transactionhistory in the db
      await db.collection('transaction history').add(transactionData);
      setAmount('');
      setSelectedExchangeCrypto('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  //This will probably need some adjustments and styling

  return (
    <div>
      <h1>Cryptocurrency Page</h1>
      <p>Selected Crypto: {selectedCrypto}</p>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Select Crypto:
        <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
          {cryptoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {type === 'exchange' && (
        <label>
          Exchange Crypto:
          <select value={selectedExchangeCrypto} onChange={(e) => setSelectedExchangeCrypto(e.target.value)}>
            {cryptoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
          <option value="exchange">Exchange</option>
        </select>
      </label>
      <button onClick={handleTransaction}>Submit</button>
    </div>
  );
};
export default CryptoPage;

