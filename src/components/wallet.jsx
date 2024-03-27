import styles from "../styles/wallet.css";
import  { useState, useEffect } from "react";

export default function Wallet(props) {

    // const [data, setData] = useState('null')
   

    // useEffect(() => {

    //     setData(props.data);

    // }, [props.data]);

    return(
        <div className="balance">
            <p>Balance: ${Math.floor(props.data.balance * 100) / 100}</p>
            <div className="wallet-actions">
                <button id="dep-btn">Deposit</button>
                <button id="with-btn">Withdraw</button>
                <button id="convert-btn">Convert</button>
            </div>
        </div>
        

    )


}