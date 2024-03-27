import styles from "../app/page.module.css";
import gstyles from "../app/globals.css";
import aStyles from "../styles/account.module.css";
import Header from "../components/header.jsx";
import Pinfo from "../components/pinfo";
import Wallet from "../components/wallet";

import { useState, useEffect } from "react";
import {firestore} from "../app/db.js";
import { collection, getDocs, query, where } from 'firebase/firestore';


const email = "new@email";

export default function Account() {
    const [activeSetting, setActiveSetting] = useState("pinfo");
    const [data, setData] = useState('null');
    

    useEffect(() => {
        // Fetch data asynchronously
        async function getData() {
            try {
                const q = query(collection(firestore, "User Info"), where('email', '==', email));
                const result = await getDocs(q);
                if (result.empty) {
                    console.log("No results");
                    setData(null); // Update data state
                } else {
                    const docID = result.docs[0].id;
                    const userData = result.docs[0].data();
                    const fullSet = {...userData, docID:docID };  
                    setData(fullSet); // Update data state
                }
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        }
        getData(); // Call fetchData when component mounts
    }, []); // Empty dependency array ensures useEffect runs once on component mount
    
    const renderSetting = () => {

        switch(activeSetting){
            case "pinfo":
                return <Pinfo data={data}/>;
            case "wallet":
                return <Wallet data={data}/>;
            case "portfolio":
                return  `Portfolio`;
            default:
                return null

        }
    }
    
    return (
        <>
        <Header/>
        <main className={aStyles.main}>
            <div className={aStyles['options-settings-container']}>
                <div className={aStyles['account-options']}>
                    <ul>
                        <li onClick={() => setActiveSetting("pinfo")}>Personal Information</li>
                        <li onClick={() => setActiveSetting("wallet")}>Wallet</li>
                        <li onClick={() => setActiveSetting("portfolio")}>Portfolio</li>
                    </ul>
                </div>
                <div className={aStyles.settings}>
                    {renderSetting()}
                </div>
            </div>
        </main>
        </>
    );
}