import styles from "../styles/wallet.css";


export default function Wallet() {



    return(
        <div className="balance">
            <p>Balance: </p>
            <div className="wallet-actions">
                <button id="dep-btn">Deposit</button>
                <button id="with-btn">Withdraw</button>
                <button id="convert-btn">Convert</button>
            </div>
        </div>
        

    )


}