import styles from "../app/page.module.css";
import gstyles from "../app/globals.css";
import aStyles from "../styles/account.module.css";
import Header from "../components/header.jsx";
import Pinfo from "../components/pinfo";
import Wallet from "../components/wallet";
import { useState, useEffect } from "react";
import {firestore} from "../app/db.js";
import { collection, getDocs } from 'firebase/firestore';



async function getData(){
    try{
        const result = await getDocs(collection(firestore, "User Info"));
        result.forEach((doc) => {
            console.log("Document ID:", doc.id);
            const data = doc.data();
            Object.entries(data).forEach(([key, value]) => {
                console.log(`${key}:`, value);
            });
        });
    } 
    catch (error) {
        console.error("Error getting documents: ", error);
  }
}


export default function Account() {
    const [activeSetting, setActiveSetting] = useState("pinfo");
    const renderSetting = () => {
        switch(activeSetting){
            case "pinfo":
                return <Pinfo/>;
            case "wallet":
                return <Wallet />;
            case "portfolio":
                return  `Portfolio`;
            default:
                return null

        }
    }
    getData();
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